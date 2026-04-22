<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Services\LoanService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminLoansController extends Controller
{
    public function __construct(
        private LoanService $loans,
    ) {}

    public function index(Request $request): Response
    {
        $query = Loan::with('customer')->latest();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        $loans = $query->paginate(25)->through(fn ($l) => [
            'loan_id' => $l->loan_id,
            'product' => $l->product->label(),
            'principal' => $l->principal,
            'tenor_months' => $l->tenor_months,
            'status' => $l->status->value,
            'customer_name' => $l->customer?->full_name,
            'applied_at' => $l->created_at->toIso8601String(),
        ]);

        return Inertia::render('admin/loans/index', [
            'loans' => $loans,
            'filters' => ['status' => $status],
        ]);
    }

    public function approve(Request $request, int $id): RedirectResponse
    {
        $loan = Loan::findOrFail($id);
        $this->loans->approve($loan, $request->user()->user_id);

        return back()->with('success', 'Loan approved.');
    }

    public function reject(Request $request, int $id): RedirectResponse
    {
        $loan = Loan::findOrFail($id);
        $this->loans->reject($loan, $request->user()->user_id);

        return back()->with('success', 'Loan rejected.');
    }

    public function disburse(int $id): RedirectResponse
    {
        $loan = Loan::findOrFail($id);
        $this->loans->disburse($loan);

        return back()->with('success', 'Loan disbursed.');
    }
}
