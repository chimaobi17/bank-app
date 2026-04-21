<?php

namespace App\Domain\Loan;

use App\Enums\LoanProduct;
use App\Models\Loan as LoanModel;
use InvalidArgumentException;

final class LoanFactory
{
    public static function fromModel(LoanModel $model): Loan
    {
        return match ($model->product) {
            LoanProduct::PERSONAL => new PersonalLoan($model),
            LoanProduct::MORTGAGE => new MortgageLoan($model),
            LoanProduct::AUTO => new AutoLoan($model),
            default => throw new InvalidArgumentException("Unknown loan product: {$model->product->value}"),
        };
    }
}
