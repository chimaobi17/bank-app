<?php

namespace App\Providers;

use App\Contracts\Repositories\AccountRepositoryContract;
use App\Contracts\Repositories\AuditLogRepositoryContract;
use App\Contracts\Repositories\CustomerRepositoryContract;
use App\Contracts\Repositories\LedgerRepositoryContract;
use App\Contracts\Repositories\LoanRepositoryContract;
use App\Contracts\Repositories\TransactionRepositoryContract;
use App\Repositories\AccountRepository;
use App\Repositories\AuditLogRepository;
use App\Repositories\CustomerRepository;
use App\Repositories\LedgerRepository;
use App\Repositories\LoanRepository;
use App\Repositories\TransactionRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AccountRepositoryContract::class, AccountRepository::class);
        $this->app->bind(LoanRepositoryContract::class, LoanRepository::class);
        $this->app->bind(TransactionRepositoryContract::class, TransactionRepository::class);
        $this->app->bind(LedgerRepositoryContract::class, LedgerRepository::class);
        $this->app->bind(CustomerRepositoryContract::class, CustomerRepository::class);
        $this->app->bind(AuditLogRepositoryContract::class, AuditLogRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
