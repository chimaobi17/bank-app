<?php

namespace App\Contracts\Repositories;

use App\Models\Account;
use Illuminate\Support\Collection;

interface AccountRepositoryContract
{
    public function findById(int $id): ?Account;

    public function findByNumber(string $accountNumber): ?Account;

    public function findByCustomer(int $customerId): Collection;

    public function save(Account $account): void;

    public function getDailyTransferTotal(int $accountId, string $date): string;
}
