<?php

namespace App\Http\Controllers\Banking;

use App\Contracts\Security\BiometricAuthenticatorContract;
use App\Http\Controllers\Controller;
use App\Http\Middleware\RequireMfa;
use App\Models\BiometricCredential;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PasskeysPageController extends Controller
{
    public function __construct(
        private readonly BiometricAuthenticatorContract $biometric,
    ) {}

    /**
     * Show passkey management page.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $passkeys = BiometricCredential::where('user_id', $user->user_id)
            ->orderByDesc('registered_at')
            ->get()
            ->map(fn (BiometricCredential $c) => [
                'credential_id' => $c->credential_id,
                'device_name' => $c->device_name,
                'registered_at' => $c->registered_at?->toIso8601String(),
                'last_used_at' => $c->last_used_at?->toIso8601String(),
                'is_revoked' => $c->isRevoked(),
            ]);

        return Inertia::render('banking/security/passkeys', [
            'passkeys' => $passkeys,
        ]);
    }

    /**
     * Begin registration — returns WebAuthn creation options.
     */
    public function beginRegistration(Request $request): JsonResponse
    {
        $options = $this->biometric->beginRegistration($request->user());
        $request->session()->put('webauthn.challenge', $options['challenge']);

        return response()->json(['options' => $options]);
    }

    /**
     * Complete registration with browser attestation.
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

        $result = $this->biometric->completeRegistration(
            $request->user(),
            $data['attestation'],
            $data['device_name'],
        );

        $request->session()->forget('webauthn.challenge');

        if (! $result->success) {
            return response()->json(['status' => 'error', 'message' => $result->reason], 422);
        }

        return response()->json(['status' => 'registered', 'credential_id' => $result->credentialId]);
    }

    /**
     * Begin authentication — returns assertion options.
     */
    public function beginAuthentication(Request $request): JsonResponse
    {
        $options = $this->biometric->beginAuthentication($request->user());
        $request->session()->put('webauthn.auth_challenge', $options['challenge']);

        return response()->json(['options' => $options]);
    }

    /**
     * Verify assertion — grants MFA session.
     */
    public function verifyAssertion(Request $request): JsonResponse
    {
        $data = $request->validate([
            'assertion' => 'required|array',
            'assertion.id' => 'required|string',
        ]);

        $result = $this->biometric->verifyAssertion($request->user(), $data['assertion']);
        $request->session()->forget('webauthn.auth_challenge');

        if (! $result->verified) {
            return response()->json(['status' => 'failed', 'message' => $result->reason], 401);
        }

        $request->session()->put(RequireMfa::SESSION_KEY, now());

        return response()->json(['status' => 'verified']);
    }

    /**
     * Revoke a passkey.
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
