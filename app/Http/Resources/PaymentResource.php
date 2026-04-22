<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'payment_id' => $this->payment_id,
            'payment_type' => $this->payment_type,
            'amount' => $this->amount,
            'currency' => $this->currency,
            'status' => $this->status->value,
            'recipient_identifier' => $this->recipient_identifier,
            'narration' => $this->narration,
            'biller' => $this->biller?->name,
            'scheduled_for' => $this->scheduled_for?->toIso8601String(),
            'is_recurring' => $this->is_recurring,
            'frequency' => $this->frequency,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
