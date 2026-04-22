<?php

namespace App\Domain\Loan;

use App\Enums\LoanProduct;
use App\ValueObjects\Money;

final class MortgageLoan extends Loan
{
    public function product(): LoanProduct
    {
        return LoanProduct::MORTGAGE;
    }

    public function interestCalculator(): InterestCalculator
    {
        return new ReducingBalanceCalculator;
    }

    public function maxTenorMonths(): int
    {
        return 360;
    }

    public function minPrincipal(): Money
    {
        return Money::of('5000000', 'NGN');
    }

    public function requiresCollateral(): bool
    {
        return true;
    }
}
