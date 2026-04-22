<?php

namespace App\Services\Kyc;

use App\Contracts\Kyc\IdentityProviderContract;
use App\DTO\Kyc\IdentityVerificationResult;

final class MockIdentityProvider implements IdentityProviderContract
{
    public function verifyBvn(string $bvn, string $firstName, string $lastName): IdentityVerificationResult
    {
        if (! preg_match('/^\d{11}$/', $bvn)) {
            return IdentityVerificationResult::fail('mock', 'BVN', $bvn, 'BVN must be exactly 11 digits.');
        }

        if (str_starts_with($bvn, '0')) {
            return IdentityVerificationResult::fail('mock', 'BVN', $bvn, 'Simulated rejection: BVN starts with 0.');
        }

        return IdentityVerificationResult::pass('mock', 'BVN', $bvn, [
            'first_name_match' => true,
            'last_name_match' => true,
            'first_name' => $firstName,
            'last_name' => $lastName,
        ]);
    }

    public function verifyNin(string $nin, string $firstName, string $lastName): IdentityVerificationResult
    {
        if (! preg_match('/^\d{11}$/', $nin)) {
            return IdentityVerificationResult::fail('mock', 'NIN', $nin, 'NIN must be exactly 11 digits.');
        }

        return IdentityVerificationResult::pass('mock', 'NIN', $nin, [
            'first_name' => $firstName,
            'last_name' => $lastName,
        ]);
    }

    public function verifyPassport(string $passportNumber, string $country, string $lastName): IdentityVerificationResult
    {
        if (strlen($passportNumber) < 6) {
            return IdentityVerificationResult::fail('mock', 'PASSPORT', $passportNumber, 'Passport number too short.');
        }

        return IdentityVerificationResult::pass('mock', 'PASSPORT', $passportNumber, [
            'country' => $country,
            'last_name' => $lastName,
        ]);
    }
}
