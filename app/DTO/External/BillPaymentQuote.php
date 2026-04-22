<?php

namespace App\DTO\External;

final readonly class BillPaymentQuote
{
    public function __construct(
        public bool $valid,
        public string $billerCode,
        public string $customerReference,
        public string $customerName,
        public string $amountDue,
        public string $currency = 'NGN',
        public ?string $reason = null,
    ) {}

    public static function valid(string $billerCode, string $ref, string $customerName, string $amountDue): self
    {
        return new self(true, $billerCode, $ref, $customerName, $amountDue);
    }

    public static function invalid(string $billerCode, string $ref, string $reason): self
    {
        return new self(false, $billerCode, $ref, '', '0.0000', 'NGN', $reason);
    }
}
