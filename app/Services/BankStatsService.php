<?php

namespace App\Services;

use App\Models\Account;
use App\Models\Transaction;
use App\Models\User;
use App\Enums\TransactionStatus;

class BankStatsService
{
    /**
     * Get global statistics for the bank landing page.
     *
     * @return array
     */
    public function getGlobalStats(): array
    {
        return [
            'total_users' => User::count(),
            'total_accounts' => Account::count(),
            'total_transactions' => Transaction::where('status', TransactionStatus::COMPLETED)->count(),
            'total_volume' => (string) Transaction::where('status', TransactionStatus::COMPLETED)->sum('amount'),
        ];
    }
}
