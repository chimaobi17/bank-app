<?php

namespace App\DTO\External;

final readonly class InterbankTransferResponse
{
    public const STATUS_PENDING = 'pending';

    public const STATUS_SUCCESS = 'success';

    public const STATUS_FAILED = 'failed';

    public const STATUS_REVERSED = 'reversed';

    public function __construct(
        public string $sessionId,
        public string $status,
        public string $responseCode,
        public ?string $responseMessage = null,
        public ?string $externalReference = null,
    ) {}

    public function isSuccessful(): bool
    {
        return $this->status === self::STATUS_SUCCESS;
    }

    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }
}
