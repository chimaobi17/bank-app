<?php

namespace App\Domain\User;

final class Auditor extends User
{
    public function roleName(): string
    {
        return 'auditor';
    }

    public function canAuditSystem(): bool
    {
        return $this->isActive();
    }

    public function canViewFinancialData(): bool
    {
        return $this->isActive();
    }

    public function canPerformTransaction(): bool
    {
        return false;
    }
}
