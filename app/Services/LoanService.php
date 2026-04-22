<?php

namespace App\Services;

use App\Contracts\Repositories\AuditLogRepositoryContract;
use App\Contracts\Repositories\LoanRepositoryContract;
use App\Domain\Account\AccountFactory;
use App\Domain\Loan\AmortizationScheduleGenerator;
use App\Domain\Loan\Loan as DomainLoan;
use App\Domain\Loan\LoanFactory;
use App\Domain\Transaction\LoanDisbursementTransaction;
use App\Domain\Transaction\TransactionProcessor;
use App\Domain\Transaction\TransactionResult;
use App\Enums\InstallmentStatus;
use App\Enums\LoanStatus;
use App\Models\Loan;
use App\Models\LoanInstallment;
use App\ValueObjects\InterestRate;
use App\ValueObjects\LoanTerms;
use App\ValueObjects\Money;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use RuntimeException;

final class LoanService
{
    public function __construct(
        private readonly LoanRepositoryContract $loans,
        private readonly TransactionProcessor $processor,
        private readonly AuditLogRepositoryContract $audit,
    ) {}

    public function apply(array $data): DomainLoan
    {
        return DB::transaction(function () use ($data) {
            $model = $this->loans->create(array_merge($data, [
                'status' => LoanStatus::SUBMITTED,
                'outstanding_balance' => $data['principal'],
                'total_paid' => '0',
            ]));

            $loan = LoanFactory::fromModel($model);
            $this->guardProductRules($loan);
            $this->audit->record($loan, 'loan.applied');

            return $loan;
        });
    }

    public function approve(Loan $model, int $approvedBy): DomainLoan
    {
        return DB::transaction(function () use ($model, $approvedBy) {
            $loan = LoanFactory::fromModel($model);
            $loan->transitionTo(LoanStatus::APPROVED);

            $model->approved_by = $approvedBy;
            $model->approved_at = now();
            $model->save();

            $terms = $loan->terms();
            $schedule = (new AmortizationScheduleGenerator($loan->interestCalculator()))->generate($terms);

            $totalInterest = '0';
            foreach ($schedule as $entry) {
                LoanInstallment::create([
                    'loan_id' => $model->loan_id,
                    'sequence' => $entry['sequence'],
                    'due_date' => $entry['due_date'],
                    'principal_due' => $entry['principal_due'],
                    'interest_due' => $entry['interest_due'],
                    'total_due' => $entry['total_due'],
                    'status' => InstallmentStatus::UPCOMING,
                ]);
                $totalInterest = bcadd($totalInterest, $entry['interest_due'], 4);
            }

            $model->total_interest = $totalInterest;
            $model->save();

            $this->audit->record($loan, 'loan.approved', $approvedBy);

            return $loan;
        });
    }

    public function reject(Loan $model, int $rejectedBy): DomainLoan
    {
        $loan = LoanFactory::fromModel($model);
        $loan->transitionTo(LoanStatus::REJECTED);
        $model->save();

        $this->audit->record($loan, 'loan.rejected', $rejectedBy);

        return $loan;
    }

    public function disburse(Loan $model): TransactionResult
    {
        if ($model->status !== LoanStatus::APPROVED) {
            throw new RuntimeException('Only approved loans can be disbursed.');
        }

        if (! $model->disbursedAccount) {
            throw new InvalidArgumentException('Loan has no target disbursement account.');
        }

        $destination = AccountFactory::fromModel($model->disbursedAccount);
        $amount = Money::of($model->principal, $model->disbursedAccount->currency);

        $transaction = new LoanDisbursementTransaction(
            amount: $amount,
            destination: $destination,
            loan: $model,
            initiatedBy: auth()->id(),
        );

        $result = $this->processor->process($transaction);

        $loan = LoanFactory::fromModel($model->fresh());
        $loan->transitionTo(LoanStatus::DISBURSED);
        $loan->model()->disbursed_at = now();
        $loan->model()->save();

        $model->installments()->where('sequence', 1)->update([
            'status' => InstallmentStatus::DUE,
        ]);

        $this->audit->record($loan, 'loan.disbursed');

        return $result;
    }

    public function quote(Money $principal, InterestRate $rate, int $tenorMonths): array
    {
        $terms = new LoanTerms($principal, $rate, $tenorMonths);
        $calculator = new \App\Domain\Loan\ReducingBalanceCalculator;

        $emi = $calculator->calculateEmi($terms);
        $totalPayment = bcmul($emi, (string) $tenorMonths, 4);
        $totalInterest = bcsub($totalPayment, $principal->getAmount(), 4);

        return [
            'emi' => $emi,
            'total_payment' => $totalPayment,
            'total_interest' => $totalInterest,
            'principal' => $principal->getAmount(),
            'rate' => $rate->annual(),
            'tenor_months' => $tenorMonths,
        ];
    }

    private function guardProductRules(DomainLoan $loan): void
    {
        $terms = $loan->terms();

        if ($terms->tenorMonths > $loan->maxTenorMonths()) {
            throw new InvalidArgumentException(
                "Tenor exceeds maximum for {$loan->product()->label()}: {$loan->maxTenorMonths()} months."
            );
        }

        if ($terms->principal->isLessThan($loan->minPrincipal())) {
            throw new InvalidArgumentException(
                "Principal below minimum for {$loan->product()->label()}: {$loan->minPrincipal()->getAmount()}."
            );
        }
    }
}
