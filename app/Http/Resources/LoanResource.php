<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'loan_id' => $this->loan_id,
            'product' => $this->product->label(),
            'principal' => $this->principal,
            'interest_rate' => $this->interest_rate,
            'tenor_months' => $this->tenor_months,
            'status' => $this->status->value,
            'outstanding_balance' => $this->outstanding_balance,
            'total_interest' => $this->total_interest,
            'total_paid' => $this->total_paid,
            'applied_at' => $this->created_at->toIso8601String(),
            'approved_at' => $this->approved_at?->toIso8601String(),
            'disbursed_at' => $this->disbursed_at?->toIso8601String(),
        ];
    }
}
