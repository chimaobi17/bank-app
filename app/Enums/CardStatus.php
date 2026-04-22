<?php

namespace App\Enums;

enum CardStatus: string
{
    case ACTIVE = 'active';
    case BLOCKED = 'blocked';
    case EXPIRED = 'expired';
    case CANCELLED = 'cancelled';
}
