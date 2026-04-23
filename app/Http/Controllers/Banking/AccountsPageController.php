<?php

namespace App\Http\Controllers\Banking;

use App\Enums\AccountType;
use App\Http\Controllers\Controller;
use App\Http\Requests\OpenAccountRequest;
use App\Services\AccountService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountsPageController extends Controller
{
    public function __construct(
        private AccountService $accounts,
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $accounts = $user->customer_id
            ? $this->accounts->getCustomerAccounts($user->customer_id)->map->toArray()
            : [];

        return Inertia::render('banking/accounts/index', [
            'accounts' => $accounts,
        ]);
    }

    public function show(Request $request, string $accountNumber): Response
    {
        $account = $this->accounts->getAccountByNumber($accountNumber);

        if (! $account || $account->customer_id !== $request->user()->customer_id) {
            abort(404);
        }

        $transactions = $account->transactions()
            ->union($account->incomingTransactions())
            ->latest('posted_at')
            ->take(50)
            ->get()
            ->map(fn ($t) => [
                'transaction_id' => $t->transaction_id,
                'reference' => $t->reference,
                'type' => $t->type->value,
                'amount' => $t->amount,
                'currency' => $t->currency,
                'status' => $t->status->value,
                'narration' => $t->narration,
                'posted_at' => $t->posted_at?->toIso8601String(),
                'direction' => $t->source_account_id === $account->account_id ? 'debit' : 'credit',
            ]);

        return Inertia::render('banking/accounts/show', [
            'account' => [
                'account_id' => $account->account_id,
                'account_number' => $account->account_number,
                'account_type' => $account->account_type->value,
                'balance' => $account->balance,
                'available_balance' => $account->available_balance,
                'currency' => $account->currency,
                'status' => $account->status->value,
                'opened_at' => $account->opened_at?->toIso8601String(),
                'daily_transfer_limit' => $account->daily_transfer_limit,
                'per_transaction_limit' => $account->per_transaction_limit,
            ],
            'transactions' => $transactions,
        ]);
    }

    public function open(OpenAccountRequest $request): RedirectResponse
    {
        $user = $request->user();

        if (! $user->customer || ! $user->customer->isKycVerified()) {
            return back()->withErrors(['account_type' => 'KYC verification required.']);
        }

        $validated = $request->validated();
        $account = $this->accounts->openAccount(
            $user->customer,
            AccountType::from($validated['account_type']),
            $validated['branch_id'] ?? null,
            array_filter([
                'currency' => $validated['currency'] ?? null,
                'lock_in_months' => $validated['lock_in_months'] ?? null,
                'overdraft_limit' => $validated['overdraft_limit'] ?? null,
            ])
        );

        // Auto-activate and fund for simulation
        $account->status = \App\Enums\AccountStatus::ACTIVE;
        $account->balance = '10000.0000';
        $account->available_balance = '10000.0000';
        $account->save();

        return redirect()->route('banking.accounts')->with('success', 'Account opened and funded with ₦10,000.00 demo balance!');
    }
}
