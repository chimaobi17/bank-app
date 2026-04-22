<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->id('loan_id');
            $table->foreignId('customer_id')->constrained('customers', 'customer_id');
            $table->string('product', 20);
            $table->decimal('principal', 19, 4);
            $table->decimal('interest_rate', 5, 4);
            $table->unsignedInteger('tenor_months');
            $table->string('status', 20)->default('draft');
            $table->text('purpose')->nullable();
            $table->decimal('monthly_income', 19, 4)->nullable();
            $table->string('collateral_doc_path')->nullable();
            $table->string('income_proof_path')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users', 'user_id');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('disbursed_account_id')->nullable()->constrained('accounts', 'account_id');
            $table->timestamp('disbursed_at')->nullable();
            $table->decimal('outstanding_balance', 19, 4)->default(0);
            $table->decimal('total_interest', 19, 4)->default(0);
            $table->decimal('total_paid', 19, 4)->default(0);
            $table->decimal('late_fee_rate', 5, 4)->default(0.0100);
            $table->timestamp('closed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('loan_installments', function (Blueprint $table) {
            $table->id('installment_id');
            $table->foreignId('loan_id')->constrained('loans', 'loan_id')->cascadeOnDelete();
            $table->unsignedInteger('sequence');
            $table->date('due_date');
            $table->decimal('principal_due', 19, 4);
            $table->decimal('interest_due', 19, 4);
            $table->decimal('total_due', 19, 4);
            $table->decimal('paid_amount', 19, 4)->default(0);
            $table->decimal('late_fee', 19, 4)->default(0);
            $table->string('status', 20)->default('upcoming');
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->unique(['loan_id', 'sequence']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('loan_installments');
        Schema::dropIfExists('loans');
    }
};
