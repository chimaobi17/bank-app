<?php

use App\Models\Loan;

it('calculates EMI using the amortization formula', function () {
    $loan = new Loan([
        'principal' => '100000',
        'interest_rate' => '0.12',
        'tenor_months' => 12,
    ]);

    $emi = $loan->calculateEmi();

    // EMI for 100k @ 12% annual / 12 months ≈ 8884.88
    expect((float) $emi)->toBeGreaterThan(8800)->toBeLessThan(8900);
});

it('generates an amortization schedule with correct number of rows', function () {
    $loan = new Loan([
        'principal' => '50000',
        'interest_rate' => '0.10',
        'tenor_months' => 6,
    ]);

    $schedule = $loan->generateAmortizationSchedule();

    expect($schedule)->toHaveCount(6);
    expect($schedule[0])->toHaveKeys(['sequence', 'due_date', 'principal_due', 'interest_due', 'total_due']);
});

it('handles zero-interest loans', function () {
    $loan = new Loan([
        'principal' => '12000',
        'interest_rate' => '0',
        'tenor_months' => 12,
    ]);

    $emi = $loan->calculateEmi();
    expect((string) ((int) $emi))->toBe('1000');
});
