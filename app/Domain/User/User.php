<?php

namespace App\Domain\User;

use App\Contracts\Domain\Auditable;
use App\Enums\UserStatus;
use App\Models\User as UserModel;
use RuntimeException;

abstract class User implements Auditable
{
    public function __construct(protected UserModel $model) {}

    abstract public function roleName(): string;

    public function id(): int
    {
        return $this->model->user_id;
    }

    public function username(): string
    {
        return $this->model->username;
    }

    public function email(): string
    {
        return $this->model->email;
    }

    public function status(): UserStatus
    {
        return $this->model->status;
    }

    public function isActive(): bool
    {
        return $this->model->status === UserStatus::ACTIVE;
    }

    public function isLocked(): bool
    {
        return $this->model->isLocked();
    }

    public function model(): UserModel
    {
        return $this->model;
    }

    /**
     * Requirements Section 10: System Integrity.
     * Each object is responsible for its own valid state. Call before any
     * behavior that requires an authenticated, healthy principal.
     */
    public function guardAuthorized(): void
    {
        if (! $this->isActive()) {
            throw new RuntimeException('User is not active.');
        }

        if ($this->isLocked()) {
            throw new RuntimeException('User account is locked.');
        }
    }

    /* ── Role-contextual capabilities (polymorphic — overridden per role) ── */

    public function canPerformTransaction(): bool
    {
        return false;
    }

    public function canOpenAccount(): bool
    {
        return false;
    }

    public function canApproveLoan(): bool
    {
        return false;
    }

    public function canReverseTransaction(): bool
    {
        return false;
    }

    public function canAuditSystem(): bool
    {
        return false;
    }

    public function canManageSystem(): bool
    {
        return false;
    }

    public function canViewFinancialData(): bool
    {
        return $this->isActive();
    }

    /* ── Auditable ── */

    public function auditEntityType(): string
    {
        return 'User';
    }

    public function auditEntityId(): int|string
    {
        return $this->model->user_id;
    }

    public function auditSnapshot(): array
    {
        return [
            'username' => $this->model->username,
            'email' => $this->model->email,
            'status' => $this->model->status->value,
            'role' => $this->roleName(),
        ];
    }
}
