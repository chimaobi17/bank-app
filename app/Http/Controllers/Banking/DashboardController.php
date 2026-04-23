<?php

namespace App\Http\Controllers\Banking;

use App\Http\Controllers\Controller;
use App\Models\Card;
use App\Models\Transaction;
use App\Services\AccountService;
use App\Services\NotificationService;
use App\Services\Reporting\SpendAnalysisService;
use App\ValueObjects\DateRange;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(
        private AccountService $accounts,
        private NotificationService $notifications,
        private SpendAnalysisService $spendAnalysis,
    ) {}

    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        $customerId = $user->customer_id;

        $accounts = $customerId
            ? $this->accounts->getCustomerAccounts($customerId)
            : collect();

        // Self-healing: If user has 0 accounts, give them one with funds for the demo
        if ($customerId && $accounts->isEmpty()) {
            $customer = $user->customer;
            $newAccount = $this->accounts->openAccount($customer, \App\Enums\AccountType::SAVINGS, null, ['currency' => 'NGN']);
            $newAccount->status = \App\Enums\AccountStatus::ACTIVE;
            $newAccount->balance = '10000.0000';
            $newAccount->available_balance = '10000.0000';
            $newAccount->save();
            $accounts = collect([$newAccount]);
        }

        $totalBalance = $accounts->sum('balance');

        $recentTransactions = $customerId
            ? Transaction::whereIn('source_account_id', $accounts->pluck('account_id'))
                ->orWhereIn('dest_account_id', $accounts->pluck('account_id'))
                ->with('sourceAccount', 'destinationAccount')
                ->latest('posted_at')
                ->take(5)
                ->get()
            : collect();

        $cards = $customerId
            ? Card::whereIn('account_id', $accounts->pluck('account_id'))->get()
            : collect();

        // Simulate savings goals for demo if none exist
        $savingsGoals = [
            ['name' => 'Tesla Model Y', 'target' => 5000000, 'current' => 1200000, 'color' => 'bg-blue-500'],
            ['name' => 'Tokyo Trip', 'target' => 2000000, 'current' => 800000, 'color' => 'bg-purple-500'],
        ];

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
            'yesterday_earnings' => (string) round($totalBalance * 0.0005, 2),
            'cards' => $cards->map(fn ($c) => [
                'brand' => $c->brand,
                'last4' => substr($c->masked_pan, -4),
                'type' => $c->card_type,
                'status' => $c->status->value,
                'expiry' => $c->expiry?->format('m/y'),
            ]),
            'savingsGoals' => [],
            'spendAnalytics' => $this->buildSpendAnalytics($accounts),
            'monthlyBreakdown' => $this->buildMonthlyBreakdown($accounts),
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
            'user' => [
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
            ],
            'unreadNotifications' => $this->notifications->getUnreadCount($user->user_id),
        ]);
    }

    private function buildSpendAnalytics($accounts): array
    {
        if ($accounts->isEmpty()) {
            return [
                'total_spent' => '0', 'total_received' => '0',
                'net_flow' => '0', 'spending_by_type' => [], 'transaction_count' => 0,
            ];
        }

        $now = CarbonImmutable::now();
        $range = new DateRange($now->subDays(30)->startOfDay(), $now->endOfDay());

        // Aggregate across all accounts
        $merged = [
            'total_spent' => '0', 'total_received' => '0',
            'spending_by_type' => [], 'transaction_count' => 0,
        ];

        foreach ($accounts as $account) {
            $summary = $this->spendAnalysis->summarize($account, $range);
            $merged['total_spent'] = bcadd($merged['total_spent'], $summary['total_spent'], 4);
            $merged['total_received'] = bcadd($merged['total_received'], $summary['total_received'], 4);
            $merged['transaction_count'] += $summary['transaction_count'];
            foreach ($summary['spending_by_type'] as $type => $amt) {
                $merged['spending_by_type'][$type] = bcadd($merged['spending_by_type'][$type] ?? '0', $amt, 4);
            }
        }

        $merged['net_flow'] = bcsub($merged['total_received'], $merged['total_spent'], 4);

        return $merged;
    }

    private function buildMonthlyBreakdown($accounts): array
    {
        if ($accounts->isEmpty()) {
            return [];
        }

        $accountIds = $accounts->pluck('account_id');
        $months = [];

        for ($i = 5; $i >= 0; $i--) {
            $month = CarbonImmutable::now()->subMonths($i);
            $start = $month->startOfMonth();
            $end = $month->endOfMonth();

            $spent = (float) Transaction::whereIn('source_account_id', $accountIds)
                ->whereBetween('posted_at', [$start, $end])
                ->sum('amount');

            $received = (float) Transaction::whereIn('dest_account_id', $accountIds)
                ->whereBetween('posted_at', [$start, $end])
                ->sum('amount');

            $months[] = [
                'month' => $month->format('M'),
                'income' => round($received, 2),
                'expenses' => round($spent, 2),
            ];
        }

        return $months;
    }
}
