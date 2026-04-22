<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BillerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'biller_id' => $this->biller_id,
            'name' => $this->name,
            'code' => $this->code,
            'category' => $this->category,
            'logo_path' => $this->logo_path,
        ];
    }
}
