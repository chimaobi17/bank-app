<?php

namespace App\Domain\User;

class Administrator extends User
{
    public function roleName(): string
    {
        return 'administrator';
    }

    public function canManageSystem(): bool
    {
        return $this->isActive();
    }

    public function canApproveLoan(): bool
    {
        return $this->isActive();
    }

    public function canReverseTransaction(): bool
    {
        return $this->isActive();
    }

    public function canPerformTransaction(): bool
    {
        return false;
    }
}
