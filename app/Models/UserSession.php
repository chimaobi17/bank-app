<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSession extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'session_id';

    protected $fillable = [
        'user_id', 'device', 'ip_address',
        'user_agent', 'last_seen_at', 'revoked_at',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'last_seen_at' => 'datetime',
            'revoked_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function revoke(): void
    {
        $this->update(['revoked_at' => now()]);
    }

    public function isActive(): bool
    {
        return is_null($this->revoked_at);
    }
}
