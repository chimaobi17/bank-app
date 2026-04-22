<?php

use App\Models\Customer;
use App\Models\SavingsGoal;
use App\Services\Wealth\SavingsGoalService;
use App\ValueObjects\Money;

function phase12Goal(array $overrides = []): SavingsGoal
{
    $g = Mockery::mock(SavingsGoal::class)->makePartial();
    $g->goal_id = $overrides['goal_id'] ?? 1;
    $g->customer_id = $overrides['customer_id'] ?? 1;
    $g->currency = $overrides['currency'] ?? 'NGN';
    $g->current_amount = $overrides['current_amount'] ?? '0.0000';
    $g->target_amount = $overrides['target_amount'] ?? '1000.0000';
    $g->status = $overrides['status'] ?? 'active';
    $g->shouldReceive('save')->andReturn(true);
    $g->shouldReceive('isAchieved')->andReturnUsing(
        fn () => bccomp((string) $g->current_amount, (string) $g->target_amount, 4) >= 0,
    );

    return $g;
}

it('contributes toward a goal and marks achieved at 100%', function () {
    $svc = new SavingsGoalService;
    $goal = phase12Goal(['target_amount' => '500.0000', 'current_amount' => '400.0000']);

    $svc->contribute($goal, Money::of('100', 'NGN'));

    expect((string) $goal->current_amount)->toBe('500.0000');
    expect($goal->status)->toBe('achieved');
});

it('rejects currency-mismatched contributions', function () {
    $goal = phase12Goal(['currency' => 'NGN']);
    (new SavingsGoalService)->contribute($goal, Money::of('10', 'USD'));
})->throws(InvalidArgumentException::class, 'Currency mismatch');

it('rejects zero contributions', function () {
    $goal = phase12Goal();
    (new SavingsGoalService)->contribute($goal, Money::zero('NGN'));
})->throws(InvalidArgumentException::class);

it('cancels a goal', function () {
    $svc = new SavingsGoalService;
    $goal = phase12Goal();

    $svc->cancel($goal);

    expect($goal->status)->toBe('cancelled');
});
