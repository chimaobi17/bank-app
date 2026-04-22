<?php

use App\Enums\AccountStatus;
use App\Enums\AccountType;
use App\Exceptions\AccountNotActiveException;
use App\Exceptions\InsufficientFundsException;
use App\Exceptions\InvalidStateTransitionException;
use App\Models\Account;
use App\ValueObjects\Money;

it('deposits into an active account', function () {
    $a = new Account([
        'balance' => '100.0000',
        'available_balance' => '100.0000',
        'currency' => 'NGN',
        'account_type' => AccountType::SAVINGS,
        'status' => AccountStatus::ACTIVE,
    ]);

    $a->deposit(Money::of('50.0000'));
    expect((string) $a->balance)->toBe('150.0000');
});

it('withdraws with sufficient funds', function () {
    $a = new Account([
        'balance' => '100.0000',
        'available_balance' => '100.0000',
        'currency' => 'NGN',
        'account_type' => AccountType::SAVINGS,
        'status' => AccountStatus::ACTIVE,
    ]);

    $a->withdraw(Money::of('30.0000'));
    expect((string) $a->balance)->toBe('70.0000');
});

it('throws when withdrawing more than available', function () {
    $a = new Account([
        'balance' => '50.0000',
        'available_balance' => '50.0000',
        'currency' => 'NGN',
        'account_type' => AccountType::SAVINGS,
        'status' => AccountStatus::ACTIVE,
    ]);

    $a->withdraw(Money::of('100.0000'));
})->throws(InsufficientFundsException::class);

it('refuses operations on inactive accounts', function () {
    $a = new Account([
        'balance' => '100.0000',
        'available_balance' => '100.0000',
        'currency' => 'NGN',
        'account_type' => AccountType::SAVINGS,
        'status' => AccountStatus::DORMANT,
    ]);

    $a->deposit(Money::of('50.0000'));
})->throws(AccountNotActiveException::class);

it('transitions between valid statuses', function () {
    $a = new Account(['status' => AccountStatus::PENDING]);
    $a->transitionTo(AccountStatus::ACTIVE);
    expect($a->status)->toBe(AccountStatus::ACTIVE);
});

it('rejects invalid status transitions', function () {
    $a = new Account(['status' => AccountStatus::CLOSED]);
    $a->transitionTo(AccountStatus::ACTIVE);
})->throws(InvalidStateTransitionException::class);
