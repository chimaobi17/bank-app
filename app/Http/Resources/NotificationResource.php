<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'notification_id' => $this->notification_id,
            'channel' => $this->channel->value,
            'category' => $this->category,
            'subject' => $this->subject,
            'body' => $this->body,
            'status' => $this->status,
            'read_at' => $this->read_at?->toIso8601String(),
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
