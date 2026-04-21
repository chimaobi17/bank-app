<?php

namespace App\Services;

use App\Contracts\Repositories\AccountRepositoryContract;
use App\Contracts\Repositories\AuditLogRepositoryContract;
use App\Domain\Account\AccountFactory;
use App\Domain\Transaction\TransactionProcessor;
use App\Domain\Transaction\TransactionResult;
use App\Domain\Transaction\WithdrawalTransaction;
use App\Enums\CardStatus;
use App\Models\Card;
use App\ValueObjects\CardPan;
use App\ValueObjects\Money;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use RuntimeException;

final class CardPaymentService
{
    public function __construct(
        private readonly AccountRepositoryContract $accounts,
        private readonly TransactionProcessor $processor,
        private readonly AuditLogRepositoryContract $audit,
    ) {}

    public function issueCard(int $accountId, string $cardType, string $pan, CarbonImmutable $expiry): Card
    {
        return DB::transaction(function () use ($accountId, $cardType, $pan, $expiry) {
            $accountModel = $this->accounts->findById($accountId);
            if (! $accountModel) {
                throw new InvalidArgumentException('Account not found.');
            }

            $cardPan = new CardPan($pan);

            return Card::create([
                'account_id' => $accountModel->account_id,
                'pan_token' => $cardPan->token(),
                'masked_pan' => $cardPan->masked(),
                'card_type' => $cardType,
                'brand' => $cardPan->brand(),
                'expiry' => $expiry->toDateString(),
                'status' => CardStatus::ACTIVE,
            ]);
        });
    }

    public function charge(Card $card, Money $amount, string $merchant, ?int $initiatedBy = null): TransactionResult
    {
        $this->guardCardUsable($card);

        $accountModel = $card->account;
        if (! $accountModel) {
            throw new RuntimeException('Card has no linked account.');
        }

        $source = AccountFactory::fromModel($accountModel);

        $transaction = new WithdrawalTransaction(
            amount: $amount,
            source: $source,
            initiatedBy: $initiatedBy ?? auth()->id(),
            narration: "Card purchase at {$merchant}",
            channel: 'card',
            metadata: [
                'card_id' => $card->card_id,
                'masked_pan' => $card->masked_pan,
                'brand' => $card->brand,
                'merchant' => $merchant,
            ],
        );

        $result = $this->processor->process($transaction);

        $this->audit->record($source, 'card.charged', $initiatedBy, [
            'card_id' => $card->card_id,
            'masked_pan' => $card->masked_pan,
            'merchant' => $merchant,
            'amount' => $amount->getAmount(),
            'reference' => $result->reference->getValue(),
        ]);

        return $result;
    }

    public function block(Card $card, ?int $actorId = null): Card
    {
        $card->status = CardStatus::BLOCKED;
        $card->save();

        if ($card->account) {
            $this->audit->record(
                AccountFactory::fromModel($card->account),
                'card.blocked',
                $actorId ?? auth()->id(),
                ['card_id' => $card->card_id, 'masked_pan' => $card->masked_pan],
            );
        }

        return $card;
    }

    public function unblock(Card $card, ?int $actorId = null): Card
    {
        if ($card->status !== CardStatus::BLOCKED) {
            throw new RuntimeException('Only blocked cards can be unblocked.');
        }

        $card->status = CardStatus::ACTIVE;
        $card->save();

        if ($card->account) {
            $this->audit->record(
                AccountFactory::fromModel($card->account),
                'card.unblocked',
                $actorId ?? auth()->id(),
                ['card_id' => $card->card_id],
            );
        }

        return $card;
    }

    private function guardCardUsable(Card $card): void
    {
        if ($card->status !== CardStatus::ACTIVE) {
            throw new RuntimeException("Card is {$card->status->value} and cannot be charged.");
        }

        $expiry = $card->expiry instanceof \DateTimeInterface
            ? CarbonImmutable::instance($card->expiry)
            : CarbonImmutable::parse((string) $card->expiry);

        if ($expiry->isPast()) {
            $card->status = CardStatus::EXPIRED;
            $card->save();
            throw new RuntimeException('Card is expired.');
        }
    }
}
