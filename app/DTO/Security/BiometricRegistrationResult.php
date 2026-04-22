<?php

namespace App\DTO\Security;

final readonly class BiometricRegistrationResult
{
    public function __construct(
        public bool $success,
        public ?int $credentialId,
        public ?string $reason = null,
    ) {}

    public static function success(int $credentialId): self
    {
        return new self(true, $credentialId);
    }

    public static function failure(string $reason): self
    {
        return new self(false, null, $reason);
    }
}
