<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    protected $primaryKey = 'branch_id';

    protected $fillable = [
        'branch_code', 'name', 'address', 'city', 'state',
        'latitude', 'longitude', 'phone', 'manager_user_id',
        'operating_hours', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:7',
            'longitude' => 'decimal:7',
            'is_active' => 'boolean',
        ];
    }

    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_user_id', 'user_id');
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class, 'branch_id', 'branch_id');
    }
}
