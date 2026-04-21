<?php

namespace App\Enums;

enum LoanProduct: string
{
    case PERSONAL = 'personal';
    case MORTGAGE = 'mortgage';
    case AUTO = 'auto';

    public function label(): string
    {
        return match ($this) {
            self::PERSONAL => 'Personal Loan',
            self::MORTGAGE => 'Mortgage Loan',
            self::AUTO => 'Auto Loan',
        };
    }
}
