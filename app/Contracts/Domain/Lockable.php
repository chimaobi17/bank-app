<?php

namespace App\Contracts\Domain;

use DateTimeImmutable;

interface Lockable
{
    public function isLocked(DateTimeImmutable $at): bool;

    public function unlockDate(): DateTimeImmutable;
}
