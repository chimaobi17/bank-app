<?php

use App\Http\Controllers\Api\V1\AccountController;
use App\Http\Controllers\Api\V1\AdminController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\IdentityVerificationController;
use App\Http\Controllers\Api\V1\InterbankTransferController;
use App\Http\Controllers\Api\V1\LoanController;
use App\Http\Controllers\Api\V1\NotificationController;
use App\Http\Controllers\Api\V1\PaymentController;
use App\Http\Controllers\Api\V1\ProfileController;
use App\Http\Controllers\Api\V1\TransferController;
use App\Http\Controllers\Api\V1\WebAuthnController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Public endpoints
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Authenticated endpoints
    Route::middleware('auth:sanctum')->group(function () {
        // Auth / session
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/me', [AuthController::class, 'me']);

        // Profile
        Route::get('/profile', [ProfileController::class, 'show']);
        Route::patch('/profile', [ProfileController::class, 'update']);
        Route::post('/profile/change-password', [ProfileController::class, 'changePassword']);

        // Accounts
        Route::get('/accounts', [AccountController::class, 'index']);
        Route::post('/accounts', [AccountController::class, 'store']);
        Route::get('/accounts/{accountNumber}', [AccountController::class, 'show']);
        Route::get('/accounts/{accountNumber}/transactions', [AccountController::class, 'transactions']);

        // Transfers
        Route::post('/transfers', [TransferController::class, 'store']);

        // Loans
        Route::get('/loans', [LoanController::class, 'index']);
        Route::post('/loans', [LoanController::class, 'store']);
        Route::get('/loans/{id}', [LoanController::class, 'show']);
        Route::post('/loans/calculate-emi', [LoanController::class, 'calculateEmi']);

        // Payments
        Route::get('/billers', [PaymentController::class, 'billers']);
        Route::get('/payments', [PaymentController::class, 'index']);
        Route::post('/payments/bill', [PaymentController::class, 'pay']);
        Route::post('/payments/airtime', [PaymentController::class, 'airtime']);

        // Notifications
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
        Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);

        // WebAuthn / Passkeys (Phase 14)
        Route::prefix('webauthn')->group(function () {
            Route::get('/passkeys', [WebAuthnController::class, 'list']);
            Route::post('/register', [WebAuthnController::class, 'beginRegistration']);
            Route::post('/register/complete', [WebAuthnController::class, 'completeRegistration']);
            Route::post('/authenticate', [WebAuthnController::class, 'beginAuthentication']);
            Route::post('/verify', [WebAuthnController::class, 'verifyAssertion']);
            Route::delete('/passkeys/{credentialId}', [WebAuthnController::class, 'revoke']);
        });

        // Identity Verification (Phase 14)
        Route::post('/identity/verify', [IdentityVerificationController::class, 'verify']);

        // Interbank Transfers (Phase 14)
        Route::prefix('interbank')->group(function () {
            Route::post('/name-enquiry', [InterbankTransferController::class, 'nameEnquiry']);
            Route::post('/transfer', [InterbankTransferController::class, 'sendTransfer'])
                ->middleware('mfa');
            Route::get('/transfer/{sessionId}/status', [InterbankTransferController::class, 'queryStatus']);
        });

        // Admin (role-gated)
        Route::middleware('role:administrator,branch_manager,teller,auditor')
            ->prefix('admin')
            ->group(function () {
                Route::get('/stats', [AdminController::class, 'stats']);
                Route::get('/users', [AdminController::class, 'users']);
                Route::get('/audit-logs', [AdminController::class, 'auditLogs']);
                Route::post('/accounts/{id}/activate', [AdminController::class, 'activateAccount']);
                Route::post('/accounts/{id}/close', [AdminController::class, 'closeAccount']);
                Route::get('/loans/pending', [AdminController::class, 'pendingLoans']);
                Route::post('/loans/{id}/approve', [AdminController::class, 'approveLoan']);
                Route::post('/loans/{id}/reject', [AdminController::class, 'rejectLoan']);
                Route::post('/loans/{id}/disburse', [AdminController::class, 'disburseLoan']);
                Route::post('/transactions/{id}/reverse', [AdminController::class, 'reverseTransaction']);
            });
    });
});
