<?php

namespace App\Domain\Transaction;

use App\Services\LedgerService;
use Illuminate\Support\Facades\DB;
use Throwable;

final class TransactionProcessor
{
    public function __construct(
        private readonly LedgerService $ledger,
    ) {}

    public function process(Transaction $transaction): TransactionResult
    {
        return DB::transaction(function () use ($transaction) {
            $result = null;

            try {
                $result = $transaction->execute();
                $this->postLedger($transaction, $result);
                $result->transaction->markCompleted();

                return $result;
            } catch (Throwable $e) {
                if ($result !== null && $result->transaction->exists) {
                    $result->transaction->markFailed();
                }
                throw $e;
            }
        });
    }

    private function postLedger(Transaction $transaction, TransactionResult $result): void
    {
        if (! $transaction instanceof AbstractTransaction) {
            return;
        }

        $source = $transaction->source();
        $destination = $transaction->destination();

        if ($source !== null && $destination !== null) {
            $this->ledger->postDoubleEntry($result->transaction, $source, $destination, $result->amount);

            return;
        }

        if ($source !== null) {
            $this->ledger->postDebit($result->transaction, $source, $result->amount);
        }

        if ($destination !== null) {
            $this->ledger->postCredit($result->transaction, $destination, $result->amount);
        }
    }
}
