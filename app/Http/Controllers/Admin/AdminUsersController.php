<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminUsersController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::with('customer', 'roles')->latest();

        if ($search = $request->query('search')) {
            $query->where(function ($w) use ($search) {
                $w->where('username', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->paginate(25)->through(fn ($u) => [
            'user_id' => $u->user_id,
            'username' => $u->username,
            'email' => $u->email,
            'phone' => $u->phone,
            'status' => $u->status?->value,
            'customer_name' => $u->customer?->full_name,
            'kyc_status' => $u->customer?->kyc_status?->value,
            'roles' => $u->roles->pluck('role_name')->toArray(),
            'created_at' => $u->created_at->toIso8601String(),
        ]);

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'filters' => ['search' => $search],
        ]);
    }
}
