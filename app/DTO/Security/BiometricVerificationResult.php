<?php

namespace App\DTO\Security;

final readonly class BiometricVerificationResult
{
    public function __construct(
        public bool $verified,
        public ?int $credentialId,
        public ?string $reason = null,
    ) {}

    public static function pass(int $credentialId): self
    {
        return new self(true, $credentialId);
    }

    public static function fail(string $reason): self
    {
        return new self(false, null, $reason);
    }
}
