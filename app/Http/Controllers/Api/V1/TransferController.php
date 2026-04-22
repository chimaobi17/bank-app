<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransferRequest;
use App\Http\Resources\TransactionResource;
use App\Services\TransferService;
use App\ValueObjects\Money;
use Illuminate\Http\JsonResponse;

class TransferController extends Controller
{
    public function __construct(
        private TransferService $transferService
    ) {}

    public function store(TransferRequest $request): JsonResponse
    {
        $validated = $request->validated();
        
        $transaction = $this->transferService->execute(
            $validated['from_account_number'],
            $validated['to_account_number'],
            Money::of($validated['amount']),
            $validated['narration'] ?? '',
            $request->user()->user_id
        );

        return response()->json([
            'message' => 'Transfer completed successfully.',
            'transaction' => new TransactionResource($transaction),
        ]);
    }
}
