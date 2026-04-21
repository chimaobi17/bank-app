<?php

namespace App\Domain\Loan;

use App\Enums\LoanProduct;
use App\ValueObjects\Money;

final class PersonalLoan extends Loan
{
    public function product(): LoanProduct
    {
        return LoanProduct::PERSONAL;
    }

    public function interestCalculator(): InterestCalculator
    {
        return new ReducingBalanceCalculator;
    }

    public function maxTenorMonths(): int
    {
        return 60;
    }

    public function minPrincipal(): Money
    {
        return Money::of('50000', 'NGN');
    }

    public function requiresCollateral(): bool
    {
        return false;
    }
}
