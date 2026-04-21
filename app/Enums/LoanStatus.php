<?php

namespace App\Enums;

enum LoanStatus: string
{
    case DRAFT = 'draft';
    case SUBMITTED = 'submitted';
    case UNDER_REVIEW = 'under_review';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';
    case DISBURSED = 'disbursed';
    case ACTIVE = 'active';
    case DELINQUENT = 'delinquent';
    case CLOSED = 'closed';

    public function canTransitionTo(self $target): bool
    {
        return match ($this) {
            self::DRAFT => in_array($target, [self::SUBMITTED, self::REJECTED]),
            self::SUBMITTED => in_array($target, [self::UNDER_REVIEW, self::REJECTED]),
            self::UNDER_REVIEW => in_array($target, [self::APPROVED, self::REJECTED]),
            self::APPROVED => in_array($target, [self::DISBURSED, self::REJECTED]),
            self::DISBURSED => in_array($target, [self::ACTIVE, self::CLOSED]),
            self::ACTIVE => in_array($target, [self::DELINQUENT, self::CLOSED]),
            self::DELINQUENT => in_array($target, [self::ACTIVE, self::CLOSED]),
            self::REJECTED, self::CLOSED => false,
        };
    }
}
