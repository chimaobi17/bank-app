<?php

namespace App\Domain\Transaction;

use App\Models\Transaction as TransactionModel;
use App\ValueObjects\Money;
use App\ValueObjects\TransactionReference;

final readonly class TransactionResult
{
    public function __construct(
        public TransactionModel $transaction,
        public TransactionReference $reference,
        public Money $amount,
        public bool $success,
        public ?string $failureReason = null,
    ) {}

    public static function success(TransactionModel $transaction, Money $amount): self
    {
        return new self(
            $transaction,
            new TransactionReference($transaction->reference),
            $amount,
            true,
        );
    }

    public static function failure(TransactionModel $transaction, Money $amount, string $reason): self
    {
        return new self(
            $transaction,
            new TransactionReference($transaction->reference),
            $amount,
            false,
            $reason,
        );
    }
}
