<?php

namespace App\Contracts\Repositories;

use App\Models\Transaction;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface TransactionRepositoryContract
{
    public function findById(int $id): ?Transaction;

    public function findByReference(string $reference): ?Transaction;

    public function create(array $data): Transaction;

    /**
     * Build an unsaved Transaction with Oracle-safe attribute hydration
     * (CLOB fields, JSON casts, enum coercion). Callers — typically
     * domain `execute()` methods — hand the returned model to the
     * processor for atomic persistence.
     */
    public function build(array $data): Transaction;

    public function getByAccount(int $accountId, array $filters = [], int $perPage = 20): LengthAwarePaginator;
}
