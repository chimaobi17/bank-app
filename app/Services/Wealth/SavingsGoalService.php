<?php

namespace App\Services\Wealth;

use App\Models\Customer;
use App\Models\SavingsGoal;
use App\ValueObjects\Money;
use Carbon\CarbonImmutable;
use InvalidArgumentException;

final class SavingsGoalService
{
    public function create(
        Customer $customer,
        string $name,
        Money $target,
        ?CarbonImmutable $targetDate = null,
        ?int $accountId = null,
        ?string $color = null,
    ): SavingsGoal {
        if ($target->isZero()) {
            throw new InvalidArgumentException('Target amount must be greater than zero.');
        }

        return SavingsGoal::create([
            'customer_id' => $customer->customer_id,
            'account_id' => $accountId,
            'name' => $name,
            'target_amount' => $target->getAmount(),
            'current_amount' => '0.0000',
            'currency' => $target->getCurrency(),
            'target_date' => $targetDate?->toDateString(),
            'status' => 'active',
            'color' => $color,
        ]);
    }

    public function contribute(SavingsGoal $goal, Money $amount): SavingsGoal
    {
        if ($goal->currency !== $amount->getCurrency()) {
            throw new InvalidArgumentException('Currency mismatch between goal and contribution.');
        }

        if ($amount->isZero()) {
            throw new InvalidArgumentException('Contribution must be greater than zero.');
        }

        $goal->current_amount = bcadd((string) $goal->current_amount, $amount->getAmount(), 4);

        if ($goal->isAchieved()) {
            $goal->status = 'achieved';
        }

        $goal->save();

        return $goal;
    }

    public function cancel(SavingsGoal $goal): void
    {
        $goal->status = 'cancelled';
        $goal->save();
    }
}
