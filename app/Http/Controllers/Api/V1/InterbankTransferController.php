<?php

namespace App\Http\Controllers\Api\V1;

use App\Contracts\External\InterbankGatewayContract;
use App\DTO\External\InterbankTransferRequest;
use App\Http\Controllers\Controller;
use App\Models\Account;
use App\ValueObjects\Money;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InterbankTransferController extends Controller
{
    public function __construct(
        private readonly InterbankGatewayContract $gateway,
    ) {}

    /**
     * Name enquiry — resolve the beneficiary name from a bank code + account number.
     */
    public function nameEnquiry(Request $request): JsonResponse
    {
        $data = $request->validate([
            'bank_code' => 'required|string|min:3|max:6',
            'account_number' => 'required|string|size:10',
        ]);

        $result = $this->gateway->nameEnquiry($data['bank_code'], $data['account_number']);

        return response()->json([
            'found' => $result->found,
            'bank_code' => $result->bankCode,
            'account_number' => $result->accountNumber,
            'account_name' => $result->accountName,
            'reason' => $result->reason,
        ], $result->found ? 200 : 404);
    }

    /**
     * Send an interbank transfer request.
     *
     * This is gated behind MFA middleware. The source account is validated
     * to belong to the authenticated user's customer profile.
     */
    public function sendTransfer(Request $request): JsonResponse
    {
        $data = $request->validate([
            'source_account_number' => 'required|string',
            'destination_bank_code' => 'required|string|min:3|max:6',
            'destination_account_number' => 'required|string|size:10',
            'destination_account_name' => 'required|string|max:100',
            'amount' => 'required|numeric|min:0.01',
            'narration' => 'required|string|max:100',
        ]);

        // Verify source account ownership
        $user = $request->user();
        $sourceAccount = Account::where('account_number', $data['source_account_number'])
            ->where('customer_id', $user->customer_id)
            ->first();

        if (! $sourceAccount) {
            return response()->json(['message' => 'Source account not found or not yours.'], 403);
        }

        $sessionId = 'IB-' . strtoupper(bin2hex(random_bytes(12)));
        $sourceBankCode = config('banking.nip_bank_code', '999999');

        $transferRequest = new InterbankTransferRequest(
            sessionId: $sessionId,
            sourceBankCode: $sourceBankCode,
            sourceAccountNumber: $data['source_account_number'],
            destinationBankCode: $data['destination_bank_code'],
            destinationAccountNumber: $data['destination_account_number'],
            destinationAccountName: $data['destination_account_name'],
            amount: Money::of((string) $data['amount'], $sourceAccount->currency ?? 'NGN'),
            narration: $data['narration'],
        );

        $response = $this->gateway->sendTransfer($transferRequest);

        return response()->json([
            'session_id' => $response->sessionId,
            'status' => $response->status,
            'response_code' => $response->responseCode,
            'message' => $response->responseMessage,
            'external_reference' => $response->externalReference,
        ], $response->isSuccessful() || $response->isPending() ? 200 : 422);
    }

    /**
     * Query the status of a previously-initiated interbank transfer.
     */
    public function queryStatus(Request $request, string $sessionId): JsonResponse
    {
        $response = $this->gateway->queryStatus($sessionId);

        return response()->json([
            'session_id' => $response->sessionId,
            'status' => $response->status,
            'response_code' => $response->responseCode,
            'message' => $response->responseMessage,
            'external_reference' => $response->externalReference,
        ]);
    }
}
