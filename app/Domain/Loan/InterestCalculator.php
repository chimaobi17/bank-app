<?php

namespace App\Domain\Loan;

use App\ValueObjects\LoanTerms;

interface InterestCalculator
{
    public function calculateEmi(LoanTerms $terms): string;

    public function interestFor(string $balance, string $monthlyRate): string;

    public function name(): string;
}
