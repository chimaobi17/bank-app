<?php

namespace App\Services\External;

use App\Contracts\External\BillPaymentProviderContract;
use App\DTO\External\BillPaymentQuote;
use App\DTO\External\BillPaymentRequest;
use App\DTO\External\BillPaymentResponse;

final class MockBillPaymentProvider implements BillPaymentProviderContract
{
    private array $processed = [];

    public function __construct(
        private readonly array $supportedBillers = ['IKEDC', 'MTN_AIRTIME', 'DSTV', 'SPECTRANET'],
    ) {}

    public function code(): string
    {
        return 'MOCK-BILLER';
    }

    public function supports(string $billerCode): bool
    {
        return in_array($billerCode, $this->supportedBillers, true);
    }

    public function quote(string $billerCode, string $customerReference, string $amount): BillPaymentQuote
    {
        if (! $this->supports($billerCode)) {
            return BillPaymentQuote::invalid($billerCode, $customerReference, "Unsupported biller: {$billerCode}.");
        }

        if (strlen($customerReference) < 4) {
            return BillPaymentQuote::invalid($billerCode, $customerReference, 'Customer reference too short.');
        }

        return BillPaymentQuote::valid(
            $billerCode,
            $customerReference,
            customerName: 'MOCK CUSTOMER '.substr(md5($customerReference), 0, 4),
            amountDue: $amount,
        );
    }

    public function pay(BillPaymentRequest $request): BillPaymentResponse
    {
        if (isset($this->processed[$request->idempotencyKey])) {
            return $this->processed[$request->idempotencyKey];
        }

        if (! $this->supports($request->billerCode)) {
            $resp = new BillPaymentResponse(
                BillPaymentResponse::STATUS_FAILED,
                providerReference: '',
                idempotencyKey: $request->idempotencyKey,
                message: "Unsupported biller: {$request->billerCode}.",
            );
        } else {
            $resp = new BillPaymentResponse(
                BillPaymentResponse::STATUS_SUCCESS,
                providerReference: 'MOCK-BP-'.strtoupper(bin2hex(random_bytes(4))),
                idempotencyKey: $request->idempotencyKey,
                token: $this->maybeToken($request->billerCode),
                message: 'Bill settled.',
            );
        }

        $this->processed[$request->idempotencyKey] = $resp;

        return $resp;
    }

    private function maybeToken(string $billerCode): ?string
    {
        return match ($billerCode) {
            'IKEDC' => implode('-', str_split(bin2hex(random_bytes(10)), 4)),
            'MTN_AIRTIME' => null,
            default => null,
        };
    }
}
