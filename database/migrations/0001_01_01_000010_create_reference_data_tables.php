<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->string('code', 3)->unique();
            $table->string('name', 100);
            $table->string('symbol', 5);
            $table->boolean('is_active')->default(true);
        });

        Schema::create('interest_rate_configs', function (Blueprint $table) {
            $table->id();
            $table->string('account_type', 20);
            $table->decimal('rate', 5, 4);
            $table->string('posting_frequency', 20)->default('monthly');
            $table->decimal('min_balance_for_interest', 19, 4)->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('fee_schedules', function (Blueprint $table) {
            $table->id();
            $table->string('fee_type', 50);
            $table->string('description');
            $table->decimal('amount', 19, 4)->nullable();
            $table->decimal('percentage', 5, 4)->nullable();
            $table->decimal('min_amount', 19, 4)->nullable();
            $table->decimal('max_amount', 19, 4)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('system_configs', function (Blueprint $table) {
            $table->id();
            $table->string('key', 100)->unique();
            $table->text('value');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->text('answer');
            $table->string('category', 50)->default('general');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('support_tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users', 'user_id');
            $table->string('subject');
            $table->text('message');
            $table->string('status', 20)->default('open');
            $table->string('priority', 10)->default('medium');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('support_tickets');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('system_configs');
        Schema::dropIfExists('fee_schedules');
        Schema::dropIfExists('interest_rate_configs');
        Schema::dropIfExists('currencies');
    }
};
