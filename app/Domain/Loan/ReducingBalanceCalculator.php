<?php

namespace App\Domain\Loan;

use App\ValueObjects\LoanTerms;

final class ReducingBalanceCalculator implements InterestCalculator
{
    public function calculateEmi(LoanTerms $terms): string
    {
        $principal = $terms->principal->getAmount();
        $monthlyRate = bcdiv($terms->rate->annual(), '12', 8);
        $n = $terms->tenorMonths;

        if (bccomp($monthlyRate, '0', 8) === 0) {
            return bcdiv($principal, (string) $n, 4);
        }

        $rPlusOne = bcadd('1', $monthlyRate, 8);
        $power = bcpow($rPlusOne, (string) $n, 8);
        $numerator = bcmul($principal, bcmul($monthlyRate, $power, 8), 8);
        $denominator = bcsub($power, '1', 8);

        return bcdiv($numerator, $denominator, 4);
    }

    public function interestFor(string $balance, string $monthlyRate): string
    {
        return bcmul($balance, $monthlyRate, 4);
    }

    public function name(): string
    {
        return 'reducing_balance';
    }
}
