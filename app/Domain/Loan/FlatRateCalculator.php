<?php

namespace App\Domain\Loan;

use App\ValueObjects\LoanTerms;

final class FlatRateCalculator implements InterestCalculator
{
    public function calculateEmi(LoanTerms $terms): string
    {
        $principal = $terms->principal->getAmount();
        $years = bcdiv((string) $terms->tenorMonths, '12', 8);
        $totalInterest = bcmul(bcmul($principal, $terms->rate->annual(), 8), $years, 8);
        $totalPayable = bcadd($principal, $totalInterest, 8);

        return bcdiv($totalPayable, (string) $terms->tenorMonths, 4);
    }

    public function interestFor(string $balance, string $monthlyRate): string
    {
        return bcmul($balance, $monthlyRate, 4);
    }

    public function name(): string
    {
        return 'flat_rate';
    }
}
