<?php

namespace App\Notifications\Channels;

use App\Enums\NotificationChannel;
use App\Models\Notification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EmailChannel extends AbstractNotificationChannel
{
    public function channel(): NotificationChannel
    {
        return NotificationChannel::EMAIL;
    }

    protected function deliver(Notification $notification): void
    {
        $user = $notification->user;

        if (! $user?->email) {
            throw new \RuntimeException('User has no email address on file.');
        }

        if (app()->environment('production')) {
            Mail::raw($notification->body, function ($message) use ($user, $notification) {
                $message->to($user->email)->subject($notification->subject);
            });

            return;
        }

        Log::info('[EmailChannel] Simulated send', [
            'to' => $user->email,
            'subject' => $notification->subject,
        ]);
    }
}
