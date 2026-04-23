<?php

namespace App\Http\Controllers\Banking;

use App\Enums\KycStatus;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use App\Services\Kyc\OnboardingEngine;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OnboardingController extends Controller
{
    public function __construct(
        private readonly OnboardingEngine $engine,
    ) {}

    public function show(Request $request): Response
    {
        $user = $request->user();
        $customer = $this->resolveCustomer($user);

        return Inertia::render('banking/onboarding', [
            'customer' => $customer ? [
                'customer_id' => $customer->customer_id,
                'full_name' => $customer->full_name,
                'kyc_status' => $customer->kyc_status?->value,
                'has_id_doc' => (bool) $customer->kyc_doc_id_path,
                'has_address_doc' => (bool) $customer->kyc_doc_address_path,
                'kyc_verified_at' => $customer->kyc_verified_at?->toIso8601String(),
            ] : null,
            'user' => [
                'username' => $user->username,
                'email' => $user->email,
                'name' => $user->name,
            ],
            'currentStep' => $customer ? $this->engine->currentStep($customer) : OnboardingEngine::STEP_PROFILE,
            'steps' => OnboardingEngine::STEPS,
        ]);
    }

    public function submitIdentity(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'document_type' => 'required|string|in:BVN,NIN,PASSPORT',
            'document_number' => 'required|string|max:50',
            'first_name' => 'required|string|max:80',
            'last_name' => 'required|string|max:80',
            'country' => 'nullable|string|max:3',
        ]);

        $customer = $this->resolveCustomer($request->user());
        if (! $customer) {
            return back()->withErrors(['customer' => 'No customer profile linked to this user.']);
        }

        $result = $this->engine->submitIdentity(
            $customer,
            $data['document_type'],
            $data['document_number'],
            $data['first_name'],
            $data['last_name'],
            $data['country'] ?? 'NG',
        );

        if (! $result->verified) {
            return back()->withErrors(['document_number' => $result->reason ?? 'Verification failed.']);
        }

        return redirect()->route('banking.onboarding')->with('status', 'Identity verified. Upload a proof of address next.');
    }

    public function submitAddressProof(Request $request): RedirectResponse
    {
        $request->validate([
            'document' => 'required|file|mimes:pdf,jpg,jpeg,png|max:4096',
        ]);

        $customer = $this->resolveCustomer($request->user());
        if (! $customer) {
            return back()->withErrors(['customer' => 'No customer profile linked to this user.']);
        }

        $path = $request->file('document')->store('kyc/address', 'local');
        $this->engine->attachAddressProof($customer, $path);
        
        // Auto approve for simulated outcome
        $this->engine->approve($customer);

        return redirect()->route('banking.dashboard')->with('success', 'Onboarding Complete! Your account is fully verified.');
    }

    private function resolveCustomer(User $user): ?Customer
    {
        return $user->customer()->first();
    }
}
