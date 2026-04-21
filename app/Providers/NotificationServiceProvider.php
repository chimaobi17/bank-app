<?php

namespace App\Providers;

use App\Notifications\Channels\EmailChannel;
use App\Notifications\Channels\InAppChannel;
use App\Notifications\Channels\SmsChannel;
use App\Notifications\NotificationDispatcher;
use Illuminate\Support\ServiceProvider;

class NotificationServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(NotificationDispatcher::class, function ($app) {
            return new NotificationDispatcher([
                $app->make(InAppChannel::class),
                $app->make(EmailChannel::class),
                $app->make(SmsChannel::class),
            ]);
        });
    }
}
