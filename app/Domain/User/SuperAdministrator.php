<?php

namespace App\Domain\User;

final class SuperAdministrator extends Administrator
{
    public function roleName(): string
    {
        return 'super-admin';
    }

    public function canAuditSystem(): bool
    {
        return $this->isActive();
    }
}
