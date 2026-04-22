<?php

namespace App\Services\Reporting;

use App\Models\Account;
use App\Models\Transaction;
use App\ValueObjects\DateRange;
use Carbon\CarbonImmutable;

final class SpendAnalysisService
{
    public function summarize(Account $account, DateRange $range): array
    {
        $start = CarbonImmutable::instance($range->start());
        $end = CarbonImmutable::instance($range->end());

        $debits = Transaction::where('source_account_id', $account->account_id)
            ->whereBetween('posted_at', [$start, $end])
            ->get();

        $credits = Transaction::where('dest_account_id', $account->account_id)
            ->whereBetween('posted_at', [$start, $end])
            ->get();

        $totalSpent = $debits->reduce(
            fn ($c, $t) => bcadd($c, (string) $t->amount, 4),
            '0.0000',
        );
        $totalReceived = $credits->reduce(
            fn ($c, $t) => bcadd($c, (string) $t->amount, 4),
            '0.0000',
        );

        $byType = $debits->groupBy(fn ($t) => $t->type?->value ?? 'unknown')
            ->map(fn ($group) => $group->reduce(
                fn ($c, $t) => bcadd($c, (string) $t->amount, 4),
                '0.0000',
            ))->toArray();

        return [
            'period' => [
                'start' => $start->toIso8601String(),
                'end' => $end->toIso8601String(),
            ],
            'total_spent' => $totalSpent,
            'total_received' => $totalReceived,
            'net_flow' => bcsub($totalReceived, $totalSpent, 4),
            'spending_by_type' => $byType,
            'transaction_count' => $debits->count() + $credits->count(),
        ];
    }
}
