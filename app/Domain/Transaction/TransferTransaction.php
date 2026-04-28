<?php

namespace App\Domain\Transaction;

use App\Contracts\Domain\Reversible;
use App\Domain\Account\Account;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\ValueObjects\Money;
use InvalidArgumentException;

/**
 * Immutable transfer intent between two accounts. Validates source/destination
 * compatibility (different accounts, matching currency) inside the constructor
 * — Section 7/8: once constructed, the object is frozen and safe to hand to
 * the TransactionProcessor for atomic execution.
 */
final readonly class TransferTransaction extends AbstractTransaction implements Reversible
{
    public function __construct(
        Money $amount,
        Account $source,
        Account $destination,
        ?int $initiatedBy = null,
        ?string $narration = null,
        ?string $channel = null,
        array $metadata = [],
    ) {
        if ($source->model()->account_id === $destination->model()->account_id) {
            throw new InvalidArgumentException('Source and destination accounts must differ.');
        }

        if ($source->currency() !== $destination->currency()) {
            throw new InvalidArgumentException(
                "Cross-currency transfer not supported: {$source->currency()} → {$destination->currency()}."
            );
        }

        if ($amount->getCurrency() !== $source->currency()) {
            throw new InvalidArgumentException(
                "Transfer amount currency ({$amount->getCurrency()}) must match account currency ({$source->currency()})."
            );
        }

        if ($amount->isZero()) {
            throw new InvalidArgumentException('Transfer amount must be greater than zero.');
        }

        parent::__construct($amount, $source, $destination, $initiatedBy, $narration, $channel, $metadata);
    }

    public function execute(): TransactionResult
    {
        $this->source->withdraw($this->amount);
        $this->destination->deposit($this->amount);

        /** @var \App\Contracts\Repositories\TransactionRepositoryContract $repo */
        $repo = app(\App\Contracts\Repositories\TransactionRepositoryContract::class);

        $model = $repo->build([
            'type' => $this->type(),
            'amount' => $this->amount->getAmount(),
            'currency' => $this->amount->getCurrency(),
            'source_account_id' => $this->source->model()->account_id,
            'dest_account_id' => $this->destination->model()->account_id,
            'status' => TransactionStatus::PENDING,
            'narration' => $this->narration ?: 'Transfer',
            'channel' => $this->channel ?: 'web',
            'initiated_by' => $this->initiatedBy,
            'is_reversible' => true,
            'metadata' => $this->metadata ?: [],
        ]);

        return TransactionResult::success($model, $this->amount);
    }

    public function type(): TransactionType
    {
        return TransactionType::TRANSFER;
    }

    public function reversible(): bool
    {
        return true;
    }

    public function isReversible(): bool
    {
        return true;
    }

    public function reversalWindowHours(): int
    {
        return 24;
    }
}
