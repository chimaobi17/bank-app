<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OpenAccountRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'account_type' => 'required|string|in:savings,checking,fixed_deposit',
            'currency' => 'nullable|string|size:3',
            'branch_id' => 'nullable|integer|exists:branches,branch_id',
            'lock_in_months' => 'required_if:account_type,fixed_deposit|integer|min:1|max:60',
            'overdraft_limit' => 'nullable|numeric|min:0',
        ];
    }
}
