<?php

namespace App\Contracts\Repositories;

use App\Models\Loan;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface LoanRepositoryContract
{
    public function findById(int $id): ?Loan;

    public function findByCustomer(int $customerId): LengthAwarePaginator;

    public function create(array $data): Loan;

    public function save(Loan $loan): void;

    public function getPendingApprovals(int $perPage = 20): LengthAwarePaginator;
}
