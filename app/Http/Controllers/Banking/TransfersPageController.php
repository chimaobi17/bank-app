<?php

namespace App\Http\Controllers\Banking;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransferRequest;
use App\Models\Account;
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
        return Inertia::render('banking/transfers/create', [
            'accounts' => $this->accountsFor($request),
        ]);
    }

    public function store(TransferRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        try {
            $result = $this->transferService->execute(
                $validated['from_account_number'],
                $validated['to_account_number'],
                Money::of($validated['amount']),
                $validated['narration'] ?? '',
                $request->user()->user_id
            );
        } catch (\Throwable $e) {
            return back()->withErrors(['amount' => $e->getMessage()]);
        }

        $source = Account::where('account_number', $validated['from_account_number'])->first();
        $dest = Account::where('account_number', $validated['to_account_number'])->first();

        return redirect()->route('banking.transfers')->with('successTransfer', [
            'amount' => (string) $validated['amount'],
            'currency' => $source?->currency ?? 'NGN',
            'from_account_number' => $validated['from_account_number'],
            'to_account_number' => $validated['to_account_number'],
            'to_account_name' => $dest?->customer?->full_name,
            'to_bank_name' => config('app.name', 'ApexBank'),
            'reference' => $result->reference->getValue(),
            'narration' => $validated['narration'] ?? null,
            'posted_at' => $result->transaction->posted_at?->toIso8601String()
                ?? now()->toIso8601String(),
            'new_balance' => $source?->fresh()?->available_balance,
        ]);
    }

    private function accountsFor(Request $request): array
    {
        $user = $request->user();
        if (! $user->customer_id) {
            return [];
        }

        return $this->accountService->getCustomerAccounts($user->customer_id)
            ->where('status', \App\Enums\AccountStatus::ACTIVE)
            ->map(fn ($a) => [
                'account_number' => $a->account_number,
                'account_type' => $a->account_type->value,
                'balance' => $a->balance,
                'available_balance' => $a->available_balance,
                'currency' => $a->currency,
            ])->values()->all();
    }
}
