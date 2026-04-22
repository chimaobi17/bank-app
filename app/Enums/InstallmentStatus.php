<?php

namespace App\Enums;

enum InstallmentStatus: string
{
    case UPCOMING = 'upcoming';
    case DUE = 'due';
    case PAID = 'paid';
    case OVERDUE = 'overdue';
    case PARTIALLY_PAID = 'partially_paid';
}
