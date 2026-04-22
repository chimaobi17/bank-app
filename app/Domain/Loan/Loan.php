<?php

namespace App\Domain\Loan;

use App\Contracts\Domain\Auditable;
use App\Enums\LoanProduct;
use App\Enums\LoanStatus;
use App\Exceptions\InvalidStateTransitionException;
use App\Models\Loan as LoanModel;
use App\ValueObjects\InterestRate;
use App\ValueObjects\LoanTerms;
use App\ValueObjects\Money;

abstract class Loan implements Auditable
{
    public function __construct(protected LoanModel $model) {}

    abstract public function product(): LoanProduct;

    abstract public function interestCalculator(): InterestCalculator;

    abstract public function maxTenorMonths(): int;

    abstract public function minPrincipal(): Money;

    abstract public function requiresCollateral(): bool;

    public function terms(): LoanTerms
    {
        return new LoanTerms(
            Money::of($this->model->principal, 'NGN'),
            new InterestRate($this->model->interest_rate),
            $this->model->tenor_months,
        );
    }

    public function status(): LoanStatus
    {
        return $this->model->status;
    }

    public function outstandingBalance(): Money
    {
        return Money::of($this->model->outstanding_balance, 'NGN');
    }

    public function transitionTo(LoanStatus $newStatus): void
    {
        if (! $this->model->status->canTransitionTo($newStatus)) {
            throw new InvalidStateTransitionException(
                $this->model->status->value,
                $newStatus->value,
                'Loan',
            );
        }

        $this->model->status = $newStatus;
    }

    public function applyPayment(Money $payment): void
    {
        $newBalance = bcsub($this->model->outstanding_balance, $payment->getAmount(), 4);
        $this->model->outstanding_balance = bccomp($newBalance, '0', 4) < 0 ? '0' : $newBalance;
        $this->model->total_paid = bcadd($this->model->total_paid ?? '0', $payment->getAmount(), 4);

        if (bccomp($this->model->outstanding_balance, '0', 4) === 0) {
            $this->model->status = LoanStatus::CLOSED;
            $this->model->closed_at = now();
        }
    }

    public function model(): LoanModel
    {
        return $this->model;
    }

    public function auditEntityType(): string
    {
        return 'Loan';
    }

    public function auditEntityId(): int|string
    {
        return $this->model->loan_id;
    }

    public function auditSnapshot(): array
    {
        return [
            'product' => $this->product()->value,
            'principal' => $this->model->principal,
            'status' => $this->model->status->value,
            'outstanding_balance' => $this->model->outstanding_balance,
        ];
    }
}
