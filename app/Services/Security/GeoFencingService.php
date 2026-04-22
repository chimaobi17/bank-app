<?php

namespace App\Services\Security;

use App\Models\AuditLog;
use App\Models\UserSession;
use App\Models\User;
use Carbon\CarbonImmutable;

/**
 * Phase 16.4 — Geo-Fencing & Login Anomaly Detection
 *
 * Basic heuristics:
 *   1. Impossible travel: flags if a user logs in from two IPs
 *      that are in different geographic regions within a short time.
 *   2. New device/IP alert: flags logins from IPs never seen before.
 *   3. Suspicion scoring: returns a risk score (0-100).
 *
 * Note: Real GeoIP lookups require MaxMind or similar. This
 * implementation uses IP prefix heuristics for demo purposes,
 * but the interface is designed for easy production swap-in.
 */
final class GeoFencingService
{
    /** Time window in minutes to consider "impossible travel". */
    private const TRAVEL_WINDOW_MINUTES = 30;

    /** Risk score threshold to auto-flag. */
    private const FLAG_THRESHOLD = 60;

    /**
     * Evaluate a login event and return a risk assessment.
     */
    public function evaluateLogin(User $user, string $currentIp, ?string $userAgent = null): array
    {
        $score = 0;
        $flags = [];

        // ── 1. New IP detection ──────────────────────────────────────
        $knownIps = UserSession::where('user_id', $user->user_id)
            ->whereNull('revoked_at')
            ->where('created_at', '>=', CarbonImmutable::now()->subDays(90))
            ->pluck('ip_address')
            ->unique()
            ->toArray();

        if (! in_array($currentIp, $knownIps) && count($knownIps) > 0) {
            $score += 25;
            $flags[] = [
                'rule' => 'new_ip',
                'severity' => 'medium',
                'message' => "Login from previously unseen IP: {$currentIp}",
            ];
        }

        // ── 2. Impossible travel detection ───────────────────────────
        $recentSession = UserSession::where('user_id', $user->user_id)
            ->whereNotNull('ip_address')
            ->where('ip_address', '!=', $currentIp)
            ->where('last_seen_at', '>=', CarbonImmutable::now()->subMinutes(self::TRAVEL_WINDOW_MINUTES))
            ->orderByDesc('last_seen_at')
            ->first();

        if ($recentSession) {
            $previousIp = $recentSession->ip_address;

            if ($this->isGeographicallyDistant($previousIp, $currentIp)) {
                $score += 50;
                $flags[] = [
                    'rule' => 'impossible_travel',
                    'severity' => 'high',
                    'message' => "Login from {$currentIp} within " . self::TRAVEL_WINDOW_MINUTES . "min of session from {$previousIp}. Possible credential compromise.",
                ];
            }
        }

        // ── 3. Unusual login time ────────────────────────────────────
        $hour = (int) CarbonImmutable::now()->format('H');
        if ($hour >= 1 && $hour <= 4) {
            $score += 15;
            $flags[] = [
                'rule' => 'unusual_time',
                'severity' => 'low',
                'message' => "Login at unusual hour: {$hour}:00 local time.",
            ];
        }

        // ── 4. Excessive recent sessions ─────────────────────────────
        $recentLoginCount = UserSession::where('user_id', $user->user_id)
            ->where('created_at', '>=', CarbonImmutable::now()->subHour())
            ->count();

        if ($recentLoginCount >= 5) {
            $score += 20;
            $flags[] = [
                'rule' => 'login_burst',
                'severity' => 'medium',
                'message' => "{$recentLoginCount} login sessions in the past hour.",
            ];
        }

        // ── Record if threshold exceeded ─────────────────────────────
        $shouldFlag = $score >= self::FLAG_THRESHOLD;

        if ($shouldFlag) {
            $this->recordAuditFlag($user, $currentIp, $score, $flags);
        }

        return [
            'risk_score' => min(100, $score),
            'should_flag' => $shouldFlag,
            'flags' => $flags,
            'ip' => $currentIp,
        ];
    }

    /**
     * Basic geo-distance heuristic using IP prefix comparison.
     *
     * In production, replace with MaxMind GeoIP2 distance calculation.
     * For this demo, IPs sharing the first two octets are "close".
     */
    private function isGeographicallyDistant(string $ip1, string $ip2): bool
    {
        // Local/private IPs are never "distant"
        if ($this->isPrivateIp($ip1) || $this->isPrivateIp($ip2)) {
            return false;
        }

        // Compare first two octets (same /16 subnet = "close")
        $prefix1 = implode('.', array_slice(explode('.', $ip1), 0, 2));
        $prefix2 = implode('.', array_slice(explode('.', $ip2), 0, 2));

        return $prefix1 !== $prefix2;
    }

    private function isPrivateIp(string $ip): bool
    {
        return filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false;
    }

    private function recordAuditFlag(User $user, string $ip, int $score, array $flags): void
    {
        AuditLog::create([
            'actor_user_id' => $user->user_id,
            'action' => 'security.geo_fence_alert',
            'entity_type' => 'user',
            'entity_id' => $user->user_id,
            'ip_address' => $ip,
            'before_state' => null,
            'after_state' => json_encode([
                'risk_score' => $score,
                'flags' => $flags,
            ]),
        ]);
    }
}
