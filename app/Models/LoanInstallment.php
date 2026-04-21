<?php

namespace App\Models;

use App\Enums\InstallmentStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoanInstallment extends Model
{
    protected $primaryKey = 'installment_id';

    protected $fillable = [
        'loan_id', 'sequence', 'due_date', 'principal_due',
        'interest_due', 'total_due', 'paid_amount', 'late_fee',
        'status', 'paid_at',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'date',
            'principal_due' => 'decimal:4',
            'interest_due' => 'decimal:4',
            'total_due' => 'decimal:4',
            'paid_amount' => 'decimal:4',
            'late_fee' => 'decimal:4',
            'status' => InstallmentStatus::class,
            'paid_at' => 'datetime',
        ];
    }

    public function loan(): BelongsTo
    {
        return $this->belongsTo(Loan::class, 'loan_id', 'loan_id');
    }

    public function isOverdue(): bool
    {
        return $this->due_date->isPast()
            && ! in_array($this->status, [InstallmentStatus::PAID]);
    }

    public function remainingAmount(): string
    {
        return bcsub(
            bcadd($this->total_due, $this->late_fee, 4),
            $this->paid_amount,
            4
        );
    }
}
