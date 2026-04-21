<?php

namespace App\Policies;

use App\Models\Transaction;
use App\Models\User;

class TransactionPolicy
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
        return $user->customer_id !== null || $this->isStaff($user);
    }

    public function view(User $user, Transaction $transaction): bool
    {
        if ($this->isStaff($user)) {
            return true;
        }

        $customerId = $user->customer_id;
        if (! $customerId) {
            return false;
        }

        return ($transaction->sourceAccount?->customer_id === $customerId)
            || ($transaction->destAccount?->customer_id === $customerId);
    }

    public function reverse(User $user, Transaction $transaction): bool
    {
        if (! $transaction->is_reversible) {
            return false;
        }

        return $user->hasRole(Roles::BRANCH_MANAGER);
    }

    public function export(User $user): bool
    {
        return $user->hasRole(Roles::AUDITOR) || $user->hasRole(Roles::BRANCH_MANAGER);
    }

    private function isStaff(User $user): bool
    {
        foreach (Roles::STAFF_ROLES as $role) {
            if ($user->hasRole($role)) {
                return true;
            }
        }

        return false;
    }
}
