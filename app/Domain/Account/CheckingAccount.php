<?php

namespace App\Domain\Account;

use App\Contracts\Domain\FeeCharging;
use App\Enums\AccountType;
use App\Exceptions\InsufficientFundsException;
use App\ValueObjects\Money;

final class CheckingAccount extends Account implements FeeCharging
{
    public function type(): AccountType
    {
        return AccountType::CHECKING;
    }

    public function overdraftLimit(): Money
    {
        return Money::of($this->model->overdraft_limit ?? '0', $this->model->currency);
    }

    public function withdraw(Money $amount): void
    {
        $this->guardActive();
        $this->guardSameCurrency($amount);

        $available = $this->availableBalance();
        if (! $available->isLessThan($amount)) {
            parent::withdraw($amount);

            return;
        }

        $totalWithOverdraft = $available->add($this->overdraftLimit());
        if ($totalWithOverdraft->isLessThan($amount)) {
            throw new InsufficientFundsException;
        }

        $this->adjustBalances('-'.$amount->getAmount());
    }

    public function feeFor(string $operation, Money $amount): Money
    {
        return match ($operation) {
            'overdraft' => Money::of('500.00', $this->model->currency),
            'maintenance' => Money::of('100.00', $this->model->currency),
            default => Money::zero($this->model->currency),
        };
    }
}
