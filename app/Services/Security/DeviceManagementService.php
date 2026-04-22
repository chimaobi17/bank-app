<?php

namespace App\Services\Security;

use App\Models\User;
use App\Models\UserSession;
use Illuminate\Support\Collection;

final class DeviceManagementService
{
    public function registerDevice(User $user, string $device, string $ipAddress, string $userAgent): UserSession
    {
        return UserSession::create([
            'user_id' => $user->user_id,
            'device' => $device,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent,
            'last_seen_at' => now(),
        ]);
    }

    public function touch(UserSession $session): void
    {
        $session->update(['last_seen_at' => now()]);
    }

    public function activeSessions(User $user): Collection
    {
        return UserSession::where('user_id', $user->user_id)
            ->whereNull('revoked_at')
            ->orderByDesc('last_seen_at')
            ->get();
    }

    public function revoke(UserSession $session): void
    {
        $session->revoke();
    }

    public function revokeAllExcept(User $user, int $keepSessionId): int
    {
        return UserSession::where('user_id', $user->user_id)
            ->where('session_id', '!=', $keepSessionId)
            ->whereNull('revoked_at')
            ->update(['revoked_at' => now()]);
    }

    public function isKnownDevice(User $user, string $userAgent): bool
    {
        return UserSession::where('user_id', $user->user_id)
            ->where('user_agent', $userAgent)
            ->whereNull('revoked_at')
            ->exists();
    }
}
