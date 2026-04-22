<?php

namespace App\Services\Security;

use App\Contracts\Security\BiometricAuthenticatorContract;
use App\DTO\Security\BiometricRegistrationResult;
use App\DTO\Security\BiometricVerificationResult;
use App\Models\BiometricCredential;
use App\Models\User;
use Carbon\CarbonImmutable;

final class StubBiometricAuthenticator implements BiometricAuthenticatorContract
{
    public function beginRegistration(User $user): array
    {
        return [
            'challenge' => base64_encode(random_bytes(32)),
            'rp' => ['name' => config('app.name'), 'id' => parse_url(config('app.url') ?? '', PHP_URL_HOST) ?? 'localhost'],
            'user' => [
                'id' => base64_encode((string) $user->user_id),
                'name' => $user->username,
                'displayName' => $user->username,
            ],
            'pubKeyCredParams' => [
                ['type' => 'public-key', 'alg' => -7],
                ['type' => 'public-key', 'alg' => -257],
            ],
            'timeout' => 60000,
        ];
    }

    public function completeRegistration(User $user, array $attestation, string $deviceName): BiometricRegistrationResult
    {
        if (! isset($attestation['id'], $attestation['publicKey'])) {
            return BiometricRegistrationResult::failure('Attestation missing id or publicKey.');
        }

        $cred = BiometricCredential::create([
            'user_id' => $user->user_id,
            'public_key_handle' => $attestation['id'],
            'public_key' => $attestation['publicKey'],
            'device_name' => $deviceName,
            'attestation_format' => $attestation['format'] ?? 'packed',
            'registered_at' => CarbonImmutable::now(),
        ]);

        return BiometricRegistrationResult::success($cred->credential_id);
    }

    public function beginAuthentication(User $user): array
    {
        $handles = BiometricCredential::where('user_id', $user->user_id)
            ->whereNull('revoked_at')
            ->pluck('public_key_handle')
            ->toArray();

        return [
            'challenge' => base64_encode(random_bytes(32)),
            'allowCredentials' => array_map(
                fn ($h) => ['type' => 'public-key', 'id' => $h],
                $handles,
            ),
            'timeout' => 60000,
        ];
    }

    public function verifyAssertion(User $user, array $assertion): BiometricVerificationResult
    {
        $handle = $assertion['id'] ?? null;
        if (! $handle) {
            return BiometricVerificationResult::fail('Assertion missing credential id.');
        }

        $cred = BiometricCredential::where('user_id', $user->user_id)
            ->where('public_key_handle', $handle)
            ->whereNull('revoked_at')
            ->first();

        if (! $cred) {
            return BiometricVerificationResult::fail('Credential not found or revoked.');
        }

        $cred->last_used_at = CarbonImmutable::now();
        $cred->save();

        return BiometricVerificationResult::pass($cred->credential_id);
    }
}
