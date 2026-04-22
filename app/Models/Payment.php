<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    protected $primaryKey = 'payment_id';

    protected $fillable = [
        'customer_id', 'account_id', 'biller_id', 'payment_type',
        'amount', 'currency', 'status', 'recipient_identifier',
        'narration', 'transaction_id', 'scheduled_for',
        'frequency', 'is_recurring',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:4',
            'status' => PaymentStatus::class,
            'scheduled_for' => 'datetime',
            'is_recurring' => 'boolean',
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

    public function biller(): BelongsTo
    {
        return $this->belongsTo(Biller::class, 'biller_id', 'biller_id');
    }

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class, 'transaction_id', 'transaction_id');
    }
}
