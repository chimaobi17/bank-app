<?php

namespace Database\Factories;

use App\Enums\AccountStatus;
use App\Enums\AccountType;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_number' => (string) fake()->unique()->numberBetween(1000000000, 9999999999),
            'customer_id' => Customer::factory(),
            'account_type' => AccountType::SAVINGS,
            'balance' => '0.0000',
            'available_balance' => '0.0000',
            'currency' => 'NGN',
            'status' => AccountStatus::ACTIVE,
            'opened_at' => now(),
            'daily_transfer_limit' => '1000000.0000',
            'per_transaction_limit' => '500000.0000',
        ];
    }
}
