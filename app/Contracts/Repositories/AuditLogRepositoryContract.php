<?php

namespace App\Contracts\Repositories;

use App\Contracts\Domain\Auditable;
use App\Models\AuditLog;
use App\ValueObjects\DateRange;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface AuditLogRepositoryContract
{
    public function record(Auditable $entity, string $action, ?int $actorId = null, array $context = []): AuditLog;

    public function getForEntity(string $entityType, int|string $entityId): LengthAwarePaginator;

    public function getForActor(int $actorId, ?DateRange $range = null, int $perPage = 20): LengthAwarePaginator;
}
