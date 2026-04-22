<?php

namespace App\Contracts\Repositories;

use App\Enums\LedgerDirection;
use App\Models\LedgerEntry;
use App\ValueObjects\DateRange;
use Illuminate\Support\Collection;

interface LedgerRepositoryContract
{
    public function record(int $transactionId, int $accountId, LedgerDirection $direction, string $amount, string $balanceAfter): LedgerEntry;

    public function getByTransaction(int $transactionId): Collection;

    public function getByAccount(int $accountId, ?DateRange $range = null): Collection;

    public function sumDebits(int $accountId, DateRange $range): string;

    public function sumCredits(int $accountId, DateRange $range): string;
}
