<?php

namespace App\Notifications\Channels;

use App\Enums\NotificationChannel;
use App\Models\Notification;

class InAppChannel extends AbstractNotificationChannel
{
    public function channel(): NotificationChannel
    {
        return NotificationChannel::IN_APP;
    }

    protected function deliver(Notification $notification): void
    {
        // In-app notifications are persisted on create; delivery = mark ready for UI polling.
    }
}
