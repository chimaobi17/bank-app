<?php

use App\Services\Reporting\StatementService;

it('renders CSV with header and rows', function () {
    $svc = new StatementService;

    $statement = [
        'transactions' => [
            [
                'posted_at' => '2026-04-22T10:00:00Z',
                'reference' => 'TXN-1',
                'type' => 'transfer',
                'narration' => 'Rent, April',
                'direction' => 'debit',
                'amount' => '500.0000',
                'balance_after' => '1500.0000',
            ],
            [
                'posted_at' => '2026-04-22T11:00:00Z',
                'reference' => 'TXN-2',
                'type' => 'deposit',
                'narration' => 'Salary "monthly"',
                'direction' => 'credit',
                'amount' => '2000.0000',
                'balance_after' => '3500.0000',
            ],
        ],
    ];

    $csv = $svc->toCsv($statement);

    expect($csv)->toContain('Posted At,Reference,Type,Narration,Direction,Amount,Balance After');
    expect($csv)->toContain('"Rent, April"');
    expect($csv)->toContain('"Salary ""monthly"""');
    expect($csv)->toContain('TXN-1');
    expect($csv)->toContain('TXN-2');
});
