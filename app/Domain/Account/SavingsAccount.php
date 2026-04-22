<?php

namespace App\Domain\Account;

use App\Contracts\Domain\InterestBearing;
use App\Enums\AccountType;
use App\ValueObjects\InterestRate;
use App\ValueObjects\Money;

final class SavingsAccount extends Account implements InterestBearing
{
    public function type(): AccountType
    {
        return AccountType::SAVINGS;
    }

    public function accrueInterest(InterestRate $rate, int $periods = 1): Money
    {
        $interest = bcmul($this->model->balance, $rate->monthly(), 4);
        $interest = bcmul($interest, (string) $periods, 4);

        return Money::of($interest, $this->model->currency);
    }

    public function postingFrequencyDays(): int
    {
        return 30;
    }
}
