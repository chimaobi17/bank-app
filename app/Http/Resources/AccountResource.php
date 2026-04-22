<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'account_id' => $this->account_id,
            'account_number' => $this->account_number,
            'account_type' => $this->account_type->value,
            'balance' => $this->balance,
            'available_balance' => $this->available_balance,
            'currency' => $this->currency,
            'status' => $this->status->value,
            'opened_at' => $this->opened_at?->toIso8601String(),
            'branch' => $this->branch?->name,
        ];
    }
}
