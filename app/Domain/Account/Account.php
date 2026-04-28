<?php

namespace App\Domain\Account;

use App\Contracts\Domain\Auditable;
use App\Domain\Transaction\DepositTransaction;
use App\Domain\Transaction\TransferTransaction;
use App\Domain\Transaction\WithdrawalTransaction;
use App\Enums\AccountStatus;
use App\Enums\AccountType;
use App\Exceptions\AccountNotActiveException;
use App\Exceptions\InsufficientFundsException;
use App\Exceptions\InvalidStateTransitionException;
use App\Models\Account as AccountModel;
use App\ValueObjects\AccountNumber;
use App\ValueObjects\Money;
use InvalidArgumentException;

abstract class Account implements Auditable
{
    public function __construct(protected AccountModel $model) {}

    abstract public function type(): AccountType;

    public function number(): AccountNumber
    {
        return new AccountNumber($this->model->account_number);
    }

    public function currency(): string
    {
        return $this->model->currency;
    }

    public function balance(): Money
    {
        return Money::of($this->model->balance, $this->model->currency);
    }

    public function availableBalance(): Money
    {
        return Money::of($this->model->available_balance, $this->model->currency);
    }

    public function status(): AccountStatus
    {
        return $this->model->status;
    }

    /* ── State predicates (encapsulated) ── */

    public function isActive(): bool
    {
        return $this->model->status === AccountStatus::ACTIVE;
    }

    public function isFrozen(): bool
    {
        return $this->model->status === AccountStatus::FROZEN;
    }

    public function isClosed(): bool
    {
        return $this->model->status === AccountStatus::CLOSED;
    }

    public function isDormant(): bool
    {
        return $this->model->status === AccountStatus::DORMANT;
    }

    public function isPending(): bool
    {
        return $this->model->status === AccountStatus::PENDING;
    }

    /* ── High-level operations (mask internal validation) ── */

    public function deposit(Money $amount): void
    {
        $this->guardSameCurrency($amount);
        $this->guardCanReceive();

        $this->adjustBalances($amount->getAmount());
    }

    public function withdraw(Money $amount): void
    {
        $this->guardActive();
        $this->guardSameCurrency($amount);
        $this->guardSufficientFunds($amount);

        $this->adjustBalances('-'.$amount->getAmount());
    }

    /**
     * Single choke-point for balance mutation. Updates `balance` and
     * `available_balance` in one step so subclasses cannot accidentally
     * skew the two sides. `$delta` may be positive or negative (string-safe).
     */
    final protected function adjustBalances(string $delta): void
    {
        $newBalance = bcadd((string) $this->model->balance, $delta, 4);
        $newAvailable = bcadd((string) $this->model->available_balance, $delta, 4);

        $this->model->balance = $newBalance;
        $this->model->available_balance = $newAvailable;
    }

    /**
     * Build a TransferTransaction from this account. The caller hands the
     * returned Transaction to the TransactionProcessor for atomic execution
     * (ledger + balances committed inseparably). Requirement Section 7.
     */
    public function transfer(
        Money $amount,
        Account $destination,
        ?int $initiatedBy = null,
        ?string $narration = null,
        ?string $channel = null,
    ): TransferTransaction {
        return new TransferTransaction(
            amount: $amount,
            source: $this,
            destination: $destination,
            initiatedBy: $initiatedBy,
            narration: $narration,
            channel: $channel,
        );
    }

    public function depositIntent(
        Money $amount,
        ?int $initiatedBy = null,
        ?string $narration = null,
        ?string $channel = null,
    ): DepositTransaction {
        return new DepositTransaction(
            amount: $amount,
            destination: $this,
            initiatedBy: $initiatedBy,
            narration: $narration,
            channel: $channel,
        );
    }

    public function withdrawalIntent(
        Money $amount,
        ?int $initiatedBy = null,
        ?string $narration = null,
        ?string $channel = null,
    ): WithdrawalTransaction {
        return new WithdrawalTransaction(
            amount: $amount,
            source: $this,
            initiatedBy: $initiatedBy,
            narration: $narration,
            channel: $channel,
        );
    }

    /* ── State machine wrappers ── */

    public function activate(): void
    {
        $this->transitionTo(AccountStatus::ACTIVE);
    }

    public function freeze(): void
    {
        $this->transitionTo(AccountStatus::FROZEN);
    }

    public function close(): void
    {
        $this->transitionTo(AccountStatus::CLOSED);
    }

    public function markDormant(): void
    {
        $this->transitionTo(AccountStatus::DORMANT);
    }

    public function transitionTo(AccountStatus $newStatus): void
    {
        if (! $this->model->status->canTransitionTo($newStatus)) {
            throw new InvalidStateTransitionException(
                $this->model->status->value,
                $newStatus->value,
                'Account'
            );
        }

        $this->model->status = $newStatus;
    }

    public function model(): AccountModel
    {
        return $this->model;
    }

    public function auditEntityType(): string
    {
        return 'Account';
    }

    public function auditEntityId(): int|string
    {
        return $this->model->account_id;
    }

    public function auditSnapshot(): array
    {
        return [
            'account_number' => $this->model->account_number,
            'type' => $this->type()->value,
            'status' => $this->model->status->value,
            'balance' => $this->model->balance,
        ];
    }

    /* ── Self-management guards (overridable by subclasses for polymorphic rules) ── */

    protected function guardActive(): void
    {
        if ($this->isFrozen()) {
            throw new AccountNotActiveException('This account is currently frozen.');
        }

        if ($this->isClosed()) {
            throw new AccountNotActiveException('This account is closed.');
        }

        if (! $this->isActive()) {
            throw new AccountNotActiveException("Account is not active (status: {$this->model->status->value}).");
        }
    }

    protected function guardCanReceive(): void
    {
        if ($this->isClosed()) {
            throw new AccountNotActiveException('Closed accounts cannot receive funds.');
        }

        if ($this->isFrozen()) {
            throw new AccountNotActiveException('Frozen accounts cannot receive funds.');
        }
    }

    protected function guardSufficientFunds(Money $amount): void
    {
        $available = $this->availableBalance();
        if ($available->isLessThan($amount)) {
            throw new InsufficientFundsException;
        }
    }

    protected function guardSameCurrency(Money $amount): void
    {
        if ($amount->getCurrency() !== $this->model->currency) {
            throw new InvalidArgumentException(
                "Currency mismatch: account is {$this->model->currency}, amount is {$amount->getCurrency()}."
            );
        }
    }
}
