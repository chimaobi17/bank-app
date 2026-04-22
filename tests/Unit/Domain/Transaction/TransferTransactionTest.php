<?php

use App\Domain\Account\AccountFactory;
use App\Domain\Transaction\TransferTransaction;
use App\Enums\AccountStatus;
use App\Enums\AccountType;
use App\Enums\TransactionType;
use App\Models\Account as AccountModel;
use App\ValueObjects\Money;

function phase11DomainAccount(int $id, string $currency = 'NGN', array $overrides = [])
{
    $model = new AccountModel(array_merge([
        'balance' => '1000.0000',
        'available_balance' => '1000.0000',
        'currency' => $currency,
        'account_type' => AccountType::SAVINGS,
        'status' => AccountStatus::ACTIVE,
    ], $overrides));
    $model->setAttribute('account_id', $id);

    return AccountFactory::fromModel($model);
}

it('constructs a valid same-currency transfer intent', function () {
    $source = phase11DomainAccount(1);
    $dest = phase11DomainAccount(2);

    $transfer = new TransferTransaction(
        amount: Money::of('100.00', 'NGN'),
        source: $source,
        destination: $dest,
    );

    expect($transfer->type())->toBe(TransactionType::TRANSFER);
    expect($transfer->isReversible())->toBeTrue();
    expect($transfer->reversalWindowHours())->toBe(24);
});

it('rejects a transfer where source and destination are the same account', function () {
    $source = phase11DomainAccount(1);
    new TransferTransaction(
        amount: Money::of('100.00', 'NGN'),
        source: $source,
        destination: $source,
    );
})->throws(InvalidArgumentException::class, 'must differ');

it('rejects cross-currency transfers', function () {
    $source = phase11DomainAccount(1, 'NGN');
    $dest = phase11DomainAccount(2, 'USD');

    new TransferTransaction(
        amount: Money::of('100.00', 'NGN'),
        source: $source,
        destination: $dest,
    );
})->throws(InvalidArgumentException::class, 'Cross-currency transfer');

it('rejects an amount whose currency does not match source', function () {
    $source = phase11DomainAccount(1, 'NGN');
    $dest = phase11DomainAccount(2, 'NGN');

    new TransferTransaction(
        amount: Money::of('100.00', 'USD'),
        source: $source,
        destination: $dest,
    );
})->throws(InvalidArgumentException::class, 'must match account currency');

it('rejects a zero-amount transfer', function () {
    $source = phase11DomainAccount(1);
    $dest = phase11DomainAccount(2);

    new TransferTransaction(
        amount: Money::zero('NGN'),
        source: $source,
        destination: $dest,
    );
})->throws(InvalidArgumentException::class, 'greater than zero');

it('the TransferTransaction is a readonly class (cannot be modified post-construct)', function () {
    $reflector = new ReflectionClass(TransferTransaction::class);
    expect($reflector->isReadOnly())->toBeTrue();
});

it('Account::transfer() returns a TransferTransaction bound to the source', function () {
    $source = phase11DomainAccount(1);
    $dest = phase11DomainAccount(2);

    $intent = $source->transfer(Money::of('50.00', 'NGN'), $dest, initiatedBy: 99);

    expect($intent)->toBeInstanceOf(TransferTransaction::class);
    expect($intent->source())->toBe($source);
    expect($intent->destination())->toBe($dest);
    expect($intent->initiatedBy())->toBe(99);
});
