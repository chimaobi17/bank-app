<?php

namespace App\Models;

use App\Enums\NotificationChannel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    protected $primaryKey = 'notification_id';

    protected $fillable = [
        'user_id', 'channel', 'category', 'subject',
        'body', 'status', 'sent_at', 'read_at',
    ];

    protected function casts(): array
    {
        return [
            'channel' => NotificationChannel::class,
            'sent_at' => 'datetime',
            'read_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function markAsRead(): void
    {
        $this->update(['read_at' => now()]);
    }
}
