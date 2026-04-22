<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'transaction_id' => $this->transaction_id,
            'reference' => $this->reference,
            'type' => $this->type->value,
            'amount' => $this->amount,
            'currency' => $this->currency,
            'status' => $this->status->value,
            'narration' => $this->narration,
            'posted_at' => $this->posted_at?->toIso8601String(),
            'source_account' => $this->sourceAccount?->account_number,
            'destination_account' => $this->destinationAccount?->account_number,
        ];
    }
}
