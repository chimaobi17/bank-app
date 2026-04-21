<?php

namespace App\Domain\Account;

use App\Contracts\Domain\Auditable;
use App\Enums\AccountStatus;
use App\Enums\AccountType;
use App\Exceptions\AccountNotActiveException;
use App\Exceptions\InsufficientFundsException;
use App\Exceptions\InvalidStateTransitionException;
use App\Models\Account as AccountModel;
use App\ValueObjects\AccountNumber;
use App\ValueObjects\Money;

abstract class Account implements Auditable
{
    public function __construct(protected AccountModel $model) {}

    abstract public function type(): AccountType;

    public function number(): AccountNumber
    {
        return new AccountNumber($this->model->account_number);
    }

    public function balance(): Money
    {
        return Money::of($this->model->balance, $this->model->currency);
    }

    public function availableBalance(): Money
    {
        return Money::of($this->model->available_balance, $this->model->currency);
    }

    public function status(): AccountStatus
    {
        return $this->model->status;
    }

    public function deposit(Money $amount): void
    {
        $this->guardActive();
        $this->model->balance = bcadd($this->model->balance, $amount->getAmount(), 4);
        $this->model->available_balance = bcadd($this->model->available_balance, $amount->getAmount(), 4);
    }

    public function withdraw(Money $amount): void
    {
        $this->guardActive();
        $this->guardSufficientFunds($amount);

        $this->model->balance = bcsub($this->model->balance, $amount->getAmount(), 4);
        $this->model->available_balance = bcsub($this->model->available_balance, $amount->getAmount(), 4);
    }

    public function transitionTo(AccountStatus $newStatus): void
    {
        if (! $this->model->status->canTransitionTo($newStatus)) {
            throw new InvalidStateTransitionException(
                $this->model->status->value,
                $newStatus->value,
                'Account'
            );
        }

        $this->model->status = $newStatus;
    }

    public function model(): AccountModel
    {
        return $this->model;
    }

    public function auditEntityType(): string
    {
        return 'Account';
    }

    public function auditEntityId(): int|string
    {
        return $this->model->account_id;
    }

    public function auditSnapshot(): array
    {
        return [
            'account_number' => $this->model->account_number,
            'type' => $this->type()->value,
            'status' => $this->model->status->value,
            'balance' => $this->model->balance,
        ];
    }

    protected function guardActive(): void
    {
        if ($this->model->status !== AccountStatus::ACTIVE) {
            throw new AccountNotActiveException;
        }
    }

    protected function guardSufficientFunds(Money $amount): void
    {
        $available = Money::of($this->model->available_balance, $this->model->currency);
        if ($available->isLessThan($amount)) {
            throw new InsufficientFundsException;
        }
    }
}
