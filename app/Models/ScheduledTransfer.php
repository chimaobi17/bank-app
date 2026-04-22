<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScheduledTransfer extends Model
{
    protected $fillable = [
        'user_id', 'source_account_id', 'dest_account_id',
        'external_bank_name', 'external_account_number',
        'amount', 'currency', 'narration', 'frequency',
        'next_run_date', 'end_date', 'is_active', 'last_run_at',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:4',
            'next_run_date' => 'date',
            'end_date' => 'date',
            'is_active' => 'boolean',
            'last_run_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function sourceAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'source_account_id', 'account_id');
    }

    public function destinationAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'dest_account_id', 'account_id');
    }
}
