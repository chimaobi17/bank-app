<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'identifier' => 'required|string',
            'password' => 'required|string|min:8',
            'device_name' => 'nullable|string|max:100',
            'two_factor_code' => 'nullable|string|max:10',
        ];
    }
}
