<?php

namespace App\Contracts\Notification;

use App\Enums\NotificationChannel;
use App\Models\Notification;

interface NotificationChannelContract
{
    public function channel(): NotificationChannel;

    public function supports(Notification $notification): bool;

    public function send(Notification $notification): void;
}
