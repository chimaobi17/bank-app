<?php

namespace App\Repositories;

use App\Contracts\Repositories\TransactionRepositoryContract;
use App\Models\Transaction;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class TransactionRepository implements TransactionRepositoryContract
{
    public function findById(int $id): ?Transaction
    {
        return Transaction::find($id);
    }

    public function findByReference(string $reference): ?Transaction
    {
        return Transaction::where('reference', $reference)->first();
    }

    public function create(array $data): Transaction
    {
        return Transaction::create($data);
    }

    public function getByAccount(int $accountId, array $filters = [], int $perPage = 20): LengthAwarePaginator
    {
        $query = Transaction::where(function ($q) use ($accountId) {
            $q->where('source_account_id', $accountId)
                ->orWhere('dest_account_id', $accountId);
        });

        if (! empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }
        if (! empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (! empty($filters['date_from'])) {
            $query->whereDate('initiated_at', '>=', $filters['date_from']);
        }
        if (! empty($filters['date_to'])) {
            $query->whereDate('initiated_at', '<=', $filters['date_to']);
        }
        if (! empty($filters['amount_min'])) {
            $query->where('amount', '>=', $filters['amount_min']);
        }
        if (! empty($filters['amount_max'])) {
            $query->where('amount', '<=', $filters['amount_max']);
        }
        if (! empty($filters['search'])) {
            $query->where('narration', 'like', '%'.$filters['search'].'%');
        }

        return $query->orderBy('initiated_at', 'desc')->paginate($perPage);
    }
}
