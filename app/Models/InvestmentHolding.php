<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvestmentHolding extends Model
{
    protected $primaryKey = 'holding_id';

    protected $fillable = [
        'customer_id', 'instrument_id', 'units',
        'avg_cost', 'current_value', 'acquired_at',
    ];

    protected function casts(): array
    {
        return [
            'units' => 'decimal:4',
            'avg_cost' => 'decimal:4',
            'current_value' => 'decimal:4',
            'acquired_at' => 'datetime',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    public function instrument(): BelongsTo
    {
        return $this->belongsTo(InvestmentInstrument::class, 'instrument_id', 'instrument_id');
    }

    public function unrealizedPnl(): string
    {
        return bcsub((string) $this->current_value, bcmul((string) $this->units, (string) $this->avg_cost, 4), 4);
    }
}
