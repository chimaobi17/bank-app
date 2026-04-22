<?php

use App\Enums\KycStatus;
use App\Models\Customer;
use App\Services\Kyc\MockIdentityProvider;
use App\Services\Kyc\OnboardingEngine;

function phase12MockCustomer(array $overrides = []): Customer
{
    $c = Mockery::mock(Customer::class)->makePartial();
    $c->kyc_status = $overrides['kyc_status'] ?? KycStatus::NOT_STARTED;
    $c->kyc_doc_id_path = $overrides['kyc_doc_id_path'] ?? null;
    $c->kyc_doc_address_path = $overrides['kyc_doc_address_path'] ?? null;
    $c->shouldReceive('save')->andReturn(true);

    return $c;
}

it('accepts a valid BVN and moves customer into PENDING', function () {
    $engine = new OnboardingEngine(new MockIdentityProvider);
    $customer = phase12MockCustomer();

    $result = $engine->submitIdentity($customer, 'BVN', '12345678901', 'Jane', 'Doe');

    expect($result->verified)->toBeTrue();
    expect($result->documentType)->toBe('BVN');
    expect($customer->kyc_status)->toBe(KycStatus::PENDING);
});

it('rejects malformed BVN', function () {
    $engine = new OnboardingEngine(new MockIdentityProvider);
    $customer = phase12MockCustomer();

    $result = $engine->submitIdentity($customer, 'BVN', 'abc', 'Jane', 'Doe');

    expect($result->verified)->toBeFalse();
    expect($customer->kyc_status)->toBe(KycStatus::REJECTED);
});

it('supports NIN and Passport verification', function () {
    $engine = new OnboardingEngine(new MockIdentityProvider);

    $nin = $engine->submitIdentity(phase12MockCustomer(), 'NIN', '98765432100', 'Jane', 'Doe');
    $pp = $engine->submitIdentity(phase12MockCustomer(), 'PASSPORT', 'A1234567', 'Jane', 'Doe', 'NG');

    expect($nin->verified)->toBeTrue();
    expect($pp->verified)->toBeTrue();
});

it('throws on unsupported document type', function () {
    $engine = new OnboardingEngine(new MockIdentityProvider);
    $engine->submitIdentity(phase12MockCustomer(), 'DRIVER_LICENSE', '123', 'J', 'D');
})->throws(InvalidArgumentException::class);

it('approves a customer after verification', function () {
    $engine = new OnboardingEngine(new MockIdentityProvider);
    $customer = phase12MockCustomer(['kyc_status' => KycStatus::PENDING]);

    $engine->approve($customer);

    expect($customer->kyc_status)->toBe(KycStatus::VERIFIED);
});

it('reports current onboarding step from customer state', function () {
    $engine = new OnboardingEngine(new MockIdentityProvider);

    expect($engine->currentStep(phase12MockCustomer()))->toBe(OnboardingEngine::STEP_PROFILE);
    expect($engine->currentStep(phase12MockCustomer(['kyc_status' => KycStatus::PENDING])))->toBe(OnboardingEngine::STEP_ID_VERIFICATION);
    expect($engine->currentStep(phase12MockCustomer([
        'kyc_status' => KycStatus::PENDING,
        'kyc_doc_id_path' => '/ids/1.png',
    ])))->toBe(OnboardingEngine::STEP_ADDRESS_PROOF);
    expect($engine->currentStep(phase12MockCustomer(['kyc_status' => KycStatus::VERIFIED])))->toBe(OnboardingEngine::STEP_REVIEW);
});
