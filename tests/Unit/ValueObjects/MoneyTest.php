<?php

use App\ValueObjects\Money;

it('creates money with amount and currency', function () {
    $m = Money::of('100.5000', 'NGN');
    expect($m->getAmount())->toBe('100.5000');
    expect($m->getCurrency())->toBe('NGN');
});

it('adds two money values of the same currency', function () {
    $a = Money::of('100.0000', 'NGN');
    $b = Money::of('50.0000', 'NGN');
    expect($a->add($b)->getAmount())->toBe('150.0000');
});

it('subtracts two money values', function () {
    $a = Money::of('100.0000', 'NGN');
    $b = Money::of('30.0000', 'NGN');
    expect($a->subtract($b)->getAmount())->toBe('70.0000');
});

it('throws when adding mismatched currencies', function () {
    $a = Money::of('100.0000', 'NGN');
    $b = Money::of('50.0000', 'USD');
    $a->add($b);
})->throws(InvalidArgumentException::class);

it('compares amounts correctly', function () {
    $a = Money::of('100.0000');
    $b = Money::of('50.0000');
    expect($a->isGreaterThan($b))->toBeTrue();
    expect($b->isLessThan($a))->toBeTrue();
});

it('produces zero money', function () {
    expect(Money::zero('NGN')->getAmount())->toBe('0.0000');
});
