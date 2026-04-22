<?php

namespace App\Enums;

enum AccountStatus: string
{
    case PENDING = 'pending';
    case ACTIVE = 'active';
    case DORMANT = 'dormant';
    case FROZEN = 'frozen';
    case CLOSED = 'closed';

    public function canTransitionTo(self $target): bool
    {
        return match ($this) {
            self::PENDING => $target === self::ACTIVE,
            self::ACTIVE => in_array($target, [self::DORMANT, self::FROZEN, self::CLOSED]),
            self::DORMANT => in_array($target, [self::ACTIVE, self::CLOSED]),
            self::FROZEN => in_array($target, [self::ACTIVE, self::CLOSED]),
            self::CLOSED => false,
        };
    }
}
