<?php

use App\Models\OtpChallenge;
use App\Services\Security\OtpService;
use Carbon\CarbonImmutable;

function phase12Challenge(string $code, array $overrides = []): OtpChallenge
{
    $c = Mockery::mock(OtpChallenge::class)->makePartial();
    $c->code_hash = hash('sha256', $code);
    $c->expires_at = $overrides['expires_at'] ?? CarbonImmutable::now()->addMinutes(5);
    $c->consumed_at = $overrides['consumed_at'] ?? null;
    $c->attempts = $overrides['attempts'] ?? 0;
    $c->shouldReceive('save')->andReturn(true);
    $c->shouldReceive('isExpired')->andReturnUsing(fn () => $c->expires_at->isPast());
    $c->shouldReceive('isConsumed')->andReturnUsing(fn () => $c->consumed_at !== null);

    return $c;
}

it('verifies a matching OTP and marks it consumed', function () {
    $svc = new OtpService;
    $challenge = phase12Challenge('123456');

    expect($svc->verify($challenge, '123456'))->toBeTrue();
    expect($challenge->consumed_at)->not->toBeNull();
});

it('rejects a wrong OTP and increments attempts', function () {
    $svc = new OtpService;
    $challenge = phase12Challenge('123456');

    expect($svc->verify($challenge, '000000'))->toBeFalse();
    expect($challenge->attempts)->toBe(1);
});

it('refuses to verify a consumed OTP', function () {
    (new OtpService)->verify(
        phase12Challenge('111111', ['consumed_at' => now()]),
        '111111',
    );
})->throws(RuntimeException::class, 'already consumed');

it('refuses to verify an expired OTP', function () {
    (new OtpService)->verify(
        phase12Challenge('111111', ['expires_at' => CarbonImmutable::now()->subMinute()]),
        '111111',
    );
})->throws(RuntimeException::class, 'expired');

it('refuses to verify after max attempts', function () {
    (new OtpService)->verify(
        phase12Challenge('111111', ['attempts' => OtpService::MAX_ATTEMPTS]),
        '111111',
    );
})->throws(RuntimeException::class, 'attempt limit');
