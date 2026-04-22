<?php

namespace App\Policies;

use App\Models\AuditLog;
use App\Models\User;

class AuditLogPolicy
{
    public function before(User $user, string $ability): ?bool
    {
        if ($user->hasRole(Roles::ADMINISTRATOR)) {
            return true;
        }

        return null;
    }

    public function viewAny(User $user): bool
    {
        return $user->hasRole(Roles::AUDITOR) || $user->hasRole(Roles::BRANCH_MANAGER);
    }

    public function view(User $user, AuditLog $log): bool
    {
        return $this->viewAny($user);
    }

    public function export(User $user): bool
    {
        return $user->hasRole(Roles::AUDITOR);
    }

    public function create(): bool
    {
        return false;
    }

    public function update(): bool
    {
        return false;
    }

    public function delete(): bool
    {
        return false;
    }
}
