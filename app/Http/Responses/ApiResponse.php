<?php

namespace App\Http\Responses;

use App\Http\Middleware\RequestId;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Facades\Request;

final class ApiResponse
{
    public static function success(mixed $data = null, array $meta = [], int $status = 200): JsonResponse
    {
        return self::envelope('success', $data, null, $meta, $status);
    }

    public static function created(mixed $data = null, array $meta = []): JsonResponse
    {
        return self::envelope('success', $data, null, $meta, 201);
    }

    public static function noContent(): JsonResponse
    {
        return self::envelope('success', null, null, [], 204);
    }

    public static function error(string $message, int $status = 400, array $errors = [], ?string $code = null): JsonResponse
    {
        $payload = [
            'message' => $message,
            'code' => $code ?? self::defaultCodeFor($status),
        ];

        if (! empty($errors)) {
            $payload['details'] = $errors;
        }

        return self::envelope('error', null, $payload, [], $status);
    }

    private static function envelope(string $status, mixed $data, ?array $errors, array $meta, int $httpStatus): JsonResponse
    {
        $body = self::normalizeData($data);

        $response = [
            'status' => $status,
            'data' => $body['data'],
            'meta' => array_merge($body['meta'], $meta, self::baseMeta()),
            'errors' => $errors,
        ];

        return response()->json($response, $httpStatus, [
            RequestId::HEADER => Request::attributes->get(RequestId::ATTRIBUTE),
        ]);
    }

    private static function normalizeData(mixed $data): array
    {
        if ($data instanceof ResourceCollection) {
            $resource = $data->resource;

            if ($resource instanceof AbstractPaginator) {
                return [
                    'data' => $data->resolve(),
                    'meta' => [
                        'pagination' => [
                            'total' => $resource->total(),
                            'per_page' => $resource->perPage(),
                            'current_page' => $resource->currentPage(),
                            'last_page' => $resource->lastPage(),
                        ],
                    ],
                ];
            }

            return ['data' => $data->resolve(), 'meta' => []];
        }

        if ($data instanceof JsonResource) {
            return ['data' => $data->resolve(), 'meta' => []];
        }

        if ($data instanceof AbstractPaginator) {
            return [
                'data' => $data->items(),
                'meta' => [
                    'pagination' => [
                        'total' => $data->total(),
                        'per_page' => $data->perPage(),
                        'current_page' => $data->currentPage(),
                        'last_page' => $data->lastPage(),
                    ],
                ],
            ];
        }

        return ['data' => $data, 'meta' => []];
    }

    private static function baseMeta(): array
    {
        return [
            'request_id' => Request::attributes->get(RequestId::ATTRIBUTE),
            'timestamp' => now()->toIso8601String(),
            'version' => 'v1',
        ];
    }

    private static function defaultCodeFor(int $status): string
    {
        return match (true) {
            $status === 401 => 'UNAUTHENTICATED',
            $status === 403 => 'FORBIDDEN',
            $status === 404 => 'NOT_FOUND',
            $status === 422 => 'UNPROCESSABLE_ENTITY',
            $status === 423 => 'LOCKED',
            $status === 429 => 'TOO_MANY_REQUESTS',
            $status >= 500 => 'SERVER_ERROR',
            default => 'BAD_REQUEST',
        };
    }
}
