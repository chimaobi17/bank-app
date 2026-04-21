<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireMfa
{
    public const SESSION_KEY = 'mfa.verified_at';

    public const SESSION_TTL_MINUTES = 15;

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(401);
        }

        if (! $user->two_factor_secret) {
            return $this->respondMfaRequired($request, 'MFA is not enrolled. Please complete two-factor setup.');
        }

        $verifiedAt = $request->session()->get(self::SESSION_KEY);

        if ($verifiedAt && now()->diffInMinutes($verifiedAt) < self::SESSION_TTL_MINUTES) {
            return $next($request);
        }

        return $this->respondMfaRequired($request, 'This action requires two-factor verification.');
    }

    private function respondMfaRequired(Request $request, string $message): Response
    {
        if ($request->expectsJson()) {
            return response()->json([
                'status' => 'mfa_required',
                'message' => $message,
            ], 423);
        }

        return redirect()
            ->route('two-factor.challenge', ['intended' => $request->fullUrl()])
            ->with('error', $message);
    }
}
