<?php

namespace App\DTO\External;

final readonly class BillPaymentRequest
{
    public function __construct(
        public string $billerCode,
        public string $customerReference,
        public string $amount,
        public string $currency,
        public string $idempotencyKey,
        public array $metadata = [],
    ) {}
}
