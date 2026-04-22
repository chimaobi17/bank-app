<?php

namespace App\ValueObjects;

use InvalidArgumentException;

final readonly class Money
{
    public function __construct(
        private string $amount,
        private string $currency = 'NGN',
    ) {
        if (bccomp($this->amount, '0', 4) < 0) {
            throw new InvalidArgumentException('Money amount cannot be negative.');
        }
    }

    public static function of(string|float|int $amount, string $currency = 'NGN'): self
    {
        return new self(bcadd((string) $amount, '0', 4), $currency);
    }

    public static function zero(string $currency = 'NGN'): self
    {
        return new self('0.0000', $currency);
    }

    public function add(self $other): self
    {
        $this->guardCurrency($other);

        return new self(bcadd($this->amount, $other->amount, 4), $this->currency);
    }

    public function subtract(self $other): self
    {
        $this->guardCurrency($other);
        $result = bcsub($this->amount, $other->amount, 4);

        if (bccomp($result, '0', 4) < 0) {
            throw new InvalidArgumentException('Subtraction would result in negative amount.');
        }

        return new self($result, $this->currency);
    }

    public function multiply(string $factor): self
    {
        return new self(bcmul($this->amount, $factor, 4), $this->currency);
    }

    public function isLessThan(self $other): bool
    {
        $this->guardCurrency($other);

        return bccomp($this->amount, $other->amount, 4) < 0;
    }

    public function isGreaterThan(self $other): bool
    {
        $this->guardCurrency($other);

        return bccomp($this->amount, $other->amount, 4) > 0;
    }

    public function isZero(): bool
    {
        return bccomp($this->amount, '0', 4) === 0;
    }

    public function getAmount(): string
    {
        return $this->amount;
    }

    public function getCurrency(): string
    {
        return $this->currency;
    }

    public function format(): string
    {
        return $this->currency.' '.number_format((float) $this->amount, 2);
    }

    private function guardCurrency(self $other): void
    {
        if ($this->currency !== $other->currency) {
            throw new InvalidArgumentException("Currency mismatch: {$this->currency} vs {$other->currency}");
        }
    }
}
