<?php

namespace App\DTO\External;

final readonly class BillPaymentResponse
{
    public const STATUS_SUCCESS = 'success';

    public const STATUS_PENDING = 'pending';

    public const STATUS_FAILED = 'failed';

    public function __construct(
        public string $status,
        public string $providerReference,
        public string $idempotencyKey,
        public ?string $token = null,
        public ?string $message = null,
    ) {}

    public function isSuccessful(): bool
    {
        return $this->status === self::STATUS_SUCCESS;
    }
}
