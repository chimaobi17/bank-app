<?php

namespace App\Policies;

use App\Enums\LoanStatus;
use App\Models\Loan;
use App\Models\User;

class LoanPolicy
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

    public function view(User $user, Loan $loan): bool
    {
        if ($this->isStaff($user)) {
            return true;
        }

        return $user->customer_id === $loan->customer_id;
    }

    public function apply(User $user): bool
    {
        return $user->customer_id !== null;
    }

    public function approve(User $user, Loan $loan): bool
    {
        if ($loan->status !== LoanStatus::UNDER_REVIEW) {
            return false;
        }

        return in_array(true, array_map(fn ($r) => $user->hasRole($r), Roles::APPROVERS), true);
    }

    public function reject(User $user, Loan $loan): bool
    {
        return $this->approve($user, $loan);
    }

    public function disburse(User $user, Loan $loan): bool
    {
        return $loan->status === LoanStatus::APPROVED
            && $user->hasRole(Roles::BRANCH_MANAGER);
    }

    public function recordPayment(User $user, Loan $loan): bool
    {
        if ($this->isStaff($user)) {
            return true;
        }

        return $user->customer_id === $loan->customer_id;
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
