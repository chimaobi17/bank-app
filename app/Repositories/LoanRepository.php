<?php

namespace App\Repositories;

use App\Contracts\Repositories\LoanRepositoryContract;
use App\Enums\LoanStatus;
use App\Models\Loan;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class LoanRepository implements LoanRepositoryContract
{
    public function findById(int $id): ?Loan
    {
        return Loan::with('installments')->find($id);
    }

    public function findByCustomer(int $customerId): LengthAwarePaginator
    {
        return Loan::where('customer_id', $customerId)
            ->orderBy('created_at', 'desc')
            ->paginate(10);
    }

    public function create(array $data): Loan
    {
        return Loan::create($data);
    }

    public function save(Loan $loan): void
    {
        $loan->save();
    }

    public function getPendingApprovals(int $perPage = 20): LengthAwarePaginator
    {
        return Loan::whereIn('status', [LoanStatus::SUBMITTED, LoanStatus::UNDER_REVIEW])
            ->with(['customer', 'disbursedAccount'])
            ->orderBy('created_at', 'asc')
            ->paginate($perPage);
    }
}
