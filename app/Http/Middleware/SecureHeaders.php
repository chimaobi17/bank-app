<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Phase 16.3 — Secure Headers Middleware
 *
 * Adds banking-grade security headers to every response:
 *   - Content-Security-Policy  (mitigates XSS, injection)
 *   - Strict-Transport-Security (enforces HTTPS)
 *   - X-Frame-Options (clickjacking)
 *   - X-Content-Type-Options (MIME-sniffing)
 *   - Referrer-Policy (info-leak)
 *   - Permissions-Policy (feature gating)
 *   - X-XSS-Protection (legacy browser XSS filter)
 */
class SecureHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        /** @var Response $response */
        $response = $next($request);

        // ── Content-Security-Policy ────────────────────────────────────
        // Allow self + inline styles (Inertia + Vite HMR) + trusted CDNs.
        // In production, remove 'unsafe-inline' and use nonces.
        $csp = implode('; ', [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",           // Vite HMR in dev
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob:",
            "connect-src 'self' ws: wss:",                                // WebSocket for Vite HMR
            "frame-ancestors 'none'",                                     // No iframes
            "form-action 'self'",
            "base-uri 'self'",
            "object-src 'none'",
        ]);

        $response->headers->set('Content-Security-Policy', $csp);

        // ── Strict-Transport-Security ──────────────────────────────────
        // Force HTTPS for 1 year + include subdomains + preload eligible.
        if ($request->isSecure() || app()->isProduction()) {
            $response->headers->set(
                'Strict-Transport-Security',
                'max-age=31536000; includeSubDomains; preload',
            );
        }

        // ── Clickjacking Protection ────────────────────────────────────
        $response->headers->set('X-Frame-Options', 'DENY');

        // ── MIME-Sniffing Protection ───────────────────────────────────
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // ── Referrer Policy ────────────────────────────────────────────
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // ── Permissions Policy ─────────────────────────────────────────
        // Restrict browser features — banking apps don't need camera/mic/geo by default.
        $response->headers->set('Permissions-Policy', implode(', ', [
            'camera=()',
            'microphone=()',
            'geolocation=()',
            'payment=(self)',
            'usb=()',
        ]));

        // ── Legacy XSS Filter ──────────────────────────────────────────
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // ── Remove server fingerprint ──────────────────────────────────
        $response->headers->remove('X-Powered-By');
        $response->headers->remove('Server');

        return $response;
    }
}
