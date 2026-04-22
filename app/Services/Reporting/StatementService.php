<?php

namespace App\Services\Reporting;

use App\Models\Account;
use App\Models\Transaction;
use App\ValueObjects\DateRange;
use Carbon\CarbonImmutable;

final class StatementService
{
    public function buildStatement(Account $account, DateRange $range): array
    {
        $start = CarbonImmutable::instance($range->start());
        $end = CarbonImmutable::instance($range->end());

        $transactions = Transaction::where(function ($q) use ($account) {
            $q->where('source_account_id', $account->account_id)
                ->orWhere('dest_account_id', $account->account_id);
        })
            ->whereBetween('posted_at', [$start, $end])
            ->orderBy('posted_at')
            ->get();

        $openingBalance = $this->computeOpeningBalance($account, $start);

        $rows = [];
        $running = $openingBalance;

        foreach ($transactions as $tx) {
            $direction = $tx->source_account_id === $account->account_id ? 'debit' : 'credit';
            $signed = $direction === 'debit'
                ? bcmul((string) $tx->amount, '-1', 4)
                : (string) $tx->amount;
            $running = bcadd($running, $signed, 4);

            $rows[] = [
                'posted_at' => $tx->posted_at?->toIso8601String(),
                'reference' => $tx->reference,
                'type' => $tx->type?->value,
                'narration' => $tx->narration,
                'direction' => $direction,
                'amount' => $tx->amount,
                'balance_after' => $running,
            ];
        }

        return [
            'account' => [
                'account_id' => $account->account_id,
                'account_number' => $account->account_number,
                'account_type' => $account->account_type?->value,
                'currency' => $account->currency,
            ],
            'period' => [
                'start' => $start->toIso8601String(),
                'end' => $end->toIso8601String(),
            ],
            'opening_balance' => $openingBalance,
            'closing_balance' => $running,
            'transactions' => $rows,
            'transaction_count' => count($rows),
        ];
    }

    public function toCsv(array $statement): string
    {
        $header = ['Posted At', 'Reference', 'Type', 'Narration', 'Direction', 'Amount', 'Balance After'];
        $lines = [implode(',', $header)];

        foreach ($statement['transactions'] as $row) {
            $lines[] = implode(',', [
                $row['posted_at'] ?? '',
                $this->csvEscape((string) ($row['reference'] ?? '')),
                $row['type'] ?? '',
                $this->csvEscape((string) ($row['narration'] ?? '')),
                $row['direction'],
                $row['amount'],
                $row['balance_after'],
            ]);
        }

        return implode("\n", $lines);
    }

    private function computeOpeningBalance(Account $account, CarbonImmutable $before): string
    {
        $debits = (string) (Transaction::where('source_account_id', $account->account_id)
            ->where('posted_at', '<', $before)
            ->sum('amount') ?: '0.0000');

        $credits = (string) (Transaction::where('dest_account_id', $account->account_id)
            ->where('posted_at', '<', $before)
            ->sum('amount') ?: '0.0000');

        return bcsub($credits, $debits, 4);
    }

    private function csvEscape(string $v): string
    {
        if (str_contains($v, ',') || str_contains($v, '"')) {
            return '"'.str_replace('"', '""', $v).'"';
        }

        return $v;
    }
}
