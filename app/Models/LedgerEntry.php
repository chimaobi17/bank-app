<?php

namespace App\Models;

use App\Enums\LedgerDirection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LedgerEntry extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'entry_id';

    protected $fillable = [
        'transaction_id', 'account_id', 'direction',
        'amount', 'balance_after', 'posted_at',
    ];

    protected function casts(): array
    {
        return [
            'direction' => LedgerDirection::class,
            'amount' => 'decimal:4',
            'balance_after' => 'decimal:4',
            'posted_at' => 'datetime',
        ];
    }

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class, 'transaction_id', 'transaction_id');
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id', 'account_id');
    }
}
