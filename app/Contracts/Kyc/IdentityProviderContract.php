<?php

namespace App\Contracts\Kyc;

use App\DTO\Kyc\IdentityVerificationResult;

interface IdentityProviderContract
{
    public function verifyBvn(string $bvn, string $firstName, string $lastName): IdentityVerificationResult;

    public function verifyNin(string $nin, string $firstName, string $lastName): IdentityVerificationResult;

    public function verifyPassport(string $passportNumber, string $country, string $lastName): IdentityVerificationResult;
}
