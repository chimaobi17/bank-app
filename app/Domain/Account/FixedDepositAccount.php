<?php

namespace App\Domain\Account;

use App\Contracts\Domain\InterestBearing;
use App\Contracts\Domain\Lockable;
use App\Enums\AccountType;
use App\ValueObjects\InterestRate;
use App\ValueObjects\Money;
use DateTimeImmutable;
use RuntimeException;

final class FixedDepositAccount extends Account implements InterestBearing, Lockable
{
    public function type(): AccountType
    {
        return AccountType::FIXED_DEPOSIT;
    }

    public function accrueInterest(InterestRate $rate, int $periods = 1): Money
    {
        $interest = bcmul($this->model->balance, $rate->annual(), 4);
        $interest = bcmul($interest, (string) $periods, 4);
        $interest = bcdiv($interest, '12', 4);

        return Money::of($interest, $this->model->currency);
    }

    public function postingFrequencyDays(): int
    {
        return 365;
    }

    public function isLocked(DateTimeImmutable $at): bool
    {
        return $at < $this->unlockDate();
    }

    public function unlockDate(): DateTimeImmutable
    {
        if (! $this->model->maturity_date) {
            throw new RuntimeException('Fixed deposit has no maturity date set.');
        }

        return new DateTimeImmutable($this->model->maturity_date->toIso8601String());
    }

    public function withdraw(Money $amount): void
    {
        if ($this->isLocked(new DateTimeImmutable)) {
            $penalty = $this->earlyLiquidationPenalty($amount);
            parent::withdraw($amount->add($penalty));

            return;
        }

        parent::withdraw($amount);
    }

    public function earlyLiquidationPenalty(Money $withdrawalAmount): Money
    {
        $rate = $this->model->early_liquidation_penalty ?? '0';
        $penalty = bcmul($withdrawalAmount->getAmount(), $rate, 4);

        return Money::of($penalty, $this->model->currency);
    }
}
