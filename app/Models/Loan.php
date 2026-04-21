<?php

namespace App\Models;

use App\Enums\LoanProduct;
use App\Enums\LoanStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Loan extends Model
{
    use HasFactory;

    protected $primaryKey = 'loan_id';

    protected $fillable = [
        'customer_id', 'product', 'principal', 'interest_rate',
        'tenor_months', 'status', 'purpose', 'monthly_income',
        'collateral_doc_path', 'income_proof_path',
        'approved_by', 'approved_at', 'disbursed_account_id',
        'disbursed_at', 'outstanding_balance', 'total_interest',
        'total_paid', 'late_fee_rate', 'closed_at',
    ];

    protected function casts(): array
    {
        return [
            'product' => LoanProduct::class,
            'status' => LoanStatus::class,
            'principal' => 'decimal:4',
            'interest_rate' => 'decimal:4',
            'outstanding_balance' => 'decimal:4',
            'total_interest' => 'decimal:4',
            'total_paid' => 'decimal:4',
            'monthly_income' => 'decimal:4',
            'late_fee_rate' => 'decimal:4',
            'approved_at' => 'datetime',
            'disbursed_at' => 'datetime',
            'closed_at' => 'datetime',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by', 'user_id');
    }

    public function disbursedAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'disbursed_account_id', 'account_id');
    }

    public function installments(): HasMany
    {
        return $this->hasMany(LoanInstallment::class, 'loan_id', 'loan_id')
            ->orderBy('sequence');
    }

    public function calculateEmi(): string
    {
        $r = bcdiv($this->interest_rate, '12', 8);
        $n = $this->tenor_months;

        if (bccomp($r, '0', 8) === 0) {
            return bcdiv($this->principal, (string) $n, 4);
        }

        $rPlusOne = bcadd('1', $r, 8);
        $power = bcpow($rPlusOne, (string) $n, 8);
        $numerator = bcmul($this->principal, bcmul($r, $power, 8), 8);
        $denominator = bcsub($power, '1', 8);

        return bcdiv($numerator, $denominator, 4);
    }

    public function generateAmortizationSchedule(): array
    {
        $schedule = [];
        $emi = $this->calculateEmi();
        $balance = $this->principal;
        $monthlyRate = bcdiv($this->interest_rate, '12', 8);

        for ($i = 1; $i <= $this->tenor_months; $i++) {
            $interest = bcmul($balance, $monthlyRate, 4);
            $principal = bcsub($emi, $interest, 4);

            if ($i === $this->tenor_months) {
                $principal = $balance;
                $emi = bcadd($principal, $interest, 4);
            }

            $balance = bcsub($balance, $principal, 4);

            $schedule[] = [
                'sequence' => $i,
                'due_date' => now()->addMonths($i)->toDateString(),
                'principal_due' => $principal,
                'interest_due' => $interest,
                'total_due' => bcadd($principal, $interest, 4),
                'balance_after' => max('0', $balance),
            ];
        }

        return $schedule;
    }
}
