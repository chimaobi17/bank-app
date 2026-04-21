<?php

namespace App\Notifications\Channels;

use App\Contracts\Notification\NotificationChannelContract;
use App\Enums\NotificationChannel;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;
use Throwable;

abstract class AbstractNotificationChannel implements NotificationChannelContract
{
    public function supports(Notification $notification): bool
    {
        return $notification->channel === $this->channel();
    }

    final public function send(Notification $notification): void
    {
        if (! $this->supports($notification)) {
            return;
        }

        try {
            $this->deliver($notification);

            $notification->update([
                'status' => 'sent',
                'sent_at' => now(),
            ]);
        } catch (Throwable $e) {
            Log::error("Notification delivery failed on channel {$this->channel()->value}", [
                'notification_id' => $notification->notification_id,
                'error' => $e->getMessage(),
            ]);

            $notification->update(['status' => 'failed']);

            throw $e;
        }
    }

    abstract public function channel(): NotificationChannel;

    abstract protected function deliver(Notification $notification): void;
}
