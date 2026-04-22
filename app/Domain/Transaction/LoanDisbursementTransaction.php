<?php

namespace App\Domain\Transaction;

use App\Domain\Account\Account;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\Loan;
use App\Models\Transaction as TransactionModel;
use App\ValueObjects\Money;

final readonly class LoanDisbursementTransaction extends AbstractTransaction
{
    public function __construct(
        Money $amount,
        Account $destination,
        private Loan $loan,
        ?int $initiatedBy = null,
        ?string $narration = null,
        ?string $channel = null,
        array $metadata = [],
    ) {
        parent::__construct(
            $amount,
            null,
            $destination,
            $initiatedBy,
            $narration ?? "Loan disbursement for loan #{$loan->loan_number}",
            $channel,
            array_merge($metadata, [
                'loan_id' => $loan->loan_id,
                'loan_number' => $loan->loan_number,
            ]),
        );
    }

    public function execute(): TransactionResult
    {
        $this->destination->deposit($this->amount);
        $this->destination->model()->save();

        $model = TransactionModel::create([
            'type' => $this->type(),
            'amount' => $this->amount->getAmount(),
            'currency' => $this->amount->getCurrency(),
            'dest_account_id' => $this->destination->model()->account_id,
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
        return TransactionType::LOAN_DISBURSEMENT;
    }

    public function loan(): Loan
    {
        return $this->loan;
    }
}
