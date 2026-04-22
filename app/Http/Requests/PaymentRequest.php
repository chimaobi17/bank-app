<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'account_id' => 'required|integer|exists:accounts,account_id',
            'biller_id' => 'nullable|integer|exists:billers,biller_id',
            'payment_type' => 'required|string|in:bill,airtime,data,utility',
            'amount' => 'required|numeric|min:50',
            'recipient_identifier' => 'required|string|max:100',
            'narration' => 'nullable|string|max:100',
            'scheduled_for' => 'nullable|date|after:now',
            'is_recurring' => 'nullable|boolean',
            'frequency' => 'nullable|string|in:daily,weekly,monthly',
        ];
    }
}
