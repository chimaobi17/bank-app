<?php

use App\Enums\CardStatus;
use App\Models\Card;
use App\Services\Cards\CardManagementService;
use App\ValueObjects\Money;

function phase12Card(array $overrides = []): Card
{
    $c = Mockery::mock(Card::class)->makePartial();
    $c->card_id = $overrides['card_id'] ?? 1;
    $c->account_id = $overrides['account_id'] ?? 1;
    $c->pin_hash = $overrides['pin_hash'] ?? null;
    $c->pin_failed_attempts = $overrides['pin_failed_attempts'] ?? 0;
    $c->status = $overrides['status'] ?? CardStatus::ACTIVE;
    $c->frozen_at = $overrides['frozen_at'] ?? null;
    $c->online_only = $overrides['online_only'] ?? false;
    $c->single_tx_limit = $overrides['single_tx_limit'] ?? null;
    $c->shouldReceive('save')->andReturn(true);

    return $c;
}

it('sets a valid 4-digit PIN', function () {
    $svc = new CardManagementService;
    $card = phase12Card();

    $svc->setPin($card, '1234');

    expect($card->pin_hash)->not->toBeNull();
    expect(password_verify('1234', $card->pin_hash))->toBeTrue();
});

it('rejects a non-numeric or wrong-length PIN', function () {
    (new CardManagementService)->setPin(phase12Card(), 'abcd');
})->throws(InvalidArgumentException::class, 'PIN must be 4-6 digits');

it('verifies a correct PIN and resets failure counter', function () {
    $svc = new CardManagementService;
    $card = phase12Card(['pin_hash' => password_hash('4321', PASSWORD_DEFAULT), 'pin_failed_attempts' => 2]);

    expect($svc->verifyPin($card, '4321'))->toBeTrue();
    expect($card->pin_failed_attempts)->toBe(0);
});

it('blocks the card after three failed PIN attempts', function () {
    $svc = new CardManagementService;
    $card = phase12Card(['pin_hash' => password_hash('4321', PASSWORD_DEFAULT), 'pin_failed_attempts' => 2]);

    $result = $svc->verifyPin($card, '0000');

    expect($result)->toBeFalse();
    expect($card->status)->toBe(CardStatus::BLOCKED);
});

it('freezes and unfreezes a card', function () {
    $svc = new CardManagementService;
    $card = phase12Card();

    $svc->freeze($card);
    expect($card->isFrozen())->toBeTrue();

    $svc->unfreeze($card);
    expect($card->frozen_at)->toBeNull();
});

it('rejects a transaction on a frozen card', function () {
    $svc = new CardManagementService;
    $card = phase12Card(['frozen_at' => now()]);

    $svc->assertTransactionAllowed($card, Money::of('100', 'NGN'), 'pos');
})->throws(RuntimeException::class, 'Card is frozen');

it('blocks physical channels for online-only virtual cards', function () {
    $svc = new CardManagementService;
    $card = phase12Card(['online_only' => true]);

    $svc->assertTransactionAllowed($card, Money::of('100', 'NGN'), 'pos');
})->throws(RuntimeException::class, 'online-only');

it('enforces single-transaction limits', function () {
    $svc = new CardManagementService;
    $card = phase12Card(['single_tx_limit' => '500.0000']);

    $svc->assertTransactionAllowed($card, Money::of('1000', 'NGN'), 'pos');
})->throws(RuntimeException::class, 'single-transaction limit');

it('flags replacement with an allowed reason and blocks the card', function () {
    $svc = new CardManagementService;
    $card = phase12Card();

    $svc->requestReplacement($card, 'lost');

    expect($card->replacement_reason)->toBe('lost');
    expect($card->status)->toBe(CardStatus::BLOCKED);
});

it('rejects invalid replacement reasons', function () {
    (new CardManagementService)->requestReplacement(phase12Card(), 'angry');
})->throws(InvalidArgumentException::class);
