<?php

namespace App\Domain\Transaction;

use App\Domain\Account\Account;
use App\Enums\TransactionType;
use App\ValueObjects\Money;

abstract class AbstractTransaction implements Transaction
{
    public function __construct(
        protected Money $amount,
        protected ?Account $source = null,
        protected ?Account $destination = null,
        protected ?int $initiatedBy = null,
        protected ?string $narration = null,
        protected ?string $channel = null,
        protected array $metadata = [],
    ) {}

    abstract public function execute(): TransactionResult;

    abstract public function type(): TransactionType;

    public function amount(): Money
    {
        return $this->amount;
    }

    public function reversible(): bool
    {
        return false;
    }

    public function source(): ?Account
    {
        return $this->source;
    }

    public function destination(): ?Account
    {
        return $this->destination;
    }

    public function initiatedBy(): ?int
    {
        return $this->initiatedBy;
    }

    public function narration(): ?string
    {
        return $this->narration;
    }

    public function channel(): ?string
    {
        return $this->channel;
    }

    public function metadata(): array
    {
        return $this->metadata;
    }
}
