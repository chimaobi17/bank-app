<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * Phase 15.1 — Environment audit command to verify OCI8 extension
 * consistency and Oracle connectivity across local (Herd) and
 * containerized (Podman) environments.
 */
class AuditEnvironment extends Command
{
    protected $signature = 'env:audit {--fix : Attempt automatic fixes for common issues}';

    protected $description = 'Audit OCI8 extension, Oracle connectivity, and environment consistency.';

    public function handle(): int
    {
        $this->info('╔══════════════════════════════════════════════════╗');
        $this->info('║   ApexBank Environment Audit — Phase 15.1       ║');
        $this->info('╚══════════════════════════════════════════════════╝');
        $this->newLine();

        $passed = 0;
        $failed = 0;

        // 1. PHP version
        $this->section('PHP Runtime');
        $this->checkPass('PHP Version', PHP_VERSION);
        $this->checkPass('SAPI', PHP_SAPI);
        $passed += 2;

        // 2. OCI8 Extension
        $this->section('OCI8 Extension');
        if (extension_loaded('oci8')) {
            $this->checkPass('OCI8 loaded', 'Yes');
            $this->checkPass('OCI8 version', phpversion('oci8') ?: 'unknown');
            $passed += 2;

            // Check NLS settings
            if (function_exists('oci_connect')) {
                $this->checkPass('oci_connect()', 'Available');
                $passed++;
            } else {
                $this->checkFail('oci_connect()', 'Function not found');
                $failed++;
            }
        } else {
            $this->checkFail('OCI8 loaded', 'Extension not loaded');
            $this->warn('  → Install via: pecl install oci8');
            $this->warn('  → Or use: docker/podman exec bankapp php -m | grep oci8');
            $failed++;
        }

        // 3. Database connectivity
        $this->section('Oracle Database Connectivity');
        $dbDriver = config('database.default');
        $this->checkPass('DB Driver', $dbDriver);

        if ($dbDriver === 'oracle') {
            $dbConfig = config('database.connections.oracle');
            $this->checkPass('Host', $dbConfig['host'] ?? 'not set');
            $this->checkPass('Port', $dbConfig['port'] ?? 'not set');
            $this->checkPass('Database', $dbConfig['database'] ?? 'not set');

            try {
                DB::connection()->getPdo();
                $this->checkPass('Connection', '✓ Connected');
                $passed++;

                // Check table count
                $tables = DB::select("SELECT COUNT(*) as cnt FROM user_tables");
                $tableCount = $tables[0]->cnt ?? 0;
                $this->checkPass('Tables found', (string) $tableCount);
                $passed++;

                if ($tableCount < 15) {
                    $this->checkWarn('Table count', "Expected ≥15, found {$tableCount}. Run migration SQL.");
                }

                // Check index count
                $indexes = DB::select("SELECT COUNT(*) as cnt FROM user_indexes");
                $indexCount = $indexes[0]->cnt ?? 0;
                $this->checkPass('Indexes found', (string) $indexCount);

                if ($indexCount < 10) {
                    $this->checkWarn('Index count', "Low index count ({$indexCount}). Run database/oracle_index_optimization.sql");
                }
            } catch (\Throwable $e) {
                $this->checkFail('Connection', $e->getMessage());
                $failed++;
            }
        } else {
            $this->checkWarn('Driver', "Using '{$dbDriver}' instead of 'oracle'. This may be expected for local SQLite testing.");
        }

        // 4. Critical environment variables
        $this->section('Environment Variables');
        $criticalVars = [
            'APP_KEY' => config('app.key'),
            'APP_ENV' => config('app.env'),
            'DB_CONNECTION' => config('database.default'),
            'QUEUE_CONNECTION' => config('queue.default'),
            'SESSION_DRIVER' => config('session.driver'),
        ];

        foreach ($criticalVars as $key => $value) {
            if ($value) {
                $display = $key === 'APP_KEY' ? substr($value, 0, 12) . '…' : $value;
                $this->checkPass($key, $display);
                $passed++;
            } else {
                $this->checkFail($key, 'Not set');
                $failed++;
            }
        }

        // 5. Sensitive column encryption
        $this->section('Encryption Audit');
        $appKey = config('app.key');
        if ($appKey && strlen($appKey) >= 32) {
            $this->checkPass('APP_KEY strength', 'Sufficient (≥32 chars)');
            $passed++;
        } else {
            $this->checkFail('APP_KEY strength', 'Weak or missing — run: php artisan key:generate');
            $failed++;
        }

        // Check if encrypted casts are applied to sensitive models
        $encryptionChecks = [
            'Customer::gov_id_encrypted' => $this->checkModelCast(\App\Models\Customer::class, 'gov_id_encrypted', 'encrypted'),
            'Card::pan_token (hidden)' => in_array('pan_token', (new \App\Models\Card)->getHidden()),
            'Card::pin_hash (hidden)' => in_array('pin_hash', (new \App\Models\Card)->getHidden()),
            'BiometricCredential::public_key (hidden)' => in_array('public_key', (new \App\Models\BiometricCredential)->getHidden()),
        ];

        foreach ($encryptionChecks as $label => $ok) {
            if ($ok) {
                $this->checkPass($label, 'Protected');
                $passed++;
            } else {
                $this->checkWarn($label, 'Not encrypted/hidden — Review recommended');
            }
        }

        // 6. Filesystem
        $this->section('Filesystem');
        $dirs = [
            storage_path('app/kyc'),
            storage_path('logs'),
            storage_path('framework/sessions'),
            storage_path('framework/cache'),
        ];
        foreach ($dirs as $dir) {
            $short = str_replace(base_path() . '/', '', $dir);
            if (is_dir($dir) && is_writable($dir)) {
                $this->checkPass($short, 'Writable');
                $passed++;
            } elseif (is_dir($dir)) {
                $this->checkFail($short, 'Not writable');
                $failed++;
            } else {
                $this->checkWarn($short, 'Missing (will be created on first use)');
            }
        }

        // Summary
        $this->newLine();
        $this->info('══════════════════════════════════════════════════');
        $this->info("  ✓ Passed: {$passed}    ✗ Failed: {$failed}");
        $this->info('══════════════════════════════════════════════════');

        return $failed > 0 ? 1 : 0;
    }

    private function section(string $title): void
    {
        $this->newLine();
        $this->info("── {$title} ────────────────────────────────────");
    }

    private function checkPass(string $label, string $value): void
    {
        $this->line("  <fg=green>✓</> {$label}: <fg=white>{$value}</>");
    }

    private function checkFail(string $label, string $value): void
    {
        $this->line("  <fg=red>✗</> {$label}: <fg=red>{$value}</>");
    }

    private function checkWarn(string $label, string $value): void
    {
        $this->line("  <fg=yellow>⚠</> {$label}: <fg=yellow>{$value}</>");
    }

    private function checkModelCast(string $modelClass, string $attribute, string $expectedCast): bool
    {
        try {
            $model = new $modelClass;
            $casts = $model->getCasts();

            return isset($casts[$attribute]) && str_contains($casts[$attribute], $expectedCast);
        } catch (\Throwable) {
            return false;
        }
    }
}
