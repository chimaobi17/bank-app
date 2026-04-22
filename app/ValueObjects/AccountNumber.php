<?php

namespace App\ValueObjects;

use InvalidArgumentException;

final readonly class AccountNumber
{
    private const PATTERN = '/^\d{10}$/';

    public function __construct(private string $value)
    {
        if (! preg_match(self::PATTERN, $this->value)) {
            throw new InvalidArgumentException("Invalid account number: {$this->value}. Must be 10 digits.");
        }

        if (! self::isValidLuhn($this->value)) {
            throw new InvalidArgumentException("Invalid account number checksum: {$this->value}.");
        }
    }

    public static function generate(): self
    {
        $prefix = '20';
        $body = str_pad((string) random_int(0, 9999999), 7, '0', STR_PAD_LEFT);
        $partial = $prefix.$body;
        $checkDigit = self::luhnCheckDigit($partial);

        return new self($partial.$checkDigit);
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

    private static function isValidLuhn(string $number): bool
    {
        $sum = 0;
        $digits = str_split($number);
        $length = count($digits);

        foreach ($digits as $index => $digit) {
            $d = (int) $digit;
            if (($length - $index) % 2 === 0) {
                $d *= 2;
                if ($d > 9) {
                    $d -= 9;
                }
            }
            $sum += $d;
        }

        return $sum % 10 === 0;
    }

    private static function luhnCheckDigit(string $partial): string
    {
        $sum = 0;
        $digits = str_split($partial);
        $length = count($digits);

        foreach ($digits as $index => $digit) {
            $d = (int) $digit;
            if (($length - $index) % 2 === 1) {
                $d *= 2;
                if ($d > 9) {
                    $d -= 9;
                }
            }
            $sum += $d;
        }

        return (string) ((10 - ($sum % 10)) % 10);
    }
}
