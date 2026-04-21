<?php

namespace App\Notifications\Channels;

use App\Enums\NotificationChannel;
use App\Models\Notification;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsChannel extends AbstractNotificationChannel
{
    public function channel(): NotificationChannel
    {
        return NotificationChannel::SMS;
    }

    protected function deliver(Notification $notification): void
    {
        $user = $notification->user;

        if (! $user?->phone) {
            throw new \RuntimeException('User has no phone number on file.');
        }

        $gatewayUrl = config('services.sms.url');
        $apiKey = config('services.sms.key');

        if ($gatewayUrl && $apiKey && app()->environment('production')) {
            Http::withToken($apiKey)
                ->timeout(10)
                ->post($gatewayUrl, [
                    'to' => $user->phone,
                    'message' => $notification->body,
                    'sender' => config('services.sms.sender', 'BankApp'),
                ])
                ->throw();

            return;
        }

        Log::info('[SmsChannel] Simulated send', [
            'to' => $user->phone,
            'body' => substr($notification->body, 0, 160),
        ]);
    }
}
