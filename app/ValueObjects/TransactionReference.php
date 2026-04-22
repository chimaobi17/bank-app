<?php

namespace App\ValueObjects;

use InvalidArgumentException;

final readonly class TransactionReference
{
    private const PATTERN = '/^TXN[A-Z0-9\-]{8,}$/';

    public function __construct(private string $value)
    {
        if (! preg_match(self::PATTERN, $value)) {
            throw new InvalidArgumentException("Invalid transaction reference: {$value}");
        }
    }

    public static function generate(): self
    {
        return new self('TXN'.date('Ymd').strtoupper(substr(bin2hex(random_bytes(5)), 0, 10)));
    }

    public function getValue(): string
    {
        return $this->value;
    }

    public function __toString(): string
    {
        return $this->value;
    }

    public function equals(self $other): bool
    {
        return $this->value === $other->value;
    }
}
