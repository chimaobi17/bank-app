<?php

namespace App\Http\Controllers\Api\V1;

use App\Contracts\Kyc\IdentityProviderContract;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IdentityVerificationController extends Controller
{
    public function __construct(
        private readonly IdentityProviderContract $provider,
    ) {}

    /**
     * Generic identity verification endpoint.
     *
     * Accepts BVN, NIN, or PASSPORT document types and delegates
     * to the configured IdentityProviderContract implementation.
     */
    public function verify(Request $request): JsonResponse
    {
        $data = $request->validate([
            'document_type' => 'required|string|in:BVN,NIN,PASSPORT',
            'document_number' => 'required|string|max:50',
            'first_name' => 'required|string|max:80',
            'last_name' => 'required|string|max:80',
            'country' => 'nullable|string|max:3',
        ]);

        $result = match ($data['document_type']) {
            'BVN' => $this->provider->verifyBvn(
                $data['document_number'],
                $data['first_name'],
                $data['last_name'],
            ),
            'NIN' => $this->provider->verifyNin(
                $data['document_number'],
                $data['first_name'],
                $data['last_name'],
            ),
            'PASSPORT' => $this->provider->verifyPassport(
                $data['document_number'],
                $data['country'] ?? 'NG',
                $data['last_name'],
            ),
        };

        return response()->json([
            'verified' => $result->verified,
            'provider' => $result->provider,
            'document_type' => $result->documentType,
            'reason' => $result->reason,
            'metadata' => $result->metadata,
        ], $result->verified ? 200 : 422);
    }
}
