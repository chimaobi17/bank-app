<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\AuditLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    public function show(Request $request): UserResource
    {
        return new UserResource($request->user()->load('customer', 'roles'));
    }

    public function update(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'phone' => 'sometimes|string|max:20',
            'address' => 'sometimes|string|max:255',
        ]);

        $user = $request->user();

        if (isset($validated['phone'])) {
            $user->update(['phone' => $validated['phone']]);
        }

        if ($user->customer && isset($validated['address'])) {
            $user->customer->update(['address' => $validated['address']]);
        }

        AuditLog::record('profile.updated', 'User', $user->user_id);

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => new UserResource($user->fresh()->load('customer')),
        ]);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'current_password' => 'required|string',
            'password' => ['required', 'confirmed', Password::min(8)->mixedCase()->numbers()->symbols()],
        ]);

        $user = $request->user();

        if (! Hash::check($validated['current_password'], $user->password)) {
            throw ValidationException::withMessages(['current_password' => ['Current password is incorrect.']]);
        }

        $user->update(['password' => $validated['password']]);

        AuditLog::record('profile.password_changed', 'User', $user->user_id);

        return response()->json(['message' => 'Password changed successfully.']);
    }
}
