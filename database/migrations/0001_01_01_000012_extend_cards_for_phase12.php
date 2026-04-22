<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cards', function (Blueprint $table) {
            $table->boolean('is_virtual')->default(false);
            $table->boolean('online_only')->default(false);
            $table->string('pin_hash')->nullable();
            $table->decimal('daily_limit', 19, 4)->nullable();
            $table->decimal('monthly_limit', 19, 4)->nullable();
            $table->decimal('single_tx_limit', 19, 4)->nullable();
            $table->timestamp('frozen_at')->nullable();
            $table->timestamp('pin_set_at')->nullable();
            $table->unsignedSmallInteger('pin_failed_attempts')->default(0);
            $table->timestamp('replacement_requested_at')->nullable();
            $table->string('replacement_reason', 100)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('cards', function (Blueprint $table) {
            $table->dropColumn([
                'is_virtual', 'online_only', 'pin_hash',
                'daily_limit', 'monthly_limit', 'single_tx_limit',
                'frozen_at', 'pin_set_at', 'pin_failed_attempts',
                'replacement_requested_at', 'replacement_reason',
            ]);
        });
    }
};
