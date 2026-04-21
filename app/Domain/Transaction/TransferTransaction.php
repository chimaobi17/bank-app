<?php

namespace App\Domain\Transaction;

use App\Contracts\Domain\Reversible;
use App\Domain\Account\Account;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Transaction as TransactionModel;
use App\ValueObjects\Money;
use InvalidArgumentException;

final class TransferTransaction extends AbstractTransaction implements Reversible
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

        parent::__construct($amount, $source, $destination, $initiatedBy, $narration, $channel, $metadata);
    }

    public function execute(): TransactionResult
    {
        $this->source->withdraw($this->amount);
        $this->destination->deposit($this->amount);

        $this->source->model()->save();
        $this->destination->model()->save();

        $model = TransactionModel::create([
            'type' => $this->type(),
            'amount' => $this->amount->getAmount(),
            'currency' => $this->amount->getCurrency(),
            'source_account_id' => $this->source->model()->account_id,
            'dest_account_id' => $this->destination->model()->account_id,
            'status' => TransactionStatus::PENDING,
            'narration' => $this->narration,
            'channel' => $this->channel,
            'initiated_by' => $this->initiatedBy,
            'is_reversible' => true,
            'metadata' => $this->metadata,
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
