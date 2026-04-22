<?php

use App\DTO\External\BillPaymentRequest;
use App\DTO\External\BillPaymentResponse;
use App\Services\External\MockBillPaymentProvider;

it('quotes a valid biller and customer reference', function () {
    $p = new MockBillPaymentProvider;

    $quote = $p->quote('IKEDC', '1234567890', '5000.0000');

    expect($quote->valid)->toBeTrue();
    expect($quote->customerName)->toStartWith('MOCK CUSTOMER');
});

it('rejects unsupported billers', function () {
    $p = new MockBillPaymentProvider;

    $quote = $p->quote('UNKNOWN', '1234567890', '5000.0000');

    expect($quote->valid)->toBeFalse();
});

it('pays a bill and returns a provider reference', function () {
    $p = new MockBillPaymentProvider;

    $resp = $p->pay(new BillPaymentRequest(
        billerCode: 'IKEDC',
        customerReference: '1234567890',
        amount: '5000.0000',
        currency: 'NGN',
        idempotencyKey: 'idem-1',
    ));

    expect($resp->isSuccessful())->toBeTrue();
    expect($resp->providerReference)->toStartWith('MOCK-BP-');
    expect($resp->token)->not->toBeNull();
});

it('is idempotent on repeated keys', function () {
    $p = new MockBillPaymentProvider;

    $first = $p->pay(new BillPaymentRequest('IKEDC', '1234567890', '5000.0000', 'NGN', 'idem-dup'));
    $second = $p->pay(new BillPaymentRequest('IKEDC', '1234567890', '5000.0000', 'NGN', 'idem-dup'));

    expect($first->providerReference)->toBe($second->providerReference);
});

it('returns failed status for unsupported biller on pay', function () {
    $p = new MockBillPaymentProvider;

    $resp = $p->pay(new BillPaymentRequest('NOPE', 'ref', '100', 'NGN', 'idem-fail'));

    expect($resp->status)->toBe(BillPaymentResponse::STATUS_FAILED);
});
