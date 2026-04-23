<?php

namespace App\Services;

use App\Contracts\Repositories\AccountRepositoryContract;
use App\Contracts\Repositories\AuditLogRepositoryContract;
use App\Domain\Account\AccountFactory;
use App\Domain\Transaction\BillPaymentTransaction;
use App\Domain\Transaction\TransactionProcessor;
use App\Domain\Transaction\TransactionResult;
use App\Enums\PaymentStatus;
use App\Models\Biller;
use App\Models\Payment;
use App\ValueObjects\Money;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

final class BillPaymentService
{
    public function __construct(
        private readonly AccountRepositoryContract $accounts,
        private readonly TransactionProcessor $processor,
        private readonly AuditLogRepositoryContract $audit,
    ) {}

    public function payBill(array $data): Payment
    {
        return DB::transaction(function () use ($data) {
            $accountModel = $this->accounts->findById($data['account_id']);
            if (! $accountModel) {
                throw new InvalidArgumentException('Account not found.');
            }

            $biller = Biller::findOrFail($data['biller_id']);
            if (! $biller->is_active) {
                throw new InvalidArgumentException("Biller {$biller->name} is inactive.");
            }

            $source = AccountFactory::fromModel($accountModel);
            $amount = Money::of($data['amount'], $accountModel->currency);

            $transaction = new BillPaymentTransaction(
                amount: $amount,
                source: $source,
                biller: $biller,
                customerReference: $data['recipient_identifier'] ?? '',
                initiatedBy: $data['initiated_by'] ?? auth()->id(),
                narration: $data['narration'] ?? null,
                channel: $data['channel'] ?? 'mobile-app',
            );

            $result = $this->processor->process($transaction);

            $payment = $this->persistPayment($accountModel, $biller, $amount, $result, $data);

            $this->audit->record($source, 'payment.bill_paid', $data['initiated_by'] ?? auth()->id(), [
                'biller' => $biller->code,
                'amount' => $amount->getAmount(),
                'reference' => $result->reference->getValue(),
                'payment_id' => $payment->payment_id,
            ]);

            return $payment;
        });
    }

    public function topUpAirtime(array $data): Payment
    {
        return $this->payBill(array_merge($data, [
            'payment_type' => 'airtime',
            'narration' => 'Airtime top-up: '.($data['recipient_identifier'] ?? 'unknown'),
        ]));
    }

    public function paySubscription(array $data): Payment
    {
        return $this->payBill(array_merge($data, [
            'payment_type' => 'subscription',
        ]));
    }

    private function persistPayment(
        $accountModel,
        Biller $biller,
        Money $amount,
        TransactionResult $result,
        array $data,
    ): Payment {
        return Payment::create([
            'customer_id' => $accountModel->customer_id,
            'account_id' => $accountModel->account_id,
            'biller_id' => $biller->biller_id,
            'payment_type' => $data['payment_type'] ?? 'bill',
            'amount' => $amount->getAmount(),
            'currency' => $amount->getCurrency(),
            'status' => $result->success ? PaymentStatus::SUCCESSFUL : PaymentStatus::FAILED,
            'recipient_identifier' => $data['recipient_identifier'] ?? null,
            'narration' => $data['narration'] ?? null,
            'transaction_id' => $result->transaction->transaction_id,
            'scheduled_for' => $data['scheduled_for'] ?? null,
            'frequency' => $data['frequency'] ?? null,
            'is_recurring' => $data['is_recurring'] ?? false,
        ]);
    }
}
