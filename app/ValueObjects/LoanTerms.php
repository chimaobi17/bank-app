<?php

namespace App\ValueObjects;

use InvalidArgumentException;

final readonly class LoanTerms
{
    public function __construct(
        public Money $principal,
        public InterestRate $rate,
        public int $tenorMonths,
    ) {
        if ($tenorMonths < 1 || $tenorMonths > 360) {
            throw new InvalidArgumentException('Tenor must be between 1 and 360 months.');
        }

        if ($principal->isZero()) {
            throw new InvalidArgumentException('Principal must be greater than zero.');
        }
    }

    public function totalMonths(): int
    {
        return $this->tenorMonths;
    }

    public function currency(): string
    {
        return $this->principal->getCurrency();
    }
}
