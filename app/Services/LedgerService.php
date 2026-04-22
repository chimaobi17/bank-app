<?php

namespace App\Services;

use App\Contracts\Repositories\LedgerRepositoryContract;
use App\Domain\Account\Account;
use App\Enums\LedgerDirection;
use App\Models\Transaction;
use App\ValueObjects\Money;
use RuntimeException;

final class LedgerService
{
    public function __construct(
        private readonly LedgerRepositoryContract $ledger,
    ) {}

    public function postDoubleEntry(Transaction $transaction, Account $debitAccount, Account $creditAccount, Money $amount): void
    {
        $this->ledger->record(
            $transaction->transaction_id,
            $debitAccount->model()->account_id,
            LedgerDirection::DEBIT,
            $amount->getAmount(),
            $debitAccount->model()->balance,
        );

        $this->ledger->record(
            $transaction->transaction_id,
            $creditAccount->model()->account_id,
            LedgerDirection::CREDIT,
            $amount->getAmount(),
            $creditAccount->model()->balance,
        );

        $this->assertBalanced($transaction);
    }

    public function postDebit(Transaction $transaction, Account $account, Money $amount): void
    {
        $this->ledger->record(
            $transaction->transaction_id,
            $account->model()->account_id,
            LedgerDirection::DEBIT,
            $amount->getAmount(),
            $account->model()->balance,
        );
    }

    public function postCredit(Transaction $transaction, Account $account, Money $amount): void
    {
        $this->ledger->record(
            $transaction->transaction_id,
            $account->model()->account_id,
            LedgerDirection::CREDIT,
            $amount->getAmount(),
            $account->model()->balance,
        );
    }

    public function assertBalanced(Transaction $transaction): void
    {
        $entries = $this->ledger->getByTransaction($transaction->transaction_id);

        $debits = '0';
        $credits = '0';

        foreach ($entries as $entry) {
            if ($entry->direction === LedgerDirection::DEBIT) {
                $debits = bcadd($debits, (string) $entry->amount, 4);
            } else {
                $credits = bcadd($credits, (string) $entry->amount, 4);
            }
        }

        if (bccomp($debits, $credits, 4) !== 0) {
            throw new RuntimeException(
                "Ledger imbalance for transaction {$transaction->reference}: DR={$debits}, CR={$credits}"
            );
        }
    }
}
