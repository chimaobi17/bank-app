<?php

namespace App\Domain\Transaction;

use App\Domain\Account\Account;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Transaction as TransactionModel;
use App\ValueObjects\Money;

final readonly class WithdrawalTransaction extends AbstractTransaction
{
    public function __construct(
        Money $amount,
        Account $source,
        ?int $initiatedBy = null,
        ?string $narration = null,
        ?string $channel = null,
        array $metadata = [],
    ) {
        parent::__construct($amount, $source, null, $initiatedBy, $narration, $channel, $metadata);
    }

    public function execute(): TransactionResult
    {
        $this->source->withdraw($this->amount);
        $this->source->model()->save();

        $model = TransactionModel::create([
            'type' => $this->type(),
            'amount' => $this->amount->getAmount(),
            'currency' => $this->amount->getCurrency(),
            'source_account_id' => $this->source->model()->account_id,
            'status' => TransactionStatus::PENDING,
            'narration' => $this->narration,
            'channel' => $this->channel,
            'initiated_by' => $this->initiatedBy,
            'is_reversible' => false,
            'metadata' => $this->metadata,
        ]);

        return TransactionResult::success($model, $this->amount);
    }

    public function type(): TransactionType
    {
        return TransactionType::WITHDRAWAL;
    }
}
