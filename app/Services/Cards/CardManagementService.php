<?php

namespace App\Services\Cards;

use App\Enums\CardStatus;
use App\Models\Card;
use App\ValueObjects\Money;
use InvalidArgumentException;
use RuntimeException;

final class CardManagementService
{
    public function setPin(Card $card, string $pin): void
    {
        $this->guardPinFormat($pin);
        $card->pin_hash = password_hash($pin, PASSWORD_DEFAULT);
        $card->pin_set_at = now();
        $card->pin_failed_attempts = 0;
        $card->save();
    }

    public function resetPin(Card $card, string $newPin): void
    {
        $this->setPin($card, $newPin);
    }

    public function verifyPin(Card $card, string $pin): bool
    {
        if (! $card->hasPin()) {
            throw new RuntimeException('Card has no PIN set.');
        }

        $ok = password_verify($pin, $card->pin_hash);

        if (! $ok) {
            $card->pin_failed_attempts = ($card->pin_failed_attempts ?? 0) + 1;
            if ($card->pin_failed_attempts >= 3) {
                $card->status = CardStatus::BLOCKED;
            }
            $card->save();

            return false;
        }

        $card->pin_failed_attempts = 0;
        $card->save();

        return true;
    }

    public function setLimits(Card $card, ?Money $daily = null, ?Money $monthly = null, ?Money $single = null): void
    {
        if ($daily) {
            $card->daily_limit = $daily->getAmount();
        }
        if ($monthly) {
            $card->monthly_limit = $monthly->getAmount();
        }
        if ($single) {
            $card->single_tx_limit = $single->getAmount();
        }
        $card->save();
    }

    public function freeze(Card $card): void
    {
        $card->frozen_at = now();
        $card->save();
    }

    public function unfreeze(Card $card): void
    {
        $card->frozen_at = null;
        $card->save();
    }

    public function requestReplacement(Card $card, string $reason): void
    {
        $allowed = ['lost', 'stolen', 'damaged', 'compromised'];
        if (! in_array($reason, $allowed, true)) {
            throw new InvalidArgumentException('Invalid replacement reason. Allowed: '.implode(',', $allowed));
        }

        $card->replacement_requested_at = now();
        $card->replacement_reason = $reason;
        $card->status = CardStatus::BLOCKED;
        $card->save();
    }

    public function assertTransactionAllowed(Card $card, Money $amount, string $channel): void
    {
        if ($card->isFrozen()) {
            throw new RuntimeException('Card is frozen.');
        }

        if ($card->status !== CardStatus::ACTIVE) {
            throw new RuntimeException("Card is {$card->status->value}.");
        }

        if ($card->online_only && in_array($channel, ['atm', 'pos'], true)) {
            throw new RuntimeException('Card is online-only; physical channels are blocked.');
        }

        $amountDec = $amount->getAmount();

        if ($card->single_tx_limit !== null && bccomp($amountDec, (string) $card->single_tx_limit, 4) === 1) {
            throw new RuntimeException('Amount exceeds single-transaction limit.');
        }
    }

    private function guardPinFormat(string $pin): void
    {
        if (! preg_match('/^\d{4,6}$/', $pin)) {
            throw new InvalidArgumentException('PIN must be 4-6 digits.');
        }
    }
}
