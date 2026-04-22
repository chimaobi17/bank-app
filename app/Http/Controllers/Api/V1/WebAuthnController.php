<?php

namespace App\Http\Controllers\Api\V1;

use App\Contracts\Security\BiometricAuthenticatorContract;
use App\Http\Controllers\Controller;
use App\Http\Middleware\RequireMfa;
use App\Models\BiometricCredential;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebAuthnController extends Controller
{
    public function __construct(
        private readonly BiometricAuthenticatorContract $biometric,
    ) {}

    /**
     * Begin passkey registration — returns PublicKeyCredentialCreationOptions.
     */
    public function beginRegistration(Request $request): JsonResponse
    {
        $user = $request->user();
        $options = $this->biometric->beginRegistration($user);

        // Store challenge in session for server-side verification
        $request->session()->put('webauthn.registration_challenge', $options['challenge']);

        return response()->json([
            'status' => 'ok',
            'options' => $options,
        ]);
    }

    /**
     * Complete passkey registration with the attestation from the browser.
     */
    public function completeRegistration(Request $request): JsonResponse
    {
        $data = $request->validate([
            'attestation' => 'required|array',
            'attestation.id' => 'required|string',
            'attestation.publicKey' => 'required|string',
            'attestation.format' => 'nullable|string',
            'device_name' => 'required|string|max:100',
        ]);

        $user = $request->user();
        $result = $this->biometric->completeRegistration(
            $user,
            $data['attestation'],
            $data['device_name'],
        );

        $request->session()->forget('webauthn.registration_challenge');

        if (! $result->success) {
            return response()->json([
                'status' => 'error',
                'message' => $result->reason,
            ], 422);
        }

        return response()->json([
            'status' => 'registered',
            'credential_id' => $result->credentialId,
        ]);
    }

    /**
     * Begin passkey authentication — returns PublicKeyCredentialRequestOptions.
     */
    public function beginAuthentication(Request $request): JsonResponse
    {
        $user = $request->user();
        $options = $this->biometric->beginAuthentication($user);

        $request->session()->put('webauthn.authentication_challenge', $options['challenge']);

        return response()->json([
            'status' => 'ok',
            'options' => $options,
        ]);
    }

    /**
     * Verify a passkey assertion — grants MFA session on success.
     */
    public function verifyAssertion(Request $request): JsonResponse
    {
        $data = $request->validate([
            'assertion' => 'required|array',
            'assertion.id' => 'required|string',
        ]);

        $user = $request->user();
        $result = $this->biometric->verifyAssertion($user, $data['assertion']);

        $request->session()->forget('webauthn.authentication_challenge');

        if (! $result->verified) {
            return response()->json([
                'status' => 'failed',
                'message' => $result->reason,
            ], 401);
        }

        // Grant MFA session — same session key as TOTP so both methods are equivalent
        $request->session()->put(RequireMfa::SESSION_KEY, now());

        return response()->json([
            'status' => 'verified',
            'credential_id' => $result->credentialId,
        ]);
    }

    /**
     * List all registered passkeys for the authenticated user.
     */
    public function list(Request $request): JsonResponse
    {
        $credentials = BiometricCredential::where('user_id', $request->user()->user_id)
            ->orderByDesc('registered_at')
            ->get()
            ->map(fn (BiometricCredential $c) => [
                'credential_id' => $c->credential_id,
                'device_name' => $c->device_name,
                'registered_at' => $c->registered_at?->toIso8601String(),
                'last_used_at' => $c->last_used_at?->toIso8601String(),
                'is_revoked' => $c->isRevoked(),
            ]);

        return response()->json(['passkeys' => $credentials]);
    }

    /**
     * Revoke a passkey by credential ID.
     */
    public function revoke(Request $request, int $credentialId): JsonResponse
    {
        $cred = BiometricCredential::where('user_id', $request->user()->user_id)
            ->where('credential_id', $credentialId)
            ->firstOrFail();

        $cred->revoked_at = now();
        $cred->save();

        return response()->json(['status' => 'revoked']);
    }
}
