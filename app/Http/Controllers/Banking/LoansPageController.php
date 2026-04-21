<?php

namespace App\Http\Controllers\Banking;

use App\Contracts\Repositories\LoanRepositoryContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoanRequest;
use App\Services\LoanService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LoansPageController extends Controller
{
    public function __construct(
        private LoanService $loanService,
        private LoanRepositoryContract $loans,
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $loans = $user->customer_id
            ? $user->customer->loans()->latest()->get()->map(fn ($l) => [
                'loan_id' => $l->loan_id,
                'product' => $l->product->label(),
                'principal' => $l->principal,
                'interest_rate' => $l->interest_rate,
                'tenor_months' => $l->tenor_months,
                'status' => $l->status->value,
                'outstanding_balance' => $l->outstanding_balance,
                'applied_at' => $l->created_at->toIso8601String(),
            ])
            : [];

        return Inertia::render('banking/loans/index', [
            'loans' => $loans,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('banking/loans/create');
    }

    public function store(LoanRequest $request): RedirectResponse
    {
        $this->loanService->apply(array_merge($request->validated(), [
            'customer_id' => $request->user()->customer_id,
        ]));

        return redirect()->route('banking.loans')->with('success', 'Loan application submitted.');
    }

    public function show(Request $request, int $id): Response
    {
        $loan = $this->loans->findById($id);

        if (! $loan || $loan->customer_id !== $request->user()->customer_id) {
            abort(404);
        }

        $loan->load('installments');

        return Inertia::render('banking/loans/show', [
            'loan' => [
                'loan_id' => $loan->loan_id,
                'product' => $loan->product->label(),
                'principal' => $loan->principal,
                'interest_rate' => $loan->interest_rate,
                'tenor_months' => $loan->tenor_months,
                'status' => $loan->status->value,
                'purpose' => $loan->purpose,
                'outstanding_balance' => $loan->outstanding_balance,
                'total_interest' => $loan->total_interest,
                'total_paid' => $loan->total_paid,
                'applied_at' => $loan->created_at->toIso8601String(),
                'approved_at' => $loan->approved_at?->toIso8601String(),
                'disbursed_at' => $loan->disbursed_at?->toIso8601String(),
                'installments' => $loan->installments->map(fn ($i) => [
                    'sequence' => $i->sequence,
                    'due_date' => $i->due_date,
                    'principal_due' => $i->principal_due,
                    'interest_due' => $i->interest_due,
                    'total_due' => $i->total_due,
                    'status' => $i->status->value,
                ]),
            ],
        ]);
    }

    public function calculateEmi(Request $request)
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
