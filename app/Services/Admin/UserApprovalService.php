<?php

namespace App\Services\Admin;

use App\Enums\KycStatus;
use App\Enums\UserStatus;
use App\Models\User;
use App\Services\Kyc\OnboardingEngine;
use InvalidArgumentException;

final class UserApprovalService
{
    public function __construct(
        private readonly OnboardingEngine $onboarding,
    ) {}

    public function approve(User $user, int $approverId): void
    {
        if (! $user->customer) {
            throw new InvalidArgumentException('User has no linked customer record to approve.');
        }

        $this->onboarding->approve($user->customer);

        $user->status = UserStatus::ACTIVE;
        $user->save();
    }

    public function reject(User $user, int $approverId, string $reason): void
    {
        if ($user->customer) {
            $this->onboarding->reject($user->customer, $reason);
        }

        $user->status = UserStatus::SUSPENDED;
        $user->save();
    }

    public function suspend(User $user, int $approverId, string $reason): void
    {
        $user->status = UserStatus::SUSPENDED;
        $user->save();
    }

    public function isPendingApproval(User $user): bool
    {
        return $user->customer?->kyc_status === KycStatus::PENDING;
    }
}
