<?php

namespace App\Http\Controllers\Banking;

use App\Contracts\External\InterbankGatewayContract;
use App\DTO\External\InterbankTransferRequest;
use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Services\AccountService;
use App\ValueObjects\Money;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InterbankPageController extends Controller
{
    public function __construct(
        private readonly InterbankGatewayContract $gateway,
        private readonly AccountService $accounts,
    ) {}

    /**
     * Show the interbank transfer form.
     */
    public function create(Request $request): Response
    {
        $user = $request->user();
        $accounts = $user->customer_id
            ? $this->accounts->getCustomerAccounts($user->customer_id)
                ->where('status', \App\Enums\AccountStatus::ACTIVE)
                ->map(fn ($a) => [
                    'account_number' => $a->account_number,
                    'account_type' => $a->account_type->value,
                    'balance' => $a->balance,
                    'available_balance' => $a->available_balance,
                    'currency' => $a->currency,
                ])->values()
            : [];

        return Inertia::render('banking/transfers/interbank', [
            'accounts' => $accounts,
            'banks' => $this->bankList(),
        ]);
    }

    /**
     * Perform name enquiry (AJAX-friendly, returns inline JSON).
     */
    public function nameEnquiry(Request $request)
    {
        $data = $request->validate([
            'bank_code' => 'required|string|min:3|max:6',
            'account_number' => 'required|string|size:10',
        ]);

        $result = $this->gateway->nameEnquiry($data['bank_code'], $data['account_number']);

        return response()->json([
            'found' => $result->found,
            'account_name' => $result->accountName,
            'reason' => $result->reason,
        ]);
    }

    /**
     * Send the interbank transfer.
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'source_account_number' => 'required|string',
            'destination_bank_code' => 'required|string|min:3|max:6',
            'destination_account_number' => 'required|string|size:10',
            'destination_account_name' => 'required|string|max:100',
            'amount' => 'required|numeric|min:0.01',
            'narration' => 'required|string|max:100',
        ]);

        $user = $request->user();
        $source = Account::where('account_number', $data['source_account_number'])
            ->where('customer_id', $user->customer_id)
            ->first();

        if (! $source) {
            return back()->withErrors(['source_account_number' => 'Account not found or not yours.']);
        }

        $sessionId = 'IB-' . strtoupper(bin2hex(random_bytes(12)));
        $bankCode = config('banking.nip_bank_code', '999999');

        try {
            $response = $this->gateway->sendTransfer(new InterbankTransferRequest(
                sessionId: $sessionId,
                sourceBankCode: $bankCode,
                sourceAccountNumber: $data['source_account_number'],
                destinationBankCode: $data['destination_bank_code'],
                destinationAccountNumber: $data['destination_account_number'],
                destinationAccountName: $data['destination_account_name'],
                amount: Money::of((string) $data['amount'], $source->currency ?? 'NGN'),
                narration: $data['narration'],
            ));

            if ($response->isSuccessful() || $response->isPending()) {
                return redirect()->back()->with('success', "Transfer of ₦" . number_format($data['amount'], 2) . " queued successfully. Session: {$response->sessionId}");
            }

            return back()->with('error', $response->responseMessage ?? 'Transfer failed.');
        } catch (\Throwable $e) {
            return back()->withErrors(['amount' => $e->getMessage()]);
        }
    }

    /**
     * Static list of Nigerian banks for the dropdown (demo subset).
     */
    private function bankList(): array
    {
        return [
            ['code' => '044', 'name' => 'Access Bank'],
            ['code' => '023', 'name' => 'Citibank Nigeria'],
            ['code' => '050', 'name' => 'EcoBank'],
            ['code' => '070', 'name' => 'Fidelity Bank'],
            ['code' => '011', 'name' => 'First Bank of Nigeria'],
            ['code' => '214', 'name' => 'FCMB'],
            ['code' => '058', 'name' => 'GTBank'],
            ['code' => '030', 'name' => 'Heritage Bank'],
            ['code' => '301', 'name' => 'Jaiz Bank'],
            ['code' => '082', 'name' => 'Keystone Bank'],
            ['code' => '076', 'name' => 'Polaris Bank'],
            ['code' => '039', 'name' => 'Stanbic IBTC'],
            ['code' => '232', 'name' => 'Sterling Bank'],
            ['code' => '032', 'name' => 'Union Bank'],
            ['code' => '033', 'name' => 'UBA'],
            ['code' => '215', 'name' => 'Unity Bank'],
            ['code' => '035', 'name' => 'Wema Bank'],
            ['code' => '057', 'name' => 'Zenith Bank'],
        ];
    }
}
