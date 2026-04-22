<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => fake()->name(),
            'dob' => fake()->date('Y-m-d', '-18 years'),
            'nationality' => 'Nigerian',
            'gov_id_hash' => fake()->sha256(),
            'gov_id_encrypted' => null,
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->unique()->phoneNumber(),
            'address' => fake()->address(),
            'kyc_status' => 'verified',
            'kyc_verified_at' => now(),
        ];
    }
}
