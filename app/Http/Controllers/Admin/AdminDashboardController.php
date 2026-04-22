<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Loan;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'users_total' => User::count(),
                'accounts_total' => Account::count(),
                'accounts_pending' => Account::where('status', 'pending')->count(),
                'transactions_today' => Transaction::whereDate('posted_at', today())->count(),
                'transaction_volume_today' => (string) Transaction::whereDate('posted_at', today())->sum('amount'),
                'loans_pending' => Loan::where('status', 'submitted')->count(),
                'loans_approved' => Loan::where('status', 'approved')->count(),
                'loans_disbursed' => Loan::where('status', 'disbursed')->count(),
            ],
        ]);
    }
}
