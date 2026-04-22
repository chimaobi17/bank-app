<?php

namespace App\Services;

use App\Contracts\Repositories\AccountRepositoryContract;
use App\Contracts\Repositories\AuditLogRepositoryContract;
use App\Domain\Account\Account as DomainAccount;
use App\Domain\Account\AccountFactory;
use App\Domain\Transaction\TransactionProcessor;
use App\Domain\Transaction\TransactionResult;
use App\Domain\Transaction\TransferTransaction;
use App\Enums\LedgerDirection;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Events\TransferCompleted;
use App\Exceptions\TransactionLimitExceededException;
use App\Models\Transaction;
use App\ValueObjects\Money;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use RuntimeException;

final class TransferService
{
    public function __construct(
        private readonly AccountRepositoryContract $accounts,
        private readonly TransactionProcessor $processor,
        private readonly LedgerService $ledger,
        private readonly AuditLogRepositoryContract $audit,
    ) {}

    public function execute(
        string $fromAccountNumber,
        string $toAccountNumber,
        Money $amount,
        string $narration = '',
        ?int $initiatedBy = null,
    ): TransactionResult {
        $sourceModel = $this->accounts->findByNumber($fromAccountNumber);
        $destModel = $this->accounts->findByNumber($toAccountNumber);

        if (! $sourceModel || ! $destModel) {
            throw new InvalidArgumentException('One or both accounts not found.');
        }

        $this->guardLimits($sourceModel, $amount);

        $source = AccountFactory::fromModel($sourceModel);
        $destination = AccountFactory::fromModel($destModel);

        $transaction = new TransferTransaction(
            amount: $amount,
            source: $source,
            destination: $destination,
            initiatedBy: $initiatedBy ?? auth()->id(),
            narration: $narration,
        );

        $result = $this->processor->process($transaction);

        $this->audit->record($source, 'transfer.completed', $initiatedBy, [
            'from' => $fromAccountNumber,
            'to' => $toAccountNumber,
            'amount' => $amount->getAmount(),
            'reference' => $result->reference->getValue(),
        ]);

        event(new TransferCompleted($result->transaction));

        return $result;
    }

    public function reverse(Transaction $transaction, int $authorizedBy): Transaction
    {
        if (! $transaction->isReversible()) {
            throw new RuntimeException('This transaction cannot be reversed.');
        }

        return DB::transaction(function () use ($transaction, $authorizedBy) {
            $sourceModel = $transaction->sourceAccount;
            $destModel = $transaction->destinationAccount;
            $amount = Money::of($transaction->amount, $transaction->currency);

            $source = AccountFactory::fromModel($sourceModel);
            $destination = AccountFactory::fromModel($destModel);

            $destination->withdraw($amount);
            $source->deposit($amount);

            $sourceModel->save();
            $destModel->save();

            $reversal = Transaction::create([
                'type' => TransactionType::REVERSAL,
                'amount' => $amount->getAmount(),
                'currency' => $transaction->currency,
                'source_account_id' => $destModel->account_id,
                'dest_account_id' => $sourceModel->account_id,
                'status' => TransactionStatus::COMPLETED,
                'narration' => "Reversal of {$transaction->reference}",
                'initiated_by' => $authorizedBy,
                'posted_at' => now(),
                'reversed_by_id' => $transaction->transaction_id,
                'is_reversible' => false,
            ]);

            $transaction->update([
                'status' => TransactionStatus::REVERSED,
                'is_reversible' => false,
            ]);

            $this->ledger->postDoubleEntry($reversal, $destination, $source, $amount);

            return $reversal;
        });
    }

    private function guardLimits($sourceModel, Money $amount): void
    {
        $perTxn = Money::of($sourceModel->per_transaction_limit, $sourceModel->currency);
        if ($amount->isGreaterThan($perTxn)) {
            throw new TransactionLimitExceededException('Amount exceeds per-transaction limit.');
        }

        $dailyTotal = $this->accounts->getDailyTransferTotal($sourceModel->account_id, today()->toDateString());
        $newTotal = Money::of($dailyTotal, $sourceModel->currency)->add($amount);
        $dailyCap = Money::of($sourceModel->daily_transfer_limit, $sourceModel->currency);

        if ($newTotal->isGreaterThan($dailyCap)) {
            throw new TransactionLimitExceededException('Daily transfer limit would be exceeded.');
        }
    }
}
