<?php

namespace App\Models;

use App\Enums\AccountStatus;
use App\Enums\AccountType;
use App\Exceptions\AccountNotActiveException;
use App\Exceptions\InsufficientFundsException;
use App\Exceptions\InvalidStateTransitionException;
use App\ValueObjects\Money;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    use HasFactory;

    protected $primaryKey = 'account_id';

    protected $fillable = [
        'account_number', 'customer_id', 'account_type', 'balance',
        'available_balance', 'currency', 'status', 'branch_id',
        'interest_rate', 'daily_transfer_limit', 'per_transaction_limit',
        'opened_at', 'closed_at', 'lock_in_months', 'maturity_date',
        'early_liquidation_penalty', 'overdraft_limit',
    ];

    protected function casts(): array
    {
        return [
            'account_type' => AccountType::class,
            'status' => AccountStatus::class,
            'balance' => 'decimal:4',
            'available_balance' => 'decimal:4',
            'interest_rate' => 'decimal:4',
            'daily_transfer_limit' => 'decimal:4',
            'per_transaction_limit' => 'decimal:4',
            'overdraft_limit' => 'decimal:4',
            'early_liquidation_penalty' => 'decimal:4',
            'opened_at' => 'datetime',
            'closed_at' => 'datetime',
            'maturity_date' => 'datetime',
        ];
    }

    // ── Relationships ──

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'branch_id');
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'source_account_id', 'account_id');
    }

    public function incomingTransactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'dest_account_id', 'account_id');
    }

    public function ledgerEntries(): HasMany
    {
        return $this->hasMany(LedgerEntry::class, 'account_id', 'account_id');
    }

    public function cards(): HasMany
    {
        return $this->hasMany(Card::class, 'account_id', 'account_id');
    }

    // ── Domain Methods (Encapsulation) ──

    public function deposit(Money $amount): void
    {
        $this->guardActive();
        $this->balance = bcadd($this->balance, $amount->getAmount(), 4);
        $this->available_balance = bcadd($this->available_balance, $amount->getAmount(), 4);
    }

    public function withdraw(Money $amount): void
    {
        $this->guardActive();

        if (bccomp($this->available_balance, $amount->getAmount(), 4) < 0) {
            throw new InsufficientFundsException;
        }

        $this->balance = bcsub($this->balance, $amount->getAmount(), 4);
        $this->available_balance = bcsub($this->available_balance, $amount->getAmount(), 4);
    }

    public function transitionTo(AccountStatus $newStatus): void
    {
        if (! $this->status->canTransitionTo($newStatus)) {
            throw new InvalidStateTransitionException(
                $this->status->value,
                $newStatus->value,
                'Account'
            );
        }

        $this->status = $newStatus;
    }

    public function getBalance(): Money
    {
        return Money::of($this->balance, $this->currency);
    }

    public function getAvailableBalance(): Money
    {
        return Money::of($this->available_balance, $this->currency);
    }

    public function isActive(): bool
    {
        return $this->status === AccountStatus::ACTIVE;
    }

    // ── Inheritance-like type-specific behavior via account_type ──

    public function accrueInterest(): Money
    {
        if ($this->account_type !== AccountType::SAVINGS || ! $this->interest_rate) {
            return Money::zero($this->currency);
        }

        $monthlyRate = bcdiv($this->interest_rate, '12', 8);
        $interest = bcmul($this->balance, $monthlyRate, 4);

        return Money::of($interest, $this->currency);
    }

    public function getOverdraftLimit(): Money
    {
        if ($this->account_type !== AccountType::CHECKING) {
            return Money::zero($this->currency);
        }

        return Money::of($this->overdraft_limit ?? '0', $this->currency);
    }

    public function isMatured(): bool
    {
        if ($this->account_type !== AccountType::FIXED_DEPOSIT) {
            return false;
        }

        return $this->maturity_date && $this->maturity_date->isPast();
    }

    private function guardActive(): void
    {
        if ($this->status !== AccountStatus::ACTIVE) {
            throw new AccountNotActiveException;
        }
    }
}
