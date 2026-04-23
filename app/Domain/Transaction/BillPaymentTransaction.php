<?php

namespace App\Domain\Transaction;

use App\Domain\Account\Account;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Biller;
use App\Models\Transaction as TransactionModel;
use App\ValueObjects\Money;

final readonly class BillPaymentTransaction extends AbstractTransaction
{
    public function __construct(
        Money $amount,
        Account $source,
        private Biller $biller,
        private string $customerReference,
        ?int $initiatedBy = null,
        ?string $narration = null,
        ?string $channel = 'mobile-app',
        array $metadata = [],
    ) {
        parent::__construct(
            $amount,
            $source,
            null,
            $initiatedBy,
            $narration ?? "Bill payment to {$biller->name} ({$customerReference})",
            $channel,
            array_merge($metadata, [
                'biller_id' => $biller->biller_id,
                'biller_code' => $biller->code,
                'customer_reference' => $customerReference,
            ]),
        );
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
        return TransactionType::BILL_PAYMENT;
    }

    public function biller(): Biller
    {
        return $this->biller;
    }

    public function customerReference(): string
    {
        return $this->customerReference;
    }
}
