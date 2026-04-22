<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\AccountResource;
use App\Http\Resources\LoanResource;
use App\Http\Resources\UserResource;
use App\Models\Account;
use App\Models\AuditLog;
use App\Models\Loan;
use App\Models\Transaction;
use App\Models\User;
use App\Services\AccountService;
use App\Services\LoanService;
use App\Services\TransferService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminController extends Controller
{
    public function __construct(
        private AccountService $accountService,
        private LoanService $loanService,
        private TransferService $transferService,
    ) {}

    public function stats(): JsonResponse
    {
        return response()->json([
            'users_total' => User::count(),
            'accounts_total' => Account::count(),
            'accounts_pending' => Account::whereIn('status', ['pending'])->count(),
            'transactions_today' => Transaction::whereDate('posted_at', today())->count(),
            'transaction_volume_today' => (string) Transaction::whereDate('posted_at', today())->sum('amount'),
            'loans_pending' => Loan::where('status', 'submitted')->count(),
            'loans_approved' => Loan::where('status', 'approved')->count(),
        ]);
    }

    public function users(Request $request): AnonymousResourceCollection
    {
        $q = User::with('customer', 'roles');

        if ($search = $request->query('search')) {
            $q->where(function ($w) use ($search) {
                $w->where('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return UserResource::collection($q->latest()->paginate(25));
    }

    public function activateAccount(int $accountId): JsonResponse
    {
        $account = Account::findOrFail($accountId);
        $this->accountService->activateAccount($account);

        return response()->json([
            'message' => 'Account activated.',
            'account' => new AccountResource($account->fresh()),
        ]);
    }

    public function closeAccount(int $accountId): JsonResponse
    {
        $account = Account::findOrFail($accountId);
        $this->accountService->closeAccount($account);

        return response()->json([
            'message' => 'Account closed.',
            'account' => new AccountResource($account->fresh()),
        ]);
    }

    public function pendingLoans(): AnonymousResourceCollection
    {
        return LoanResource::collection(
            Loan::with('customer')->where('status', 'submitted')->latest()->paginate(20)
        );
    }

    public function approveLoan(Request $request, int $loanId): JsonResponse
    {
        $loan = Loan::findOrFail($loanId);
        $this->loanService->approve($loan, $request->user()->user_id);

        return response()->json([
            'message' => 'Loan approved.',
            'loan' => new LoanResource($loan->fresh('installments')),
        ]);
    }

    public function rejectLoan(Request $request, int $loanId): JsonResponse
    {
        $loan = Loan::findOrFail($loanId);
        $this->loanService->reject($loan, $request->user()->user_id);

        return response()->json([
            'message' => 'Loan rejected.',
            'loan' => new LoanResource($loan->fresh()),
        ]);
    }

    public function disburseLoan(int $loanId): JsonResponse
    {
        $loan = Loan::findOrFail($loanId);
        $this->loanService->disburse($loan);

        return response()->json([
            'message' => 'Loan disbursed.',
            'loan' => new LoanResource($loan->fresh()),
        ]);
    }

    public function reverseTransaction(Request $request, int $transactionId): JsonResponse
    {
        $transaction = Transaction::findOrFail($transactionId);
        $reversal = $this->transferService->reverseTransaction($transaction, $request->user()->user_id);

        return response()->json([
            'message' => 'Transaction reversed.',
            'reversal' => $reversal->transaction_id,
        ]);
    }

    public function auditLogs(Request $request): JsonResponse
    {
        $query = AuditLog::with('actor')->latest();

        if ($entity = $request->query('entity')) {
            $query->where('entity_type', $entity);
        }

        if ($actor = $request->query('actor_user_id')) {
            $query->where('actor_user_id', $actor);
        }

        return response()->json($query->paginate(50));
    }
}
