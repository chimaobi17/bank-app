<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('billers', function (Blueprint $table) {
            $table->id('biller_id');
            $table->string('name');
            $table->string('code', 20)->unique();
            $table->string('category', 50);
            $table->string('logo_path')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id('payment_id');
            $table->foreignId('customer_id')->constrained('customers', 'customer_id');
            $table->foreignId('account_id')->constrained('accounts', 'account_id');
            $table->foreignId('biller_id')->nullable()->constrained('billers', 'biller_id');
            $table->string('payment_type', 30); // bill, airtime, subscription
            $table->decimal('amount', 19, 4);
            $table->string('currency', 3)->default('NGN');
            $table->string('status', 20)->default('pending');
            $table->string('recipient_identifier')->nullable(); // meter number, phone number, etc.
            $table->text('narration')->nullable();
            $table->foreignId('transaction_id')->nullable()->constrained('transactions', 'transaction_id');
            $table->timestamp('scheduled_for')->nullable();
            $table->string('frequency', 20)->nullable(); // null = one-time
            $table->boolean('is_recurring')->default(false);
            $table->timestamps();
        });

        Schema::create('cards', function (Blueprint $table) {
            $table->id('card_id');
            $table->foreignId('account_id')->constrained('accounts', 'account_id');
            $table->string('pan_token');
            $table->string('masked_pan', 19);
            $table->string('card_type', 20)->default('debit'); // debit, credit
            $table->string('brand', 20)->default('visa'); // visa, mastercard
            $table->date('expiry');
            $table->string('status', 20)->default('active');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cards');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('billers');
    }
};
