<?php

namespace App\Http\Controllers\Banking;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransferRequest;
use App\Services\AccountService;
use App\Services\TransferService;
use App\ValueObjects\Money;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TransfersPageController extends Controller
{
    public function __construct(
        private TransferService $transferService,
        private AccountService $accountService,
    ) {}

    public function create(Request $request): Response
    {
        $user = $request->user();
        $accounts = $user->customer_id
            ? $this->accountService->getCustomerAccounts($user->customer_id)
                ->where('status', \App\Enums\AccountStatus::ACTIVE)
                ->map(fn ($a) => [
                    'account_number' => $a->account_number,
                    'account_type' => $a->account_type->value,
                    'balance' => $a->balance,
                    'available_balance' => $a->available_balance,
                    'currency' => $a->currency,
                ])->values()
            : [];

        return Inertia::render('banking/transfers/create', [
            'accounts' => $accounts,
        ]);
    }

    public function store(TransferRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        try {
            $this->transferService->execute(
                $validated['from_account_number'],
                $validated['to_account_number'],
                Money::of($validated['amount']),
                $validated['narration'] ?? '',
                $request->user()->user_id
            );
        } catch (\Throwable $e) {
            return back()->withErrors(['amount' => $e->getMessage()]);
        }

        return redirect()->route('banking.dashboard')->with('success', 'Transfer completed successfully.');
    }
}
