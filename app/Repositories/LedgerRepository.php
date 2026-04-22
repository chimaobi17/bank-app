<?php

namespace App\Repositories;

use App\Contracts\Repositories\LedgerRepositoryContract;
use App\Enums\LedgerDirection;
use App\Models\LedgerEntry;
use App\ValueObjects\DateRange;
use Illuminate\Support\Collection;

final class LedgerRepository implements LedgerRepositoryContract
{
    public function record(int $transactionId, int $accountId, LedgerDirection $direction, string $amount, string $balanceAfter): LedgerEntry
    {
        return LedgerEntry::create([
            'transaction_id' => $transactionId,
            'account_id' => $accountId,
            'direction' => $direction,
            'amount' => $amount,
            'balance_after' => $balanceAfter,
            'posted_at' => now(),
        ]);
    }

    public function getByTransaction(int $transactionId): Collection
    {
        return LedgerEntry::where('transaction_id', $transactionId)
            ->orderBy('entry_id')
            ->get();
    }

    public function getByAccount(int $accountId, ?DateRange $range = null): Collection
    {
        $query = LedgerEntry::where('account_id', $accountId);

        if ($range !== null) {
            $query->whereBetween('posted_at', [$range->start(), $range->end()]);
        }

        return $query->orderByDesc('posted_at')->get();
    }

    public function sumDebits(int $accountId, DateRange $range): string
    {
        return (string) LedgerEntry::where('account_id', $accountId)
            ->where('direction', LedgerDirection::DEBIT)
            ->whereBetween('posted_at', [$range->start(), $range->end()])
            ->sum('amount');
    }

    public function sumCredits(int $accountId, DateRange $range): string
    {
        return (string) LedgerEntry::where('account_id', $accountId)
            ->where('direction', LedgerDirection::CREDIT)
            ->whereBetween('posted_at', [$range->start(), $range->end()])
            ->sum('amount');
    }
}
