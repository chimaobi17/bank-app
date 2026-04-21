<?php

namespace App\Enums;

enum AccountType: string
{
    case SAVINGS = 'savings';
    case CHECKING = 'checking';
    case FIXED_DEPOSIT = 'fixed_deposit';

    public function label(): string
    {
        return match ($this) {
            self::SAVINGS => 'Savings Account',
            self::CHECKING => 'Checking Account',
            self::FIXED_DEPOSIT => 'Fixed Deposit',
        };
    }
}
