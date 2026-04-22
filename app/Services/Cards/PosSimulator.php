<?php

namespace App\Services\Cards;

use App\Domain\Account\AccountFactory;
use App\Domain\Transaction\TransactionProcessor;
use App\Domain\Transaction\TransactionResult;
use App\Domain\Transaction\WithdrawalTransaction;
use App\Models\Card;
use App\ValueObjects\Money;
use RuntimeException;

final class PosSimulator
{
    public function __construct(
        private readonly CardManagementService $cards,
        private readonly TransactionProcessor $processor,
    ) {}

    public function charge(Card $card, string $pin, Money $amount, string $merchant): TransactionResult
    {
        $this->cards->assertTransactionAllowed($card, $amount, 'pos');

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
            narration: "POS purchase at {$merchant}",
            channel: 'pos',
            metadata: [
                'card_id' => $card->card_id,
                'masked_pan' => $card->masked_pan,
                'merchant' => $merchant,
            ],
        );

        return $this->processor->process($tx);
    }
}
