<?php

namespace App\Console\Commands;

use App\Services\ScheduledTransferService;
use Illuminate\Console\Command;

class ProcessScheduledTransfers extends Command
{
    protected $signature = 'bank:run-scheduled-transfers';

    protected $description = 'Execute all scheduled transfers whose next_run_date is due.';

    public function handle(ScheduledTransferService $service): int
    {
        $processed = $service->runDue();

        $this->info("Processed {$processed->count()} scheduled transfer(s).");

        return self::SUCCESS;
    }
}
