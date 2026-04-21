<?php

namespace App\Contracts\Domain;

interface Reversible
{
    public function isReversible(): bool;

    public function reversalWindowHours(): int;
}
