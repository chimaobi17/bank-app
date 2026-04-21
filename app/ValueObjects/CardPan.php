<?php

namespace App\ValueObjects;

use InvalidArgumentException;

final readonly class CardPan
{
    private string $pan;

    public function __construct(string $pan)
    {
        $digits = preg_replace('/\D/', '', $pan);

        if (strlen($digits) < 13 || strlen($digits) > 19) {
            throw new InvalidArgumentException('PAN must be 13-19 digits.');
        }

        if (! $this->isValidLuhn($digits)) {
            throw new InvalidArgumentException('PAN failed Luhn checksum.');
        }

        $this->pan = $digits;
    }

    public function full(): string
    {
        return $this->pan;
    }

    public function masked(): string
    {
        $len = strlen($this->pan);
        $first6 = substr($this->pan, 0, 6);
        $last4 = substr($this->pan, -4);
        $middle = str_repeat('*', $len - 10);

        return $first6.$middle.$last4;
    }

    public function token(): string
    {
        return hash('sha256', $this->pan);
    }

    public function last4(): string
    {
        return substr($this->pan, -4);
    }

    public function brand(): string
    {
        return match (true) {
            str_starts_with($this->pan, '4') => 'VISA',
            preg_match('/^5[1-5]/', $this->pan) === 1 => 'MASTERCARD',
            preg_match('/^3[47]/', $this->pan) === 1 => 'AMEX',
            preg_match('/^(506[0-9]|507[89]|6500)/', $this->pan) === 1 => 'VERVE',
            default => 'UNKNOWN',
        };
    }

    private function isValidLuhn(string $digits): bool
    {
        $sum = 0;
        $len = strlen($digits);
        $parity = $len % 2;

        for ($i = 0; $i < $len; $i++) {
            $d = (int) $digits[$i];
            if ($i % 2 === $parity) {
                $d *= 2;
                if ($d > 9) {
                    $d -= 9;
                }
            }
            $sum += $d;
        }

        return $sum % 10 === 0;
    }
}
