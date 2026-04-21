<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentRequest;
use App\Http\Resources\BillerResource;
use App\Http\Resources\PaymentResource;
use App\Models\Biller;
use App\Models\Payment;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PaymentController extends Controller
{
    public function __construct(
        private PaymentService $paymentService,
    ) {}

    public function index(Request $request): AnonymousResourceCollection
    {
        $user = $request->user();
        $payments = Payment::where('customer_id', $user->customer_id)
            ->latest()
            ->paginate(20);

        return PaymentResource::collection($payments);
    }

    public function billers(): AnonymousResourceCollection
    {
        return BillerResource::collection(Biller::active()->orderBy('name')->get());
    }

    public function pay(PaymentRequest $request): JsonResponse
    {
        $payment = $this->paymentService->payBill($request->validated());

        return response()->json([
            'message' => 'Payment processed successfully.',
            'payment' => new PaymentResource($payment->load('biller')),
        ], 201);
    }

    public function airtime(PaymentRequest $request): JsonResponse
    {
        $payment = $this->paymentService->topUpAirtime($request->validated());

        return response()->json([
            'message' => 'Airtime top-up successful.',
            'payment' => new PaymentResource($payment),
        ], 201);
    }
}
