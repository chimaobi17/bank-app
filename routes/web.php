<?php

use App\Http\Controllers\Admin\AdminAccountsController;
use App\Http\Controllers\Admin\AdminAuditController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminLoansController;
use App\Http\Controllers\Admin\AdminUsersController;
use App\Http\Controllers\Banking\AccountsPageController;
use App\Http\Controllers\Banking\DashboardController;
use App\Http\Controllers\Banking\LoansPageController;
use App\Http\Controllers\Banking\CardsPageController;
use App\Http\Controllers\Banking\InterbankPageController;
use App\Http\Controllers\Banking\NotificationsPageController;
use App\Http\Controllers\Banking\OnboardingController;
use App\Http\Controllers\Banking\PasskeysPageController;
use App\Http\Controllers\Banking\PaymentsPageController;
use App\Http\Controllers\Banking\StatementsController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Banking\TransfersPageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingPageController;

Route::get('/', LandingPageController::class)->name('home');

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisterController::class, 'create'])->name('register');
    Route::post('register', [RegisterController::class, 'store'])->name('register.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::prefix('banking')->name('banking.')->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');

        Route::get('accounts', [AccountsPageController::class, 'index'])->name('accounts');
        Route::post('accounts', [AccountsPageController::class, 'open'])->name('accounts.open');
        Route::get('accounts/{accountNumber}', [AccountsPageController::class, 'show'])->name('accounts.show');

        Route::get('transfers', [TransfersPageController::class, 'create'])->name('transfers');
        Route::post('transfers', [TransfersPageController::class, 'store'])
            ->middleware(['mfa', 'financial_throttle:transfer'])
            ->name('transfers.store');

        Route::get('loans', [LoansPageController::class, 'index'])->name('loans');
        Route::get('loans/apply', [LoansPageController::class, 'create'])->name('loans.apply');
        Route::post('loans', [LoansPageController::class, 'store'])->name('loans.store');
        Route::get('loans/{id}', [LoansPageController::class, 'show'])->name('loans.show');
        Route::post('loans/calculate-emi', [LoansPageController::class, 'calculateEmi'])->name('loans.calculate');

        Route::get('payments', [PaymentsPageController::class, 'index'])->name('payments');
        Route::post('payments/bill', [PaymentsPageController::class, 'payBill'])
            ->middleware('financial_throttle:payment')
            ->name('payments.bill');
        Route::post('payments/airtime', [PaymentsPageController::class, 'payAirtime'])
            ->middleware('financial_throttle:payment')
            ->name('payments.airtime');

        Route::get('notifications', [NotificationsPageController::class, 'index'])->name('notifications');
        Route::post('notifications/{id}/read', [NotificationsPageController::class, 'markAsRead'])->name('notifications.read');
        Route::post('notifications/read-all', [NotificationsPageController::class, 'markAllAsRead'])->name('notifications.read-all');

        Route::get('onboarding', [OnboardingController::class, 'show'])->name('onboarding');
        Route::post('onboarding/identity', [OnboardingController::class, 'submitIdentity'])->name('onboarding.identity');
        Route::post('onboarding/address', [OnboardingController::class, 'submitAddressProof'])->name('onboarding.address');

        Route::get('cards', [CardsPageController::class, 'index'])->name('cards');
        Route::get('cards/{card}', [CardsPageController::class, 'show'])->name('cards.show');
        Route::post('cards/virtual', [CardsPageController::class, 'issueVirtual'])->name('cards.virtual');
        Route::post('cards/{card}/pin', [CardsPageController::class, 'setPin'])->name('cards.pin');
        Route::post('cards/{card}/limits', [CardsPageController::class, 'setLimits'])->name('cards.limits');
        Route::post('cards/{card}/freeze', [CardsPageController::class, 'freeze'])->name('cards.freeze');
        Route::post('cards/{card}/unfreeze', [CardsPageController::class, 'unfreeze'])->name('cards.unfreeze');
        Route::post('cards/{card}/replace', [CardsPageController::class, 'requestReplacement'])->name('cards.replace');

        Route::get('statements/{account}', [StatementsController::class, 'view'])->name('statements');
        Route::get('statements/{account}/csv', [StatementsController::class, 'csv'])->name('statements.csv');

        // Interbank transfers (Phase 14)
        Route::get('interbank', [InterbankPageController::class, 'create'])->name('interbank');
        Route::post('interbank/name-enquiry', [InterbankPageController::class, 'nameEnquiry'])->name('interbank.enquiry');
        Route::post('interbank', [InterbankPageController::class, 'store'])
            ->middleware(['mfa', 'financial_throttle:interbank'])
            ->name('interbank.store');

        // Passkey / WebAuthn management (Phase 14)
        Route::get('security/passkeys', [PasskeysPageController::class, 'index'])->name('passkeys');
        Route::post('security/passkeys/register', [PasskeysPageController::class, 'beginRegistration'])->name('passkeys.register');
        Route::post('security/passkeys/register/complete', [PasskeysPageController::class, 'completeRegistration'])->name('passkeys.register.complete');
        Route::post('security/passkeys/authenticate', [PasskeysPageController::class, 'beginAuthentication'])->name('passkeys.authenticate');
        Route::post('security/passkeys/verify', [PasskeysPageController::class, 'verifyAssertion'])->name('passkeys.verify');
        Route::post('security/passkeys/{credentialId}/revoke', [PasskeysPageController::class, 'revoke'])->name('passkeys.revoke');
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
