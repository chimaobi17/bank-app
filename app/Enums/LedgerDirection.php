<?php

namespace App\Enums;

enum LedgerDirection: string
{
    case DEBIT = 'DR';
    case CREDIT = 'CR';
}
