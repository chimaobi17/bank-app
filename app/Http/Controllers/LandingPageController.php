<?php

namespace App\Http\Controllers;

use App\Services\BankStatsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class LandingPageController extends Controller
{
    public function __construct(
        private BankStatsService $stats
    ) {}

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function __invoke(Request $request): Response
    {
        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'stats' => $this->stats->getGlobalStats(),
        ]);
    }
}
