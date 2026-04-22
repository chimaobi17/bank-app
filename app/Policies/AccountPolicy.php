<?php

namespace App\Policies;

use App\Models\Account;
use App\Models\User;

class AccountPolicy
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
        return $this->isStaff($user) || $user->customer_id !== null;
    }

    public function view(User $user, Account $account): bool
    {
        if ($this->isStaff($user)) {
            return true;
        }

        return $user->customer_id === $account->customer_id;
    }

    public function create(User $user): bool
    {
        return $this->isStaff($user);
    }

    public function update(User $user, Account $account): bool
    {
        return $user->hasRole(Roles::BRANCH_MANAGER) || $user->hasRole(Roles::TELLER);
    }

    public function close(User $user, Account $account): bool
    {
        return $user->hasRole(Roles::BRANCH_MANAGER);
    }

    public function freeze(User $user, Account $account): bool
    {
        return $user->hasRole(Roles::BRANCH_MANAGER) || $user->hasRole(Roles::TELLER);
    }

    public function transact(User $user, Account $account): bool
    {
        return $user->customer_id === $account->customer_id;
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
