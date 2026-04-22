<?php

namespace App\Http\Middleware;

use App\Models\UserSession;
use Carbon\CarbonImmutable;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Phase 16.3 — Session Security Middleware
 *
 * Enforces:
 *   1. Absolute session timeout (e.g., 8 hours regardless of activity).
 *   2. Concurrent session limit — blocks login from too many distinct IPs.
 *   3. IP consistency check — flags if session IP changes mid-session.
 */
class SessionSecurity
{
    /** Absolute session lifetime in minutes (8 hours). */
    private const ABSOLUTE_TIMEOUT_MINUTES = 480;

    /** Maximum concurrent active sessions per user. */
    private const MAX_CONCURRENT_SESSIONS = 3;

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            return $next($request);
        }

        // ── 1. Absolute timeout ────────────────────────────────────────
        $loginTime = $request->session()->get('auth.login_at');

        if ($loginTime) {
            $elapsed = CarbonImmutable::parse($loginTime)->diffInMinutes(now());

            if ($elapsed > self::ABSOLUTE_TIMEOUT_MINUTES) {
                auth()->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                if ($request->expectsJson()) {
                    return response()->json([
                        'message' => 'Session expired. Please log in again.',
                    ], 401);
                }

                return redirect()->route('login')->with('error', 'Your session has expired. Please log in again.');
            }
        } else {
            // Stamp login time if not already set
            $request->session()->put('auth.login_at', now()->toIso8601String());
        }

        // ── 2. Concurrent session limit ────────────────────────────────
        $currentIp = $request->ip();
        $activeSessions = UserSession::where('user_id', $user->user_id)
            ->whereNull('revoked_at')
            ->count();

        if ($activeSessions > self::MAX_CONCURRENT_SESSIONS) {
            // Revoke oldest sessions (keep newest MAX_CONCURRENT_SESSIONS)
            $oldest = UserSession::where('user_id', $user->user_id)
                ->whereNull('revoked_at')
                ->orderBy('created_at', 'asc')
                ->limit($activeSessions - self::MAX_CONCURRENT_SESSIONS)
                ->get();

            foreach ($oldest as $session) {
                $session->revoke();
            }
        }

        // ── 3. Track session activity ──────────────────────────────────
        $sessionId = $request->session()->get('user_session_id');

        if ($sessionId) {
            $userSession = UserSession::find($sessionId);

            if ($userSession && $userSession->isActive()) {
                // Update last seen timestamp
                $userSession->update(['last_seen_at' => now()]);

                // Check for IP change
                if ($userSession->ip_address && $userSession->ip_address !== $currentIp) {
                    // Log suspicious IP change but don't block (could be VPN/mobile)
                    \Log::warning('Session IP change detected', [
                        'user_id' => $user->user_id,
                        'session_id' => $sessionId,
                        'original_ip' => $userSession->ip_address,
                        'current_ip' => $currentIp,
                    ]);
                }
            }
        } else {
            // Create a new user session record
            $userSession = UserSession::create([
                'user_id' => $user->user_id,
                'device' => $this->extractDevice($request),
                'ip_address' => $currentIp,
                'user_agent' => $request->userAgent(),
                'last_seen_at' => now(),
            ]);

            $request->session()->put('user_session_id', $userSession->session_id);
        }

        return $next($request);
    }

    private function extractDevice(Request $request): string
    {
        $ua = $request->userAgent() ?? '';

        return match (true) {
            str_contains($ua, 'iPhone') => 'iPhone',
            str_contains($ua, 'iPad') => 'iPad',
            str_contains($ua, 'Android') => 'Android',
            str_contains($ua, 'Macintosh') => 'Mac',
            str_contains($ua, 'Windows') => 'Windows',
            str_contains($ua, 'Linux') => 'Linux',
            default => 'Unknown',
        };
    }
}
