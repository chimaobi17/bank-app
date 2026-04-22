<?php

use App\DTO\External\InterbankTransferRequest;
use App\DTO\External\InterbankTransferResponse;
use App\Services\External\MockInterbankGateway;
use App\ValueObjects\Money;

it('resolves a valid 10-digit account via name enquiry', function () {
    $gw = new MockInterbankGateway;

    $enq = $gw->nameEnquiry('058', '1234567890');

    expect($enq->found)->toBeTrue();
    expect($enq->accountName)->not->toBeEmpty();
});

it('rejects short account numbers', function () {
    $gw = new MockInterbankGateway;

    $enq = $gw->nameEnquiry('058', '12345');

    expect($enq->found)->toBeFalse();
    expect($enq->reason)->toContain('10 digits');
});

it('accepts a valid transfer and returns pending status', function () {
    $gw = new MockInterbankGateway;

    $resp = $gw->sendTransfer(new InterbankTransferRequest(
        sessionId: 'SESS-1',
        sourceBankCode: '058',
        sourceAccountNumber: '1234567890',
        destinationBankCode: '033',
        destinationAccountNumber: '9876543210',
        destinationAccountName: 'JANE DOE',
        amount: Money::of('500.00', 'NGN'),
        narration: 'test transfer',
    ));

    expect($resp->status)->toBe(InterbankTransferResponse::STATUS_PENDING);
    expect($resp->externalReference)->toStartWith('MOCK-');
});

it('rejects zero-amount transfers', function () {
    $gw = new MockInterbankGateway;

    $resp = $gw->sendTransfer(new InterbankTransferRequest(
        sessionId: 'SESS-2',
        sourceBankCode: '058',
        sourceAccountNumber: '1234567890',
        destinationBankCode: '033',
        destinationAccountNumber: '9876543210',
        destinationAccountName: 'JANE DOE',
        amount: Money::zero('NGN'),
        narration: 'zero',
    ));

    expect($resp->isSuccessful())->toBeFalse();
    expect($resp->status)->toBe(InterbankTransferResponse::STATUS_FAILED);
});

it('promotes a pending session to success on status query', function () {
    $gw = new MockInterbankGateway;

    $gw->sendTransfer(new InterbankTransferRequest(
        sessionId: 'SESS-3',
        sourceBankCode: '058',
        sourceAccountNumber: '1234567890',
        destinationBankCode: '033',
        destinationAccountNumber: '9876543210',
        destinationAccountName: 'JANE DOE',
        amount: Money::of('1000.00', 'NGN'),
        narration: 'ok',
    ));

    $settled = $gw->queryStatus('SESS-3');

    expect($settled->isSuccessful())->toBeTrue();
});

it('returns failed for unknown session', function () {
    $gw = new MockInterbankGateway;

    $resp = $gw->queryStatus('NOPE');

    expect($resp->status)->toBe(InterbankTransferResponse::STATUS_FAILED);
});
