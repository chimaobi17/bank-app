<?php

namespace App\Http\Controllers\Api\V1;

use App\Contracts\Repositories\LoanRepositoryContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoanRequest;
use App\Http\Resources\LoanResource;
use App\Services\LoanService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LoanController extends Controller
{
    public function __construct(
        private LoanService $loanService,
        private LoanRepositoryContract $loans,
    ) {}

    public function index(Request $request): AnonymousResourceCollection
    {
        $user = $request->user();

        if (! $user->customer_id) {
            return LoanResource::collection(collect());
        }

        $loans = $user->customer->loans()->latest()->get();

        return LoanResource::collection($loans);
    }

    public function store(LoanRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $loan = $this->loanService->apply(array_merge($validated, [
            'customer_id' => $request->user()->customer_id,
        ]));

        return response()->json([
            'message' => 'Loan application submitted successfully.',
            'loan' => new LoanResource($loan),
        ], 201);
    }

    public function show(Request $request, int $id): LoanResource
    {
        $loan = $this->loans->findById($id);

        if (! $loan || $loan->customer_id !== $request->user()->customer_id) {
            abort(404, 'Loan not found.');
        }

        return new LoanResource($loan->load('installments'));
    }

    public function calculateEmi(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'principal' => 'required|numeric|min:1000',
            'interest_rate' => 'required|numeric|min:0.01',
            'tenor_months' => 'required|integer|min:1|max:60',
        ]);

        return response()->json(
            $this->loanService->calculateEmi(
                (string) $validated['principal'],
                (string) $validated['interest_rate'],
                (int) $validated['tenor_months']
            )
        );
    }
}
