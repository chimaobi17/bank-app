<?php

use App\ValueObjects\AccountNumber;

it('generates a 10-digit account number', function () {
    $num = AccountNumber::generate();
    expect($num->getValue())->toHaveLength(10);
});

it('generates a number prefixed with 20', function () {
    $num = AccountNumber::generate();
    expect(substr($num->getValue(), 0, 2))->toBe('20');
});

it('rejects invalid lengths', function () {
    new AccountNumber('12345');
})->throws(InvalidArgumentException::class);

it('rejects non-numeric values', function () {
    new AccountNumber('abcdefghij');
})->throws(InvalidArgumentException::class);
