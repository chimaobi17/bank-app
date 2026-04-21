<?php

namespace App\Domain\Account;

use App\Enums\AccountType;
use App\Models\Account as AccountModel;
use InvalidArgumentException;

final class AccountFactory
{
    public static function fromModel(AccountModel $model): Account
    {
        return match ($model->account_type) {
            AccountType::SAVINGS => new SavingsAccount($model),
            AccountType::CHECKING => new CheckingAccount($model),
            AccountType::FIXED_DEPOSIT => new FixedDepositAccount($model),
            default => throw new InvalidArgumentException("Unknown account type: {$model->account_type->value}"),
        };
    }
}
