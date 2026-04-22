<?php

namespace App\Services\Cards;

use App\Domain\Account\AccountFactory;
use App\Domain\Transaction\TransactionProcessor;
use App\Domain\Transaction\TransactionResult;
use App\Domain\Transaction\WithdrawalTransaction;
use App\Models\Card;
use App\ValueObjects\Money;
use RuntimeException;

final class AtmSimulator
{
    public function __construct(
        private readonly CardManagementService $cards,
        private readonly TransactionProcessor $processor,
    ) {}

    public function withdraw(Card $card, string $pin, Money $amount, string $atmLocation): TransactionResult
    {
        $this->cards->assertTransactionAllowed($card, $amount, 'atm');

        if (! $this->cards->verifyPin($card, $pin)) {
            throw new RuntimeException('Invalid PIN.');
        }

        if (! $card->account) {
            throw new RuntimeException('Card has no linked account.');
        }

        $source = AccountFactory::fromModel($card->account);

        $tx = new WithdrawalTransaction(
            amount: $amount,
            source: $source,
            initiatedBy: null,
            narration: "ATM withdrawal at {$atmLocation}",
            channel: 'atm',
            metadata: [
                'card_id' => $card->card_id,
                'masked_pan' => $card->masked_pan,
                'atm_location' => $atmLocation,
            ],
        );

        return $this->processor->process($tx);
    }
}
