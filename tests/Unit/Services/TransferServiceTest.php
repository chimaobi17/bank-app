<?php

namespace Tests\Unit\Services;

use App\Models\Account;
use App\Models\Customer;
use App\Models\User;
use App\Services\TransferService;
use App\ValueObjects\Money;
use App\Enums\AccountStatus;
use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Exceptions\InsufficientFundsException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TransferServiceTest extends TestCase
{
    use RefreshDatabase;

    private TransferService $transferService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->transferService = app(TransferService::class);
    }

    public function test_can_execute_successful_transfer(): void
    {
        // Setup
        $customer1 = Customer::factory()->create();
        $customer2 = Customer::factory()->create();
        
        $source = Account::factory()->create([
            'customer_id' => $customer1->customer_id,
            'balance' => '1000.0000',
            'available_balance' => '1000.0000',
            'status' => AccountStatus::ACTIVE,
            'currency' => 'NGN',
            'daily_transfer_limit' => '100000.0000',
            'per_transaction_limit' => '50000.0000',
        ]);

        $dest = Account::factory()->create([
            'customer_id' => $customer2->customer_id,
            'balance' => '500.0000',
            'available_balance' => '500.0000',
            'status' => AccountStatus::ACTIVE,
            'currency' => 'NGN',
        ]);

        $amount = Money::of('200.0000', 'NGN');

        // Execute
        $transaction = $this->transferService->execute(
            $source->account_number,
            $dest->account_number,
            $amount,
            'Test transfer'
        );

        // Assertions
        $this->assertEquals(TransactionStatus::COMPLETED, $transaction->status);
        $this->assertEquals(TransactionType::TRANSFER, $transaction->type);
        
        $source->refresh();
        $dest->refresh();

        $this->assertEquals('800.0000', (string) $source->balance);
        $this->assertEquals('700.0000', (string) $dest->balance);
        
        $this->assertDatabaseHas('ledger_entries', [
            'transaction_id' => $transaction->transaction_id,
            'account_id' => $source->account_id,
            'direction' => \App\Enums\LedgerDirection::DEBIT->value,
            'amount' => '200.0000',
        ]);
    }

    public function test_cannot_transfer_with_insufficient_funds(): void
    {
        $customer1 = Customer::factory()->create();
        $customer2 = Customer::factory()->create();
        
        $source = Account::factory()->create([
            'customer_id' => $customer1->customer_id,
            'balance' => '100.0000',
            'available_balance' => '100.0000',
            'status' => AccountStatus::ACTIVE,
        ]);

        $dest = Account::factory()->create([
            'customer_id' => $customer2->customer_id,
            'status' => AccountStatus::ACTIVE,
        ]);

        $this->expectException(InsufficientFundsException::class);

        $this->transferService->execute(
            $source->account_number,
            $dest->account_number,
            Money::of('200.0000')
        );
    }
}
