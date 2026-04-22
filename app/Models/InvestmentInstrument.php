<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvestmentInstrument extends Model
{
    protected $primaryKey = 'instrument_id';

    protected $fillable = [
        'symbol', 'name', 'category',
        'unit_price', 'currency', 'yield_rate',
        'maturity_date', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'unit_price' => 'decimal:4',
            'yield_rate' => 'decimal:4',
            'maturity_date' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function holdings(): HasMany
    {
        return $this->hasMany(InvestmentHolding::class, 'instrument_id', 'instrument_id');
    }
}
