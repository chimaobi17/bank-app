<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class RequestId
{
    public const HEADER = 'X-Request-Id';

    public const ATTRIBUTE = 'request_id';

    public function handle(Request $request, Closure $next): Response
    {
        $requestId = $request->headers->get(self::HEADER) ?: (string) Str::uuid();

        $request->attributes->set(self::ATTRIBUTE, $requestId);
        $request->headers->set(self::HEADER, $requestId);

        /** @var Response $response */
        $response = $next($request);

        $response->headers->set(self::HEADER, $requestId);

        return $response;
    }
}
