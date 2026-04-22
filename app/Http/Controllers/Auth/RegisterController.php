<?php

namespace App\Http\Controllers\Auth;

use App\Enums\KycStatus;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\AuditLog;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    public function store(RegisterRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $user = DB::transaction(function () use ($validated) {
            $customer = Customer::create([
                'full_name' => $validated['full_name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'dob' => $validated['dob'],
                'address' => $validated['address'],
                'nationality' => $validated['nationality'],
                'gov_id_hash' => hash('sha256', $validated['gov_id']),
                'gov_id_encrypted' => encrypt($validated['gov_id']),
                'kyc_status' => KycStatus::PENDING,
            ]);

            $user = User::create([
                'username' => $validated['username'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'password' => $validated['password'],
                'customer_id' => $customer->customer_id,
                'status' => UserStatus::ACTIVE,
            ]);

            AuditLog::record('user.registered', 'User', $user->user_id, null, [
                'username' => $user->username,
                'channel' => 'web',
            ]);

            return $user;
        });

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(route('dashboard'));
    }
}
