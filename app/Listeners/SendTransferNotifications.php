<?php

namespace App\Listeners;

use App\Events\TransferCompleted;
use App\Services\NotificationService;
use App\ValueObjects\Money;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendTransferNotifications implements ShouldQueue
{
    public function __construct(
        private NotificationService $notifications,
    ) {}

    public function handle(TransferCompleted $event): void
    {
        $transaction = $event->transaction;
        $amount = Money::of($transaction->amount, $transaction->currency)->format();

        $this->notifySource($transaction, $amount);
        $this->notifyDestination($transaction, $amount);
    }

    private function notifySource($transaction, string $formattedAmount): void
    {
        $sourceAccount = $transaction->sourceAccount;
        if (! $sourceAccount?->customer?->user) {
            return;
        }

        $this->notifications->sendTransactionAlert(
            $sourceAccount->customer->user,
            'debit',
            $formattedAmount,
            $transaction->reference,
        );
    }

    private function notifyDestination($transaction, string $formattedAmount): void
    {
        $destAccount = $transaction->destinationAccount;
        if (! $destAccount?->customer?->user) {
            return;
        }

        $this->notifications->sendTransactionAlert(
            $destAccount->customer->user,
            'credit',
            $formattedAmount,
            $transaction->reference,
        );
    }
}
