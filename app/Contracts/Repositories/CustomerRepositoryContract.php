<?php

namespace App\Contracts\Repositories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Collection;

interface CustomerRepositoryContract
{
    public function findById(int $id): ?Customer;

    public function findByUserId(int $userId): ?Customer;

    public function findByEmail(string $email): ?Customer;

    public function findByGovIdHash(string $hash): ?Customer;

    public function create(array $data): Customer;

    public function update(Customer $customer, array $data): Customer;

    public function search(string $term, int $limit = 20): Collection;
}
