<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\AccountType;
use App\Http\Controllers\Controller;
use App\Http\Requests\OpenAccountRequest;
use App\Http\Resources\AccountResource;
use App\Http\Resources\TransactionResource;
use App\Services\AccountService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AccountController extends Controller
{
    public function __construct(
        private AccountService $accountService,
    ) {}

    public function index(Request $request): AnonymousResourceCollection
    {
        $user = $request->user();

        if (! $user->customer_id) {
            return AccountResource::collection(collect());
        }

        $accounts = $this->accountService->getCustomerAccounts($user->customer_id);

        return AccountResource::collection($accounts);
    }

    public function show(Request $request, string $accountNumber): AccountResource
    {
        $account = $this->accountService->getAccountByNumber($accountNumber);

        if (! $account) {
            abort(404, 'Account not found.');
        }

        if ($request->user()->customer_id !== $account->customer_id) {
            abort(403, 'Unauthorized access to this account.');
        }

        return new AccountResource($account->load('branch'));
    }

    public function store(OpenAccountRequest $request): JsonResponse
    {
        $user = $request->user();

        if (! $user->customer) {
            abort(422, 'User is not linked to a customer profile.');
        }

        if (! $user->customer->isKycVerified()) {
            abort(422, 'KYC verification required before opening an account.');
        }

        $validated = $request->validated();

        $account = $this->accountService->openAccount(
            $user->customer,
            AccountType::from($validated['account_type']),
            $validated['branch_id'] ?? null,
            array_filter([
                'currency' => $validated['currency'] ?? null,
                'lock_in_months' => $validated['lock_in_months'] ?? null,
                'overdraft_limit' => $validated['overdraft_limit'] ?? null,
            ])
        );

        return response()->json([
            'message' => 'Account opened successfully. Awaiting activation.',
            'account' => new AccountResource($account),
        ], 201);
    }

    public function transactions(Request $request, string $accountNumber): AnonymousResourceCollection
    {
        $account = $this->accountService->getAccountByNumber($accountNumber);

        if (! $account || $request->user()->customer_id !== $account->customer_id) {
            abort(404, 'Account not found.');
        }

        $from = $request->query('from');
        $to = $request->query('to');

        $query = $account->transactions()
            ->union($account->incomingTransactions())
            ->latest('posted_at');

        if ($from) {
            $query->where('posted_at', '>=', $from);
        }
        if ($to) {
            $query->where('posted_at', '<=', $to);
        }

        return TransactionResource::collection($query->paginate(20));
    }
}
