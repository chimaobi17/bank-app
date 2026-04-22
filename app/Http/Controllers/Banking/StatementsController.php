<?php

namespace App\Http\Controllers\Banking;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Services\Reporting\SpendAnalysisService;
use App\Services\Reporting\StatementService;
use App\ValueObjects\DateRange;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class StatementsController extends Controller
{
    public function __construct(
        private readonly StatementService $statements,
        private readonly SpendAnalysisService $analysis,
    ) {}

    /**
     * Show the account statement view with inline analytics.
     */
    public function view(Request $request, string $account): InertiaResponse
    {
        $acct = $this->resolveAccount($request, $account);
        $range = $this->buildRange($request);

        $statement = $this->statements->buildStatement($acct, $range);
        $analytics = $this->analysis->summarize($acct, $range);

        return Inertia::render('banking/statements/index', [
            'statement' => $statement,
            'analytics' => $analytics,
            'filters' => [
                'from' => $range->start()->toDateString(),
                'to' => $range->end()->toDateString(),
            ],
        ]);
    }

    /**
     * Download a CSV export of the account statement.
     */
    public function csv(Request $request, string $account): Response
    {
        $acct = $this->resolveAccount($request, $account);
        $range = $this->buildRange($request);

        $statement = $this->statements->buildStatement($acct, $range);
        $csv = $this->statements->toCsv($statement);

        $filename = sprintf(
            '%s_statement_%s_to_%s.csv',
            $acct->account_number,
            $range->start()->toDateString(),
            $range->end()->toDateString(),
        );

        return new Response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }

    private function resolveAccount(Request $request, string $accountIdentifier): Account
    {
        $customerId = $request->user()->customer_id;

        $acct = Account::where('account_number', $accountIdentifier)
            ->where('customer_id', $customerId)
            ->first();

        abort_unless($acct, 404, 'Account not found.');

        return $acct;
    }

    private function buildRange(Request $request): DateRange
    {
        $from = $request->input('from')
            ? CarbonImmutable::parse($request->input('from'))->startOfDay()
            : CarbonImmutable::now()->subDays(30)->startOfDay();

        $to = $request->input('to')
            ? CarbonImmutable::parse($request->input('to'))->endOfDay()
            : CarbonImmutable::now()->endOfDay();

        return new DateRange($from, $to);
    }
}
