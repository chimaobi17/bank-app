<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\KycStatus;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Http\Responses\ApiResponse;
use App\Models\AuditLog;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
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
            ]);

            return $user;
        });

        $token = $user->createToken($request->input('device_name', 'api'))->plainTextToken;

        return ApiResponse::created([
            'user' => (new UserResource($user->load('customer', 'roles')))->resolve(),
            'token' => $token,
        ], ['message' => 'Registration successful.']);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $user = User::where('username', $validated['identifier'])
            ->orWhere('email', $validated['identifier'])
            ->orWhere('phone', $validated['identifier'])
            ->first();

        if (! $user || ! Hash::check($validated['password'], $user->password)) {
            if ($user) {
                $user->incrementFailedLoginAttempts();
                AuditLog::record('auth.failed', 'User', $user->user_id);
            }
            throw ValidationException::withMessages(['identifier' => ['Invalid credentials.']]);
        }

        if ($user->isLocked()) {
            throw ValidationException::withMessages(['identifier' => ['Account is locked. Try again later.']]);
        }

        if ($user->two_factor_confirmed_at && empty($validated['two_factor_code'])) {
            return ApiResponse::success(
                ['two_factor_required' => true],
                ['message' => 'Two-factor authentication required.'],
                202,
            );
        }

        $user->resetFailedLoginAttempts();

        $token = $user->createToken($validated['device_name'] ?? 'api')->plainTextToken;

        AuditLog::record('auth.login', 'User', $user->user_id, null, [
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
        ]);

        return ApiResponse::success([
            'user' => (new UserResource($user->load('customer', 'roles')))->resolve(),
            'token' => $token,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();
        $request->user()->currentAccessToken()->delete();

        AuditLog::record('auth.logout', 'User', $user->user_id);

        return ApiResponse::success(null, ['message' => 'Logged out successfully.']);
    }

    public function me(Request $request): JsonResponse
    {
        return ApiResponse::success(
            (new UserResource($request->user()->load('customer', 'roles')))->resolve(),
        );
    }
}
