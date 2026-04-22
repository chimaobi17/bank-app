<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Cache\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

/**
 * Phase 16.2 — Financial Rate Limiter
 *
 * Custom rate limiter for financial endpoints:
 *   - /transfers → max 10/min per user
 *   - /payments  → max 15/min per user
 *   - /interbank → max 5/min per user
 *   - Default    → max 60/min per user
 *
 * Returns 429 Too Many Requests with Retry-After header.
 */
class FinancialRateLimiter
{
    public function __construct(
        private readonly RateLimiter $limiter,
    ) {}

    public function handle(Request $request, Closure $next, string $tier = 'default'): Response
    {
        $user = $request->user();
        $key = $this->resolveKey($user, $tier, $request);
        $maxAttempts = $this->maxAttempts($tier);
        $decaySeconds = 60; // 1 minute window

        if ($this->limiter->tooManyAttempts($key, $maxAttempts)) {
            $retryAfter = $this->limiter->availableIn($key);

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Too many requests. Please wait before trying again.',
                    'retry_after' => $retryAfter,
                ], 429, [
                    'Retry-After' => $retryAfter,
                    'X-RateLimit-Limit' => $maxAttempts,
                    'X-RateLimit-Remaining' => 0,
                ]);
            }

            return back()
                ->withErrors(['throttle' => "Too many requests. Please wait {$retryAfter} seconds."])
                ->withInput();
        }

        $this->limiter->hit($key, $decaySeconds);

        /** @var Response $response */
        $response = $next($request);

        $remaining = $maxAttempts - $this->limiter->attempts($key);

        $response->headers->set('X-RateLimit-Limit', (string) $maxAttempts);
        $response->headers->set('X-RateLimit-Remaining', (string) max(0, $remaining));

        return $response;
    }

    private function resolveKey($user, string $tier, Request $request): string
    {
        $userId = $user?->user_id ?? $request->ip();

        return "financial_rate:{$tier}:{$userId}";
    }

    private function maxAttempts(string $tier): int
    {
        return match ($tier) {
            'transfer' => 10,
            'interbank' => 5,
            'payment' => 15,
            'login' => 5,
            default => 60,
        };
    }
}
