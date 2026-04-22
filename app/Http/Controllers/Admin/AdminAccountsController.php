<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Services\AccountService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminAccountsController extends Controller
{
    public function __construct(
        private AccountService $accounts,
    ) {}

    public function index(Request $request): Response
    {
        $query = Account::with('customer')->latest();

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->query('search')) {
            $query->where('account_number', 'like', "%{$search}%");
        }

        $accounts = $query->paginate(25)->through(fn ($a) => [
            'account_id' => $a->account_id,
            'account_number' => $a->account_number,
            'account_type' => $a->account_type->value,
            'balance' => $a->balance,
            'status' => $a->status->value,
            'customer_name' => $a->customer?->full_name,
            'opened_at' => $a->opened_at?->toIso8601String(),
        ]);

        return Inertia::render('admin/accounts/index', [
            'accounts' => $accounts,
            'filters' => ['status' => $status, 'search' => $search],
        ]);
    }

    public function activate(int $id): RedirectResponse
    {
        $account = Account::findOrFail($id);
        $this->accounts->activateAccount($account);

        return back()->with('success', 'Account activated.');
    }

    public function close(int $id): RedirectResponse
    {
        $account = Account::findOrFail($id);
        $this->accounts->closeAccount($account);

        return back()->with('success', 'Account closed.');
    }
}
