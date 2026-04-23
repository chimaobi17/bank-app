<?php

namespace App\Domain\Transaction;

use App\Services\LedgerService;
use Illuminate\Support\Facades\DB;
use Throwable;

final class TransactionProcessor
{
    public function __construct(
        private readonly LedgerService $ledger,
        private readonly \App\Contracts\Repositories\TransactionRepositoryContract $transactions,
    ) {}

    public function process(Transaction $transaction): TransactionResult
    {
        return DB::transaction(function () use ($transaction) {
            /** 
             * Concurrency Control (Section 13)
             * Lock account records for update to prevent race conditions during balance modification.
             */
            $source = null;
            $destination = null;

            if ($transaction instanceof AbstractTransaction) {
                if ($source = $transaction->source()) {
                    $source->model()->lockForUpdate()->find($source->model()->account_id);
                }
                if ($destination = $transaction->destination()) {
                    $destination->model()->lockForUpdate()->find($destination->model()->account_id);
                }
            }

            $result = null;

            try {
                $result = $transaction->execute();
                
                // Persistence Orchestration: Atomically commit Domain state changes
                if ($source) $source->model()->save();
                if ($destination) $destination->model()->save();

                // Save the Transaction record itself
                $result->transaction->save();

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
