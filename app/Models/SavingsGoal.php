<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SavingsGoal extends Model
{
    protected $primaryKey = 'goal_id';

    protected $fillable = [
        'customer_id', 'account_id', 'name',
        'target_amount', 'current_amount', 'currency',
        'target_date', 'status', 'color',
    ];

    protected function casts(): array
    {
        return [
            'target_date' => 'date',
            'target_amount' => 'decimal:4',
            'current_amount' => 'decimal:4',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'account_id', 'account_id');
    }

    public function progressPercentage(): float
    {
        if ((float) $this->target_amount <= 0) {
            return 0.0;
        }

        return min(100.0, round(((float) $this->current_amount / (float) $this->target_amount) * 100, 2));
    }

    public function isAchieved(): bool
    {
        return bccomp((string) $this->current_amount, (string) $this->target_amount, 4) >= 0;
    }
}
