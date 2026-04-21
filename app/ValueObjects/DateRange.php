<?php

namespace App\ValueObjects;

use DateTimeImmutable;
use InvalidArgumentException;

final readonly class DateRange
{
    public function __construct(
        public DateTimeImmutable $start,
        public DateTimeImmutable $end,
    ) {
        if ($start > $end) {
            throw new InvalidArgumentException('Start date must precede end date.');
        }
    }

    public static function lastDays(int $days): self
    {
        $end = new DateTimeImmutable('today');
        $start = $end->modify("-{$days} days");

        return new self($start, $end);
    }

    public static function month(int $year, int $month): self
    {
        $start = new DateTimeImmutable(sprintf('%04d-%02d-01', $year, $month));
        $end = $start->modify('last day of this month');

        return new self($start, $end);
    }

    public function contains(DateTimeImmutable $point): bool
    {
        return $point >= $this->start && $point <= $this->end;
    }

    public function days(): int
    {
        return (int) $this->start->diff($this->end)->days;
    }
}
