<?php

namespace App\Http\Controllers\Banking;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentRequest;
use App\Models\Biller;
use App\Models\Payment;
use App\Services\AccountService;
use App\Services\BillPaymentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentsPageController extends Controller
{
    public function __construct(
        private BillPaymentService $paymentService,
        private AccountService $accountService,
    ) {}

    public function index(Request $request): Response
    {
        $user = $request->user();

        $payments = Payment::where('customer_id', $user->customer_id)
            ->with('biller')
            ->latest()
            ->take(50)
            ->get()
            ->map(fn ($p) => [
                'payment_id' => $p->payment_id,
                'payment_type' => $p->payment_type,
                'amount' => $p->amount,
                'currency' => $p->currency,
                'status' => $p->status->value,
                'recipient_identifier' => $p->recipient_identifier,
                'narration' => $p->narration,
                'biller' => $p->biller?->name,
                'created_at' => $p->created_at->toIso8601String(),
            ]);

        $accounts = $user->customer_id
            ? $this->accountService->getCustomerAccounts($user->customer_id)
                ->where('status', \App\Enums\AccountStatus::ACTIVE)
                ->map(fn ($a) => [
                    'account_id' => $a->account_id,
                    'account_number' => $a->account_number,
                    'account_type' => $a->account_type->value,
                    'balance' => $a->balance,
                ])->values()
            : [];

        $billers = Biller::active()->orderBy('name')->get()
            ->map(fn ($b) => [
                'biller_id' => $b->biller_id,
                'name' => $b->name,
                'category' => $b->category,
            ]);

        return Inertia::render('banking/payments/index', [
            'payments' => $payments,
            'accounts' => $accounts,
            'billers' => $billers,
        ]);
    }

    public function payBill(PaymentRequest $request): RedirectResponse
    {
        try {
            $this->paymentService->payBill($request->validated());
        } catch (\Throwable $e) {
            return back()->withErrors(['amount' => $e->getMessage()]);
        }

        $validated = $request->validated();
        return redirect()->back()->with('success', "Payment of ₦" . number_format($validated['amount'], 2) . " for biller was processed successfully.");
    }

    public function payAirtime(PaymentRequest $request): RedirectResponse
    {
        try {
            $this->paymentService->topUpAirtime($request->validated());
        } catch (\Throwable $e) {
            return back()->withErrors(['amount' => $e->getMessage()]);
        }

        $validated = $request->validated();
        return redirect()->back()->with('success', "Airtime top-up of ₦" . number_format($validated['amount'], 2) . " to " . $validated['recipient_identifier'] . " was successful.");
    }
}
