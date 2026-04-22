<?php

namespace App\Models;

use App\Enums\CardStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Card extends Model
{
    protected $primaryKey = 'card_id';

    protected $fillable = [
        'account_id', 'pan_token', 'masked_pan',
        'card_type', 'brand', 'expiry', 'status',
        'is_virtual', 'online_only', 'pin_hash',
        'daily_limit', 'monthly_limit', 'single_tx_limit',
        'frozen_at', 'pin_set_at', 'pin_failed_attempts',
        'replacement_requested_at', 'replacement_reason',
    ];

    protected $hidden = ['pan_token', 'pin_hash'];

    protected function casts(): array
    {
        return [
            'expiry' => 'date',
            'status' => CardStatus::class,
            'is_virtual' => 'boolean',
            'online_only' => 'boolean',
            'frozen_at' => 'datetime',
            'pin_set_at' => 'datetime',
            'replacement_requested_at' => 'datetime',
            'pan_token' => 'encrypted',
        ];
    }

    public function isFrozen(): bool
    {
        return $this->frozen_at !== null;
    }

    public function hasPin(): bool
    {
        return $this->pin_hash !== null;
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id', 'account_id');
    }
}
