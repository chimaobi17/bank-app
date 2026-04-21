<?php

use App\Http\Controllers\Admin\AdminAccountsController;
use App\Http\Controllers\Admin\AdminAuditController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminLoansController;
use App\Http\Controllers\Admin\AdminUsersController;
use App\Http\Controllers\Banking\AccountsPageController;
use App\Http\Controllers\Banking\DashboardController;
use App\Http\Controllers\Banking\LoansPageController;
use App\Http\Controllers\Banking\NotificationsPageController;
use App\Http\Controllers\Banking\PaymentsPageController;
use App\Http\Controllers\Banking\TransfersPageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingPageController;

Route::get('/', LandingPageController::class)->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::prefix('banking')->name('banking.')->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');

        Route::get('accounts', [AccountsPageController::class, 'index'])->name('accounts');
        Route::post('accounts', [AccountsPageController::class, 'open'])->name('accounts.open');
        Route::get('accounts/{accountNumber}', [AccountsPageController::class, 'show'])->name('accounts.show');

        Route::get('transfers', [TransfersPageController::class, 'create'])->name('transfers');
        Route::post('transfers', [TransfersPageController::class, 'store'])
            ->middleware('mfa')
            ->name('transfers.store');

        Route::get('loans', [LoansPageController::class, 'index'])->name('loans');
        Route::get('loans/apply', [LoansPageController::class, 'create'])->name('loans.apply');
        Route::post('loans', [LoansPageController::class, 'store'])->name('loans.store');
        Route::get('loans/{id}', [LoansPageController::class, 'show'])->name('loans.show');
        Route::post('loans/calculate-emi', [LoansPageController::class, 'calculateEmi'])->name('loans.calculate');

        Route::get('payments', [PaymentsPageController::class, 'index'])->name('payments');
        Route::post('payments/bill', [PaymentsPageController::class, 'payBill'])->name('payments.bill');
        Route::post('payments/airtime', [PaymentsPageController::class, 'payAirtime'])->name('payments.airtime');

        Route::get('notifications', [NotificationsPageController::class, 'index'])->name('notifications');
        Route::post('notifications/{id}/read', [NotificationsPageController::class, 'markAsRead'])->name('notifications.read');
        Route::post('notifications/read-all', [NotificationsPageController::class, 'markAllAsRead'])->name('notifications.read-all');
    });

    Route::prefix('admin')->name('admin.')
        ->middleware('role:administrator,branch_manager,teller,auditor')
        ->group(function () {
            Route::get('/', AdminDashboardController::class)->name('dashboard');

            Route::get('users', [AdminUsersController::class, 'index'])->name('users');

            Route::get('accounts', [AdminAccountsController::class, 'index'])->name('accounts');
            Route::post('accounts/{id}/activate', [AdminAccountsController::class, 'activate'])->name('accounts.activate');
            Route::post('accounts/{id}/close', [AdminAccountsController::class, 'close'])->name('accounts.close');

            Route::get('loans', [AdminLoansController::class, 'index'])->name('loans');
            Route::post('loans/{id}/approve', [AdminLoansController::class, 'approve'])
                ->middleware(['role:administrator,branch_manager', 'mfa'])
                ->name('loans.approve');
            Route::post('loans/{id}/reject', [AdminLoansController::class, 'reject'])
                ->middleware('role:administrator,branch_manager')
                ->name('loans.reject');
            Route::post('loans/{id}/disburse', [AdminLoansController::class, 'disburse'])
                ->middleware(['role:administrator,branch_manager', 'mfa'])
                ->name('loans.disburse');

            Route::get('audit', [AdminAuditController::class, 'index'])->name('audit');
        });
});

require __DIR__.'/settings.php';
