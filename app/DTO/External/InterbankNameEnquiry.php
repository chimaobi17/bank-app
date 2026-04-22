<?php

namespace App\DTO\External;

final readonly class InterbankNameEnquiry
{
    public function __construct(
        public bool $found,
        public string $bankCode,
        public string $accountNumber,
        public ?string $accountName = null,
        public ?string $bvn = null,
        public ?string $reason = null,
    ) {}

    public static function found(string $bankCode, string $accountNumber, string $accountName, ?string $bvn = null): self
    {
        return new self(true, $bankCode, $accountNumber, $accountName, $bvn);
    }

    public static function notFound(string $bankCode, string $accountNumber, string $reason): self
    {
        return new self(false, $bankCode, $accountNumber, null, null, $reason);
    }
}
