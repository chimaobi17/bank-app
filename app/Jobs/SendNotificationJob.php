<?php

namespace App\Jobs;

use App\Models\Notification;
use App\Notifications\NotificationDispatcher;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    public int $backoff = 30;

    public function __construct(public Notification $notification) {}

    public function handle(NotificationDispatcher $dispatcher): void
    {
        $dispatcher->dispatch($this->notification->fresh() ?? $this->notification);
    }
}
