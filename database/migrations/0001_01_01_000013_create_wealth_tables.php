<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('savings_goals', function (Blueprint $table) {
            $table->id('goal_id');
            $table->foreignId('customer_id')->constrained('customers', 'customer_id')->cascadeOnDelete();
            $table->foreignId('account_id')->nullable()->constrained('accounts', 'account_id')->nullOnDelete();
            $table->string('name');
            $table->decimal('target_amount', 19, 4);
            $table->decimal('current_amount', 19, 4)->default(0);
            $table->string('currency', 3)->default('NGN');
            $table->date('target_date')->nullable();
            $table->string('status', 20)->default('active'); // active, achieved, cancelled
            $table->string('color', 20)->nullable();
            $table->timestamps();
        });

        Schema::create('investment_instruments', function (Blueprint $table) {
            $table->id('instrument_id');
            $table->string('symbol', 20)->unique();
            $table->string('name');
            $table->string('category', 30); // tbill, bond, mutual_fund, equity
            $table->decimal('unit_price', 19, 4);
            $table->string('currency', 3)->default('NGN');
            $table->decimal('yield_rate', 7, 4)->nullable();
            $table->date('maturity_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('investment_holdings', function (Blueprint $table) {
            $table->id('holding_id');
            $table->foreignId('customer_id')->constrained('customers', 'customer_id')->cascadeOnDelete();
            $table->foreignId('instrument_id')->constrained('investment_instruments', 'instrument_id');
            $table->decimal('units', 19, 4);
            $table->decimal('avg_cost', 19, 4);
            $table->decimal('current_value', 19, 4)->default(0);
            $table->timestamp('acquired_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('investment_holdings');
        Schema::dropIfExists('investment_instruments');
        Schema::dropIfExists('savings_goals');
    }
};
