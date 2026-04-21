<?php

namespace App\Models;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Transaction extends Model
{
    use HasFactory;

    protected $primaryKey = 'transaction_id';

    protected $fillable = [
        'reference', 'type', 'amount', 'currency',
        'source_account_id', 'dest_account_id', 'status',
        'narration', 'channel', 'initiated_by',
        'initiated_at', 'posted_at', 'is_reversible',
        'reversed_by_id', 'metadata',
    ];

    protected function casts(): array
    {
        return [
            'type' => TransactionType::class,
            'status' => TransactionStatus::class,
            'amount' => 'decimal:4',
            'initiated_at' => 'datetime',
            'posted_at' => 'datetime',
            'is_reversible' => 'boolean',
            'metadata' => 'array',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (self $transaction) {
            if (! $transaction->reference) {
                $transaction->reference = self::generateReference();
            }
            if (! $transaction->initiated_at) {
                $transaction->initiated_at = now();
            }
        });
    }

    public static function generateReference(): string
    {
        return 'TXN'.date('Ymd').strtoupper(Str::random(10));
    }

    public function sourceAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'source_account_id', 'account_id');
    }

    public function destinationAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'dest_account_id', 'account_id');
    }

    public function initiatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'initiated_by', 'user_id');
    }

    public function ledgerEntries(): HasMany
    {
        return $this->hasMany(LedgerEntry::class, 'transaction_id', 'transaction_id');
    }

    public function reversedBy(): BelongsTo
    {
        return $this->belongsTo(self::class, 'reversed_by_id', 'transaction_id');
    }

    public function isReversible(): bool
    {
        return $this->is_reversible
            && $this->status === TransactionStatus::COMPLETED
            && $this->posted_at->diffInHours(now()) <= 24;
    }

    public function markCompleted(): void
    {
        $this->update([
            'status' => TransactionStatus::COMPLETED,
            'posted_at' => now(),
        ]);
    }

    public function markFailed(): void
    {
        $this->update(['status' => TransactionStatus::FAILED]);
    }
}
