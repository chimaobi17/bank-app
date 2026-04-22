<?php

namespace App\Services\Security;

use App\Models\FraudFlag;
use App\Models\Transaction;
use Carbon\CarbonImmutable;

final class FraudDetectionService
{
    public const SEVERITY_LOW = 'low';

    public const SEVERITY_MEDIUM = 'medium';

    public const SEVERITY_HIGH = 'high';

    public const SEVERITY_CRITICAL = 'critical';

    public function __construct(
        private readonly array $config = [],
    ) {}

    public function evaluateTransaction(Transaction $transaction): array
    {
        $flags = [];

        if ($flag = $this->checkVelocity($transaction)) {
            $flags[] = $flag;
        }

        if ($flag = $this->checkLargeAmount($transaction)) {
            $flags[] = $flag;
        }

        if ($flag = $this->checkRoundNumberPattern($transaction)) {
            $flags[] = $flag;
        }

        return $flags;
    }

    public function recordFlags(array $flags): void
    {
        foreach ($flags as $flag) {
            FraudFlag::create($flag);
        }
    }

    private function checkVelocity(Transaction $tx): ?array
    {
        if (! $tx->source_account_id) {
            return null;
        }

        $threshold = (int) ($this->config['velocity_count'] ?? 10);
        $window = (int) ($this->config['velocity_window_minutes'] ?? 5);

        $count = Transaction::where('source_account_id', $tx->source_account_id)
            ->where('created_at', '>=', CarbonImmutable::now()->subMinutes($window))
            ->count();

        if ($count >= $threshold) {
            return [
                'account_id' => $tx->source_account_id,
                'transaction_id' => $tx->transaction_id,
                'rule_name' => 'velocity',
                'severity' => self::SEVERITY_HIGH,
                'description' => "{$count} transactions in {$window} minutes exceeds threshold {$threshold}.",
                'status' => 'open',
            ];
        }

        return null;
    }

    private function checkLargeAmount(Transaction $tx): ?array
    {
        $threshold = (string) ($this->config['large_amount_threshold'] ?? '1000000.0000');

        if (bccomp((string) $tx->amount, $threshold, 4) === 1) {
            return [
                'account_id' => $tx->source_account_id,
                'transaction_id' => $tx->transaction_id,
                'rule_name' => 'large_amount',
                'severity' => self::SEVERITY_MEDIUM,
                'description' => "Transaction amount {$tx->amount} exceeds threshold {$threshold}.",
                'status' => 'open',
            ];
        }

        return null;
    }

    private function checkRoundNumberPattern(Transaction $tx): ?array
    {
        if (! $tx->source_account_id) {
            return null;
        }

        $recent = Transaction::where('source_account_id', $tx->source_account_id)
            ->where('created_at', '>=', CarbonImmutable::now()->subHour())
            ->pluck('amount');

        $roundCount = $recent->filter(fn ($a) => bcmod((string) $a, '1000', 4) === '0.0000')->count();

        if ($recent->count() >= 5 && $roundCount === $recent->count()) {
            return [
                'account_id' => $tx->source_account_id,
                'transaction_id' => $tx->transaction_id,
                'rule_name' => 'round_number_pattern',
                'severity' => self::SEVERITY_LOW,
                'description' => 'All recent transactions are round numbers (possible structuring).',
                'status' => 'open',
            ];
        }

        return null;
    }
}
