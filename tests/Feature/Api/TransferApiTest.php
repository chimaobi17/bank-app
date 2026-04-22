<?php

use App\Enums\AccountStatus;
use App\Models\Account;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('rejects unauthenticated transfer attempts', function () {
    $response = $this->postJson('/api/v1/transfers', []);
    $response->assertStatus(401);
});

it('executes a valid transfer via API', function () {
    $customer1 = Customer::factory()->create();
    $customer2 = Customer::factory()->create();
    $user = User::factory()->create(['customer_id' => $customer1->customer_id]);

    $source = Account::factory()->create([
        'customer_id' => $customer1->customer_id,
        'balance' => '1000.0000',
        'available_balance' => '1000.0000',
        'status' => AccountStatus::ACTIVE,
    ]);

    $dest = Account::factory()->create([
        'customer_id' => $customer2->customer_id,
        'status' => AccountStatus::ACTIVE,
    ]);

    Sanctum::actingAs($user);

    $response = $this->postJson('/api/v1/transfers', [
        'from_account_number' => $source->account_number,
        'to_account_number' => $dest->account_number,
        'amount' => '100.00',
        'narration' => 'Test transfer',
    ]);

    $response->assertOk()
        ->assertJsonStructure(['message', 'transaction' => ['transaction_id', 'reference']]);
});

it('validates transfer payload', function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $response = $this->postJson('/api/v1/transfers', [
        'amount' => '-10',
    ]);

    $response->assertStatus(422);
});
