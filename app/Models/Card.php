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
    ];

    protected $hidden = ['pan_token'];

    protected function casts(): array
    {
        return [
            'expiry' => 'date',
            'status' => CardStatus::class,
        ];
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id', 'account_id');
    }
}
