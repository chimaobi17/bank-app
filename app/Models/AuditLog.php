<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditLog extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'log_id';

    protected $fillable = [
        'actor_user_id', 'action', 'entity_type',
        'entity_id', 'before_state', 'after_state',
        'ip_address', 'user_agent',
    ];

    protected function casts(): array
    {
        return [
            'before_state' => 'array',
            'after_state' => 'array',
            'created_at' => 'datetime',
        ];
    }

    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_user_id', 'user_id');
    }

    public static function record(
        string $action,
        string $entityType,
        ?int $entityId = null,
        ?array $before = null,
        ?array $after = null,
    ): self {
        return self::create([
            'actor_user_id' => auth()->id(),
            'action' => $action,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'before_state' => $before,
            'after_state' => $after,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}
