<?php

namespace App\Services;

use App\Contracts\Repositories\AccountRepositoryContract;
use App\Enums\AccountStatus;
use App\Enums\AccountType;
use App\Models\Account;
use App\Models\AuditLog;
use App\Models\Customer;
use App\ValueObjects\AccountNumber;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AccountService
{
    public function __construct(
        private AccountRepositoryContract $accounts,
    ) {}

    public function openAccount(Customer $customer, AccountType $type, ?int $branchId = null, array $options = []): Account
    {
        return DB::transaction(function () use ($customer, $type, $branchId, $options) {
            $accountNumber = AccountNumber::generate();

            // Ensure uniqueness
            while ($this->accounts->findByNumber($accountNumber->getValue())) {
                $accountNumber = AccountNumber::generate();
            }

            $account = Account::create([
                'account_number' => $accountNumber->getValue(),
                'customer_id' => $customer->customer_id,
                'account_type' => $type,
                'balance' => '0.0000',
                'available_balance' => '0.0000',
                'currency' => $options['currency'] ?? 'NGN',
                'status' => AccountStatus::PENDING,
                'branch_id' => $branchId,
                'interest_rate' => $options['interest_rate'] ?? $this->getDefaultInterestRate($type),
                'daily_transfer_limit' => $options['daily_transfer_limit'] ?? '1000000.0000',
                'per_transaction_limit' => $options['per_transaction_limit'] ?? '500000.0000',
                'opened_at' => now(),
                'lock_in_months' => $options['lock_in_months'] ?? null,
                'maturity_date' => isset($options['lock_in_months'])
                    ? now()->addMonths($options['lock_in_months'])
                    : null,
                'early_liquidation_penalty' => $options['early_liquidation_penalty'] ?? null,
                'overdraft_limit' => $type === AccountType::CHECKING ? ($options['overdraft_limit'] ?? '0') : null,
            ]);

            AuditLog::record('account.opened', 'Account', $account->account_id, null, [
                'account_number' => $account->account_number,
                'type' => $type->value,
            ]);

            return $account;
        });
    }

    public function activateAccount(Account $account): Account
    {
        return DB::transaction(function () use ($account) {
            $before = ['status' => $account->status->value];
            $account->transitionTo(AccountStatus::ACTIVE);
            $this->accounts->save($account);

            AuditLog::record('account.activated', 'Account', $account->account_id, $before, [
                'status' => AccountStatus::ACTIVE->value,
            ]);

            return $account;
        });
    }

    public function closeAccount(Account $account): Account
    {
        return DB::transaction(function () use ($account) {
            $before = ['status' => $account->status->value];
            $account->transitionTo(AccountStatus::CLOSED);
            $account->closed_at = now();
            $this->accounts->save($account);

            AuditLog::record('account.closed', 'Account', $account->account_id, $before, [
                'status' => AccountStatus::CLOSED->value,
            ]);

            return $account;
        });
    }

    public function getCustomerAccounts(int $customerId): Collection
    {
        return $this->accounts->findByCustomer($customerId);
    }

    public function getAccountByNumber(string $accountNumber): ?Account
    {
        return $this->accounts->findByNumber($accountNumber);
    }

    private function getDefaultInterestRate(AccountType $type): ?string
    {
        return match ($type) {
            AccountType::SAVINGS => '0.0350',
            AccountType::FIXED_DEPOSIT => '0.0800',
            AccountType::CHECKING => null,
        };
    }
}
