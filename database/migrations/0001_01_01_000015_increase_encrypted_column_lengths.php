<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cards', function (Blueprint $table) {
            $table->string('pan_token', 1024)->change();
        });

        Schema::table('customers', function (Blueprint $table) {
            $table->string('phone', 1024)->change();
        });
        
        // Also check if users table phone needs increasing if it's ever used for encrypted data
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 1024)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cards', function (Blueprint $table) {
            $table->string('pan_token', 255)->change();
        });

        Schema::table('customers', function (Blueprint $table) {
            $table->string('phone', 20)->change();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 20)->nullable()->change();
        });
    }
};
