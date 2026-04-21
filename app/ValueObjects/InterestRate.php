<?php

namespace App\ValueObjects;

use InvalidArgumentException;

final readonly class InterestRate
{
    public function __construct(private string $annualRate)
    {
        if (bccomp($annualRate, '0', 6) < 0) {
            throw new InvalidArgumentException('Interest rate cannot be negative.');
        }

        if (bccomp($annualRate, '1', 6) > 0) {
            throw new InvalidArgumentException('Interest rate must be expressed as a decimal (e.g., 0.05 for 5%).');
        }
    }

    public static function fromPercent(string|float $percent): self
    {
        return new self(bcdiv((string) $percent, '100', 6));
    }

    public static function fromDecimal(string|float $decimal): self
    {
        return new self(bcadd((string) $decimal, '0', 6));
    }

    public function annual(): string
    {
        return $this->annualRate;
    }

    public function monthly(): string
    {
        return bcdiv($this->annualRate, '12', 8);
    }

    public function daily(): string
    {
        return bcdiv($this->annualRate, '365', 8);
    }

    public function toPercent(): string
    {
        return bcmul($this->annualRate, '100', 4);
    }

    public function applyTo(Money $principal, int $periods = 1): Money
    {
        $interest = bcmul($principal->getAmount(), $this->annualRate, 4);
        $interest = bcmul($interest, (string) $periods, 4);

        return Money::of($interest, $principal->getCurrency());
    }
}
