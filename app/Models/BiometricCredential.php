<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BiometricCredential extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'credential_id';

    protected $fillable = [
        'user_id', 'public_key_handle', 'public_key',
        'device_name', 'attestation_format',
        'registered_at', 'last_used_at', 'revoked_at',
    ];

    protected $hidden = ['public_key'];

    protected function casts(): array
    {
        return [
            'registered_at' => 'datetime',
            'last_used_at' => 'datetime',
            'revoked_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function isRevoked(): bool
    {
        return $this->revoked_at !== null;
    }
}
