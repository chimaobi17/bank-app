<?php

namespace App\Domain\User;

final class Customer extends User
{
    public function roleName(): string
    {
        return 'customer';
    }

    public function canPerformTransaction(): bool
    {
        return $this->isActive() && ! $this->isLocked();
    }

    public function canOpenAccount(): bool
    {
        return $this->isActive() && ! $this->isLocked();
    }
}
