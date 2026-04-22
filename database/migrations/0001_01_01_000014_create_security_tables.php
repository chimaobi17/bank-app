<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('otp_challenges', function (Blueprint $table) {
            $table->id('challenge_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->string('purpose', 50); // transfer, login, profile_change
            $table->string('channel', 20); // email, sms
            $table->string('code_hash');
            $table->timestamp('expires_at');
            $table->timestamp('consumed_at')->nullable();
            $table->unsignedSmallInteger('attempts')->default(0);
            $table->timestamps();
        });

        Schema::create('biometric_credentials', function (Blueprint $table) {
            $table->id('credential_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->string('public_key_handle'); // WebAuthn credential ID
            $table->text('public_key');
            $table->string('device_name')->nullable();
            $table->string('attestation_format', 30)->nullable();
            $table->timestamp('registered_at');
            $table->timestamp('last_used_at')->nullable();
            $table->timestamp('revoked_at')->nullable();
        });

        Schema::create('fraud_flags', function (Blueprint $table) {
            $table->id('flag_id');
            $table->foreignId('user_id')->nullable()->constrained('users', 'user_id')->nullOnDelete();
            $table->foreignId('account_id')->nullable()->constrained('accounts', 'account_id')->nullOnDelete();
            $table->foreignId('transaction_id')->nullable()->constrained('transactions', 'transaction_id')->nullOnDelete();
            $table->string('rule_name', 80);
            $table->string('severity', 20); // low, medium, high, critical
            $table->text('description')->nullable();
            $table->string('status', 20)->default('open'); // open, reviewed, dismissed
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fraud_flags');
        Schema::dropIfExists('biometric_credentials');
        Schema::dropIfExists('otp_challenges');
    }
};
