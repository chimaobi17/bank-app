<?php

namespace App\Services;

use App\Enums\NotificationChannel;
use App\Jobs\SendNotificationJob;
use App\Models\Notification as NotificationModel;
use App\Models\User;

class NotificationService
{
    /** @var array<int, NotificationChannel> */
    private const DEFAULT_CHANNELS = [NotificationChannel::IN_APP];

    /** @var array<int, NotificationChannel> */
    private const TRANSACTION_CHANNELS = [NotificationChannel::IN_APP, NotificationChannel::EMAIL];

    /** @var array<int, NotificationChannel> */
    private const SECURITY_CHANNELS = [
        NotificationChannel::IN_APP,
        NotificationChannel::EMAIL,
        NotificationChannel::SMS,
    ];

    /**
     * @param  array<int, NotificationChannel|string>|null  $channels
     */
    public function send(User $user, string $subject, string $body, string $category = 'transaction', ?array $channels = null): void
    {
        $channels = $this->normalizeChannels($channels ?? self::DEFAULT_CHANNELS);

        foreach ($channels as $channel) {
            $notification = NotificationModel::create([
                'user_id' => $user->user_id,
                'channel' => $channel,
                'category' => $category,
                'subject' => $subject,
                'body' => $body,
                'status' => 'pending',
            ]);

            SendNotificationJob::dispatch($notification);
        }
    }

    public function sendTransactionAlert(User $user, string $type, string $amount, string $reference): void
    {
        $this->send(
            $user,
            "Transaction Alert: {$type}",
            "A {$type} of {$amount} has been processed. Reference: {$reference}",
            'transaction',
            self::TRANSACTION_CHANNELS,
        );
    }

    public function sendSecurityAlert(User $user, string $event, array $details = []): void
    {
        $body = "A security event occurred on your account: {$event}. "
            .($details['ip'] ?? '').' '
            .($details['device'] ?? '');

        $this->send($user, "Security Alert: {$event}", trim($body), 'security', self::SECURITY_CHANNELS);
    }

    public function getUnreadCount(int $userId): int
    {
        return NotificationModel::where('user_id', $userId)
            ->where('channel', NotificationChannel::IN_APP)
            ->whereNull('read_at')
            ->count();
    }

    public function markAllAsRead(int $userId): void
    {
        NotificationModel::where('user_id', $userId)
            ->whereNull('read_at')
            ->update(['read_at' => now()]);
    }

    /**
     * @param  array<int, NotificationChannel|string>  $channels
     * @return array<int, NotificationChannel>
     */
    private function normalizeChannels(array $channels): array
    {
        return array_map(
            fn ($c) => $c instanceof NotificationChannel ? $c : NotificationChannel::from((string) $c),
            $channels,
        );
    }
}
