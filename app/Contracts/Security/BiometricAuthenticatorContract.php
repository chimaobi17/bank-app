<?php

namespace App\Contracts\Security;

use App\DTO\Security\BiometricRegistrationResult;
use App\DTO\Security\BiometricVerificationResult;
use App\Models\User;

interface BiometricAuthenticatorContract
{
    public function beginRegistration(User $user): array;

    public function completeRegistration(User $user, array $attestation, string $deviceName): BiometricRegistrationResult;

    public function beginAuthentication(User $user): array;

    public function verifyAssertion(User $user, array $assertion): BiometricVerificationResult;
}
