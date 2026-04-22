<?php

namespace App\Services\Kyc;

use App\Contracts\Kyc\IdentityProviderContract;
use App\DTO\Kyc\IdentityVerificationResult;
use App\Enums\KycStatus;
use App\Models\Customer;
use InvalidArgumentException;

final class OnboardingEngine
{
    public const STEP_PROFILE = 'profile';

    public const STEP_ID_VERIFICATION = 'id_verification';

    public const STEP_ADDRESS_PROOF = 'address_proof';

    public const STEP_REVIEW = 'review';

    public const STEPS = [
        self::STEP_PROFILE,
        self::STEP_ID_VERIFICATION,
        self::STEP_ADDRESS_PROOF,
        self::STEP_REVIEW,
    ];

    public function __construct(
        private IdentityProviderContract $identityProvider,
    ) {}

    public function currentStep(Customer $customer): string
    {
        return match ($customer->kyc_status) {
            KycStatus::NOT_STARTED => self::STEP_PROFILE,
            KycStatus::PENDING => $customer->kyc_doc_address_path
                ? self::STEP_REVIEW
                : ($customer->kyc_doc_id_path ? self::STEP_ADDRESS_PROOF : self::STEP_ID_VERIFICATION),
            KycStatus::VERIFIED, KycStatus::REJECTED => self::STEP_REVIEW,
        };
    }

    public function submitIdentity(
        Customer $customer,
        string $documentType,
        string $documentNumber,
        string $firstName,
        string $lastName,
        ?string $country = 'NG',
    ): IdentityVerificationResult {
        $result = match (strtoupper($documentType)) {
            'BVN' => $this->identityProvider->verifyBvn($documentNumber, $firstName, $lastName),
            'NIN' => $this->identityProvider->verifyNin($documentNumber, $firstName, $lastName),
            'PASSPORT' => $this->identityProvider->verifyPassport($documentNumber, $country ?? 'NG', $lastName),
            default => throw new InvalidArgumentException("Unsupported document type: {$documentType}"),
        };

        $customer->kyc_status = $result->verified ? KycStatus::PENDING : KycStatus::REJECTED;
        $customer->save();

        return $result;
    }

    public function attachAddressProof(Customer $customer, string $documentPath): void
    {
        if ($customer->kyc_status === KycStatus::NOT_STARTED) {
            throw new InvalidArgumentException('Must complete identity verification first.');
        }

        $customer->kyc_doc_address_path = $documentPath;
        $customer->save();
    }

    public function approve(Customer $customer): void
    {
        if ($customer->kyc_status === KycStatus::VERIFIED) {
            return;
        }

        $customer->kyc_status = KycStatus::VERIFIED;
        $customer->kyc_verified_at = now();
        $customer->save();
    }

    public function reject(Customer $customer, string $reason): void
    {
        $customer->kyc_status = KycStatus::REJECTED;
        $customer->save();
    }
}
