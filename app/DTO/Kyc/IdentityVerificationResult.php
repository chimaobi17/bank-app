<?php

namespace App\DTO\Kyc;

final readonly class IdentityVerificationResult
{
    public function __construct(
        public bool $verified,
        public string $provider,
        public string $documentType,
        public string $reference,
        public ?string $reason = null,
        public array $metadata = [],
    ) {}

    public static function pass(string $provider, string $documentType, string $reference, array $metadata = []): self
    {
        return new self(true, $provider, $documentType, $reference, null, $metadata);
    }

    public static function fail(string $provider, string $documentType, string $reference, string $reason): self
    {
        return new self(false, $provider, $documentType, $reference, $reason);
    }
}
