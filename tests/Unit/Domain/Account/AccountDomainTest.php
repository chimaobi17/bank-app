<?php

use App\Domain\Account\AccountFactory;
use App\Domain\Account\CheckingAccount;
use App\Domain\Account\FixedDepositAccount;
use App\Domain\Account\SavingsAccount;
use App\Enums\AccountStatus;
use App\Enums\AccountType;
use App\Exceptions\AccountNotActiveException;
use App\Exceptions\InsufficientFundsException;
use App\Exceptions\InvalidStateTransitionException;
use App\Models\Account as AccountModel;
use App\ValueObjects\Money;

function phase11AccountModel(array $overrides = []): AccountModel
{
    $model = new AccountModel(array_merge([
        'balance' => '1000.0000',
        'available_balance' => '1000.0000',
        'currency' => 'NGN',
        'account_type' => AccountType::SAVINGS,
        'status' => AccountStatus::ACTIVE,
    ], $overrides));

    return $model;
}

it('factories a Savings domain account from the model', function () {
    $account = AccountFactory::fromModel(phase11AccountModel());
    expect($account)->toBeInstanceOf(SavingsAccount::class);
    expect($account->type())->toBe(AccountType::SAVINGS);
});

it('factories a Checking domain account from the model', function () {
    $account = AccountFactory::fromModel(phase11AccountModel(['account_type' => AccountType::CHECKING]));
    expect($account)->toBeInstanceOf(CheckingAccount::class);
});

it('factories a FixedDeposit domain account from the model', function () {
    $account = AccountFactory::fromModel(phase11AccountModel(['account_type' => AccountType::FIXED_DEPOSIT]));
    expect($account)->toBeInstanceOf(FixedDepositAccount::class);
});

it('exposes state predicates that reflect the model status', function () {
    $account = AccountFactory::fromModel(phase11AccountModel(['status' => AccountStatus::FROZEN]));
    expect($account->isFrozen())->toBeTrue();
    expect($account->isActive())->toBeFalse();
});

it('refuses to withdraw from a frozen account via AccountNotActiveException', function () {
    $account = AccountFactory::fromModel(phase11AccountModel(['status' => AccountStatus::FROZEN]));
    $account->withdraw(Money::of('100.00', 'NGN'));
})->throws(AccountNotActiveException::class);

it('refuses to deposit into a closed account', function () {
    $account = AccountFactory::fromModel(phase11AccountModel(['status' => AccountStatus::CLOSED]));
    $account->deposit(Money::of('100.00', 'NGN'));
})->throws(AccountNotActiveException::class);

it('rejects currency mismatches on deposit', function () {
    $account = AccountFactory::fromModel(phase11AccountModel());
    $account->deposit(Money::of('100.00', 'USD'));
})->throws(InvalidArgumentException::class, 'Currency mismatch');

it('rejects currency mismatches on withdraw', function () {
    $account = AccountFactory::fromModel(phase11AccountModel());
    $account->withdraw(Money::of('100.00', 'USD'));
})->throws(InvalidArgumentException::class, 'Currency mismatch');

it('throws InsufficientFunds when available balance is too low', function () {
    $account = AccountFactory::fromModel(phase11AccountModel([
        'balance' => '50.0000',
        'available_balance' => '50.0000',
    ]));
    $account->withdraw(Money::of('100.00', 'NGN'));
})->throws(InsufficientFundsException::class);

it('allows checking account to overdraft up to its limit', function () {
    $account = AccountFactory::fromModel(phase11AccountModel([
        'account_type' => AccountType::CHECKING,
        'balance' => '50.0000',
        'available_balance' => '50.0000',
        'overdraft_limit' => '500.0000',
    ]));

    $account->withdraw(Money::of('300.00', 'NGN'));
    expect((string) $account->model()->balance)->toBe('-250.0000');
});

it('blocks checking account when overdraft limit is exceeded', function () {
    $account = AccountFactory::fromModel(phase11AccountModel([
        'account_type' => AccountType::CHECKING,
        'balance' => '50.0000',
        'available_balance' => '50.0000',
        'overdraft_limit' => '100.0000',
    ]));

    $account->withdraw(Money::of('300.00', 'NGN'));
})->throws(InsufficientFundsException::class);

it('rejects invalid state transitions', function () {
    $account = AccountFactory::fromModel(phase11AccountModel(['status' => AccountStatus::CLOSED]));
    $account->activate();
})->throws(InvalidStateTransitionException::class);

it('transitions a pending account to active via high-level helper', function () {
    $account = AccountFactory::fromModel(phase11AccountModel(['status' => AccountStatus::PENDING]));
    $account->activate();
    expect($account->status())->toBe(AccountStatus::ACTIVE);
});

it('allows a custom resolver to take precedence in the factory', function () {
    $sentinel = null;
    AccountFactory::register(AccountType::SAVINGS, function ($m) use (&$sentinel) {
        $sentinel = 'resolved';
        return new SavingsAccount($m);
    });

    $account = AccountFactory::fromModel(phase11AccountModel());

    expect($account)->toBeInstanceOf(SavingsAccount::class);
    expect($sentinel)->toBe('resolved');

    AccountFactory::clearResolvers();
});
