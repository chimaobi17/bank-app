<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('transaction_id');
            $table->string('reference', 30)->unique();
            $table->string('type', 30);
            $table->decimal('amount', 19, 4);
            $table->string('currency', 3)->default('NGN');
            $table->foreignId('source_account_id')->nullable()->constrained('accounts', 'account_id');
            $table->foreignId('dest_account_id')->nullable()->constrained('accounts', 'account_id');
            $table->string('status', 20)->default('pending');
            $table->text('narration')->nullable();
            $table->string('channel', 20)->default('web');
            $table->foreignId('initiated_by')->nullable()->constrained('users', 'user_id');
            $table->timestamp('initiated_at')->useCurrent();
            $table->timestamp('posted_at')->nullable();
            $table->boolean('is_reversible')->default(true);
            $table->foreignId('reversed_by_id')->nullable()->constrained('transactions', 'transaction_id');
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index(['source_account_id', 'posted_at']);
            $table->index(['dest_account_id', 'posted_at']);
        });

        Schema::create('ledger_entries', function (Blueprint $table) {
            $table->id('entry_id');
            $table->foreignId('transaction_id')->constrained('transactions', 'transaction_id');
            $table->foreignId('account_id')->constrained('accounts', 'account_id');
            $table->string('direction', 2); // DR or CR
            $table->decimal('amount', 19, 4);
            $table->decimal('balance_after', 19, 4);
            $table->timestamp('posted_at')->useCurrent();

            $table->index(['account_id', 'posted_at']);
        });

        Schema::create('scheduled_transfers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->foreignId('source_account_id')->constrained('accounts', 'account_id');
            $table->foreignId('dest_account_id')->nullable()->constrained('accounts', 'account_id');
            $table->string('external_bank_name')->nullable();
            $table->string('external_account_number')->nullable();
            $table->decimal('amount', 19, 4);
            $table->string('currency', 3)->default('NGN');
            $table->text('narration')->nullable();
            $table->string('frequency', 20); // once, daily, weekly, monthly
            $table->date('next_run_date');
            $table->date('end_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_run_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scheduled_transfers');
        Schema::dropIfExists('ledger_entries');
        Schema::dropIfExists('transactions');
    }
};
