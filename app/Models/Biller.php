<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Biller extends Model
{
    protected $primaryKey = 'biller_id';

    protected $fillable = ['name', 'code', 'category', 'logo_path', 'is_active'];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'biller_id', 'biller_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
