<?php

namespace App\Domain\Loan;

use App\ValueObjects\LoanTerms;
use DateTimeImmutable;

final class AmortizationScheduleGenerator
{
    public function __construct(
        private readonly InterestCalculator $calculator,
    ) {}

    public function generate(LoanTerms $terms, ?DateTimeImmutable $startDate = null): array
    {
        $startDate ??= new DateTimeImmutable;

        $emi = $this->calculator->calculateEmi($terms);
        $balance = $terms->principal->getAmount();
        $monthlyRate = bcdiv($terms->rate->annual(), '12', 8);

        $schedule = [];

        for ($i = 1; $i <= $terms->tenorMonths; $i++) {
            $interest = $this->calculator->interestFor($balance, $monthlyRate);
            $principal = bcsub($emi, $interest, 4);

            if ($i === $terms->tenorMonths) {
                $principal = $balance;
                $emi = bcadd($principal, $interest, 4);
            }

            $balance = bcsub($balance, $principal, 4);
            $dueDate = $startDate->modify("+{$i} month");

            $schedule[] = [
                'sequence' => $i,
                'due_date' => $dueDate->format('Y-m-d'),
                'principal_due' => $principal,
                'interest_due' => $interest,
                'total_due' => bcadd($principal, $interest, 4),
                'balance_after' => bccomp($balance, '0', 4) < 0 ? '0' : $balance,
            ];
        }

        return $schedule;
    }
}
