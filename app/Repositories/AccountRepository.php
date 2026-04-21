<?php

namespace App\Repositories;

use App\Contracts\Repositories\AccountRepositoryContract;
use App\Enums\TransactionStatus;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Support\Collection;

class AccountRepository implements AccountRepositoryContract
{
    public function findById(int $id): ?Account
    {
        return Account::find($id);
    }

    public function findByNumber(string $accountNumber): ?Account
    {
        return Account::where('account_number', $accountNumber)->first();
    }

    public function findByCustomer(int $customerId): Collection
    {
        return Account::where('customer_id', $customerId)
            ->orderBy('opened_at', 'desc')
            ->get();
    }

    public function save(Account $account): void
    {
        $account->save();
    }

    public function getDailyTransferTotal(int $accountId, string $date): string
    {
        return (string) Transaction::where('source_account_id', $accountId)
            ->where('status', TransactionStatus::COMPLETED)
            ->whereDate('posted_at', $date)
            ->sum('amount');
    }
}
