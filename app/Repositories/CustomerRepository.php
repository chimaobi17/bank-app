<?php

namespace App\Repositories;

use App\Contracts\Repositories\CustomerRepositoryContract;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

final class CustomerRepository implements CustomerRepositoryContract
{
    public function findById(int $id): ?Customer
    {
        return Customer::find($id);
    }

    public function findByUserId(int $userId): ?Customer
    {
        $user = User::find($userId);

        return $user ? Customer::find($user->customer_id) : null;
    }

    public function findByEmail(string $email): ?Customer
    {
        return Customer::where('email', $email)->first();
    }

    public function findByGovIdHash(string $hash): ?Customer
    {
        return Customer::where('gov_id_hash', $hash)->first();
    }

    public function create(array $data): Customer
    {
        return Customer::create($data);
    }

    public function update(Customer $customer, array $data): Customer
    {
        $customer->update($data);

        return $customer->fresh();
    }

    public function search(string $term, int $limit = 20): Collection
    {
        $like = '%'.$term.'%';

        return Customer::where('full_name', 'like', $like)
            ->orWhere('email', 'like', $like)
            ->orWhere('phone', 'like', $like)
            ->limit($limit)
            ->get();
    }
}
