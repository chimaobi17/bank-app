<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'user_id' => $this->user_id,
            'username' => $this->username,
            'email' => $this->email,
            'phone' => $this->phone,
            'status' => $this->status?->value,
            'customer' => [
                'customer_id' => $this->customer?->customer_id,
                'full_name' => $this->customer?->full_name,
                'kyc_status' => $this->customer?->kyc_status?->value,
                'email' => $this->customer?->email,
                'phone' => $this->customer?->phone,
            ],
            'roles' => $this->whenLoaded('roles', fn () => $this->roles->pluck('role_name')),
            'two_factor_enabled' => (bool) $this->two_factor_confirmed_at,
        ];
    }
}
