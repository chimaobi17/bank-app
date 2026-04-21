<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id('account_id');
            $table->string('account_number', 10)->unique();
            $table->foreignId('customer_id')->constrained('customers', 'customer_id');
            $table->string('account_type', 20);
            $table->decimal('balance', 19, 4)->default(0);
            $table->decimal('available_balance', 19, 4)->default(0);
            $table->string('currency', 3)->default('NGN');
            $table->string('status', 20)->default('pending');
            $table->foreignId('branch_id')->nullable()->constrained('branches', 'branch_id');
            $table->decimal('interest_rate', 5, 4)->nullable();
            $table->decimal('daily_transfer_limit', 19, 4)->default(1000000);
            $table->decimal('per_transaction_limit', 19, 4)->default(500000);
            $table->timestamp('opened_at')->useCurrent();
            $table->timestamp('closed_at')->nullable();
            // Fixed Deposit specific
            $table->unsignedInteger('lock_in_months')->nullable();
            $table->timestamp('maturity_date')->nullable();
            $table->decimal('early_liquidation_penalty', 5, 4)->nullable();
            // Checking specific
            $table->decimal('overdraft_limit', 19, 4)->nullable();
            $table->timestamps();

            $table->index(['customer_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
