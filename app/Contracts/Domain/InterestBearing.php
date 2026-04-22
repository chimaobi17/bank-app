<?php

namespace App\Contracts\Domain;

use App\ValueObjects\InterestRate;
use App\ValueObjects\Money;

interface InterestBearing
{
    public function accrueInterest(InterestRate $rate, int $periods = 1): Money;

    public function postingFrequencyDays(): int;
}
