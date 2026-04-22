<?php

namespace App\Models;

use App\Concerns\HasSearchableHashes;
use App\Enums\KycStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Customer extends Model
{
    use HasFactory, HasSearchableHashes;

    protected $primaryKey = 'customer_id';

    /**
     * Searchable hash mappings — enables exact-match querying
     * on encrypted columns via HMAC-SHA256 hash columns.
     */
    protected array $searchableHashes = [
        'phone' => 'phone_hash',
    ];

    protected $fillable = [
        'full_name',
        'dob',
        'nationality',
        'gov_id_hash',
        'gov_id_encrypted',
        'email',
        'phone',
        'address',
        'kyc_status',
        'kyc_doc_id_path',
        'kyc_doc_address_path',
        'kyc_verified_at',
    ];

    protected $hidden = [
        'gov_id_hash',
        'gov_id_encrypted',
    ];

    protected function casts(): array
    {
        return [
            'dob' => 'date',
            'kyc_status' => KycStatus::class,
            'kyc_verified_at' => 'datetime',
            'gov_id_encrypted' => 'encrypted',
            'phone' => 'encrypted',
            'address' => 'encrypted',
        ];
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'customer_id', 'customer_id');
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class, 'customer_id', 'customer_id');
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class, 'customer_id', 'customer_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'customer_id', 'customer_id');
    }

    public function isKycVerified(): bool
    {
        return $this->kyc_status === KycStatus::VERIFIED;
    }
}
