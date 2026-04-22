<?php

namespace App\Domain\Loan;

use App\Enums\LoanProduct;
use App\ValueObjects\Money;

final class AutoLoan extends Loan
{
    public function product(): LoanProduct
    {
        return LoanProduct::AUTO;
    }

    public function interestCalculator(): InterestCalculator
    {
        return new ReducingBalanceCalculator;
    }

    public function maxTenorMonths(): int
    {
        return 84;
    }

    public function minPrincipal(): Money
    {
        return Money::of('500000', 'NGN');
    }

    public function requiresCollateral(): bool
    {
        return true;
    }
}
