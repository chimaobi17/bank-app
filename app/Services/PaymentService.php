<?php

namespace App\Services;

use App\Contracts\Repositories\AccountRepositoryContract;
use App\Enums\LedgerDirection;
use App\Enums\PaymentStatus;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\AuditLog;
use App\Models\LedgerEntry;
use App\Models\Payment;
use App\Models\Transaction;
use App\ValueObjects\Money;
use Illuminate\Support\Facades\DB;

class PaymentService
{
    public function __construct(
        private AccountRepositoryContract $accounts,
    ) {}

    public function payBill(array $data): Payment
    {
        return DB::transaction(function () use ($data) {
            $account = $this->accounts->findById($data['account_id']);
            $amount = Money::of($data['amount'], $account->currency);

            $account->withdraw($amount);
            $this->accounts->save($account);

            $transaction = Transaction::create([
                'type' => TransactionType::BILL_PAYMENT,
                'amount' => $amount->getAmount(),
                'currency' => $account->currency,
                'source_account_id' => $account->account_id,
                'status' => TransactionStatus::COMPLETED,
                'narration' => $data['narration'] ?? 'Bill payment',
                'initiated_by' => auth()->id(),
                'posted_at' => now(),
            ]);

            LedgerEntry::create([
                'transaction_id' => $transaction->transaction_id,
                'account_id' => $account->account_id,
                'direction' => LedgerDirection::DEBIT,
                'amount' => $amount->getAmount(),
                'balance_after' => $account->balance,
                'posted_at' => now(),
            ]);

            $payment = Payment::create([
                'customer_id' => $account->customer_id,
                'account_id' => $account->account_id,
                'biller_id' => $data['biller_id'] ?? null,
                'payment_type' => $data['payment_type'] ?? 'bill',
                'amount' => $amount->getAmount(),
                'currency' => $account->currency,
                'status' => PaymentStatus::SUCCESSFUL,
                'recipient_identifier' => $data['recipient_identifier'] ?? null,
                'narration' => $data['narration'] ?? null,
                'transaction_id' => $transaction->transaction_id,
                'scheduled_for' => $data['scheduled_for'] ?? null,
                'frequency' => $data['frequency'] ?? null,
                'is_recurring' => $data['is_recurring'] ?? false,
            ]);

            AuditLog::record('payment.completed', 'Payment', $payment->payment_id);

            return $payment;
        });
    }

    public function topUpAirtime(array $data): Payment
    {
        $data['payment_type'] = 'airtime';
        $data['narration'] = 'Airtime top-up: '.$data['recipient_identifier'];

        return $this->payBill($data);
    }
}
