<?php

namespace App\Contracts\Domain;

use App\ValueObjects\Money;

interface FeeCharging
{
    public function feeFor(string $operation, Money $amount): Money;
}
