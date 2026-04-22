<?php

namespace App\Providers;

use App\Models\Account;
use App\Models\AuditLog;
use App\Models\Loan;
use App\Models\Transaction;
use App\Policies\AccountPolicy;
use App\Policies\AuditLogPolicy;
use App\Policies\LoanPolicy;
use App\Policies\TransactionPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Account::class => AccountPolicy::class,
        Loan::class => LoanPolicy::class,
        Transaction::class => TransactionPolicy::class,
        AuditLog::class => AuditLogPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('staff', fn ($user) => $user && (
            $user->hasRole('administrator')
            || $user->hasRole('branch_manager')
            || $user->hasRole('teller')
            || $user->hasRole('auditor')
        ));

        Gate::define('administer', fn ($user) => $user && $user->hasRole('administrator'));
    }
}
