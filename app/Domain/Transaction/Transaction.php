<?php

namespace App\Domain\Transaction;

use App\Enums\TransactionType;
use App\ValueObjects\Money;

interface Transaction
{
    public function execute(): TransactionResult;

    public function type(): TransactionType;

    public function amount(): Money;

    public function reversible(): bool;
}
