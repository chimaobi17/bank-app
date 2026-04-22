<?php

namespace App\Concerns;

/**
 * Phase 16.1 — Searchable Hash Trait
 *
 * When a model uses `encrypted` casts for PII columns, those columns
 * cannot be queried with WHERE clauses. This trait maintains a SHA-256
 * hash column alongside the encrypted value, enabling exact-match lookups.
 *
 * Usage:
 *   - Model: use HasSearchableHashes;
 *   - Define: protected array $searchableHashes = ['phone' => 'phone_hash'];
 *   - The trait auto-populates `phone_hash` on save.
 *   - Query: Customer::whereHash('phone', $rawValue)->first();
 */
trait HasSearchableHashes
{
    /**
     * Boot the trait — register a saving observer to auto-hash.
     */
    public static function bootHasSearchableHashes(): void
    {
        static::saving(function ($model) {
            foreach ($model->getSearchableHashes() as $attribute => $hashColumn) {
                if ($model->isDirty($attribute) && $model->{$attribute} !== null) {
                    $model->{$hashColumn} = self::computeSearchHash($model->{$attribute});
                }
            }
        });
    }

    /**
     * Get the searchable hash mappings.
     *
     * Override in the model: ['source_attr' => 'hash_column']
     */
    public function getSearchableHashes(): array
    {
        return property_exists($this, 'searchableHashes')
            ? $this->searchableHashes
            : [];
    }

    /**
     * Scope: find by hashed value.
     *
     *   Customer::whereHash('phone', '+2348012345678')->first()
     */
    public function scopeWhereHash($query, string $attribute, string $rawValue)
    {
        $hashes = $this->getSearchableHashes();
        $hashColumn = $hashes[$attribute] ?? "{$attribute}_hash";

        return $query->where($hashColumn, self::computeSearchHash($rawValue));
    }

    /**
     * Compute a deterministic search hash using HMAC-SHA256.
     * HMAC uses APP_KEY so hashes are application-specific.
     */
    public static function computeSearchHash(string $value): string
    {
        $key = config('app.key');

        return hash_hmac('sha256', mb_strtolower(trim($value)), $key);
    }
}
