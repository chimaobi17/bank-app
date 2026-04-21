<?php

namespace App\Http\Controllers\Banking;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Services\AccountService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private AccountService $accounts,
        private NotificationService $notifications,
    ) {}

    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $customerId = $user->customer_id;

        $accounts = $customerId
            ? $this->accounts->getCustomerAccounts($customerId)
            : collect();

        $totalBalance = $accounts->sum('balance');

        $recentTransactions = $customerId
            ? Transaction::whereIn('source_account_id', $accounts->pluck('account_id'))
                ->orWhereIn('dest_account_id', $accounts->pluck('account_id'))
                ->with('sourceAccount', 'destinationAccount')
                ->latest('posted_at')
                ->take(5)
                ->get()
            : collect();

        return Inertia::render('banking/dashboard', [
            'accounts' => $accounts->map(fn ($a) => [
                'account_id' => $a->account_id,
                'account_number' => $a->account_number,
                'account_type' => $a->account_type->value,
                'balance' => $a->balance,
                'available_balance' => $a->available_balance,
                'currency' => $a->currency,
                'status' => $a->status->value,
            ]),
            'totalBalance' => (string) $totalBalance,
            'recentTransactions' => $recentTransactions->map(fn ($t) => [
                'transaction_id' => $t->transaction_id,
                'reference' => $t->reference,
                'type' => $t->type->value,
                'amount' => $t->amount,
                'currency' => $t->currency,
                'status' => $t->status->value,
                'narration' => $t->narration,
                'posted_at' => $t->posted_at?->toIso8601String(),
                'direction' => in_array($t->source_account_id, $accounts->pluck('account_id')->toArray()) ? 'debit' : 'credit',
            ]),
            'unreadNotifications' => $this->notifications->getUnreadCount($user->user_id),
        ]);
    }
}
