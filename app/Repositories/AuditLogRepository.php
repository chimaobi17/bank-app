<?php

namespace App\Repositories;

use App\Contracts\Domain\Auditable;
use App\Contracts\Repositories\AuditLogRepositoryContract;
use App\Models\AuditLog;
use App\ValueObjects\DateRange;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class AuditLogRepository implements AuditLogRepositoryContract
{
    public function record(Auditable $entity, string $action, ?int $actorId = null, array $context = []): AuditLog
    {
        return AuditLog::create([
            'actor_user_id' => $actorId ?? auth()->id(),
            'action' => $action,
            'entity_type' => $entity->auditEntityType(),
            'entity_id' => $entity->auditEntityId(),
            'after_state' => array_merge($entity->auditSnapshot(), $context),
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }

    public function getForEntity(string $entityType, int|string $entityId): LengthAwarePaginator
    {
        return AuditLog::where('entity_type', $entityType)
            ->where('entity_id', $entityId)
            ->orderByDesc('created_at')
            ->paginate(20);
    }

    public function getForActor(int $actorId, ?DateRange $range = null, int $perPage = 20): LengthAwarePaginator
    {
        $query = AuditLog::where('actor_user_id', $actorId);

        if ($range !== null) {
            $query->whereBetween('created_at', [$range->start(), $range->end()]);
        }

        return $query->orderByDesc('created_at')->paginate($perPage);
    }
}
