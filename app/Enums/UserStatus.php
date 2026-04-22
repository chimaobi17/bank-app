<?php

namespace App\Enums;

enum UserStatus: string
{
    case ACTIVE = 'active';
    case LOCKED = 'locked';
    case SUSPENDED = 'suspended';
    case DEACTIVATED = 'deactivated';
}
