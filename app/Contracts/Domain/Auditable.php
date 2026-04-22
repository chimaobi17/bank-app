<?php

namespace App\Contracts\Domain;

interface Auditable
{
    public function auditEntityType(): string;

    public function auditEntityId(): int|string;

    public function auditSnapshot(): array;
}
