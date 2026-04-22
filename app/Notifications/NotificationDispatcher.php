<?php

namespace App\Notifications;

use App\Contracts\Notification\NotificationChannelContract;
use App\Enums\NotificationChannel;
use App\Models\Notification;
use RuntimeException;

class NotificationDispatcher
{
    /** @var array<string, NotificationChannelContract> */
    private array $channels = [];

    /** @param iterable<NotificationChannelContract> $channels */
    public function __construct(iterable $channels = [])
    {
        foreach ($channels as $channel) {
            $this->register($channel);
        }
    }

    public function register(NotificationChannelContract $channel): void
    {
        $this->channels[$channel->channel()->value] = $channel;
    }

    public function dispatch(Notification $notification): void
    {
        $key = $notification->channel instanceof NotificationChannel
            ? $notification->channel->value
            : (string) $notification->channel;

        $channel = $this->channels[$key] ?? null;

        if (! $channel) {
            throw new RuntimeException("No channel registered for '{$key}'.");
        }

        $channel->send($notification);
    }

    /** @return array<string, NotificationChannelContract> */
    public function channels(): array
    {
        return $this->channels;
    }
}
