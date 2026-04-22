<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:100',
            'email' => 'required|email|unique:customers,email|unique:users,email',
            'phone' => 'required|string|max:20|unique:customers,phone|unique:users,phone',
            'dob' => 'required|date|before:-18 years',
            'address' => 'required|string|max:255',
            'nationality' => 'required|string|max:50',
            'gov_id' => 'required|string|max:50',
            'username' => 'required|string|min:4|max:50|unique:users,username|alpha_dash',
            'password' => ['required', 'confirmed', Password::min(8)->mixedCase()->numbers()->symbols()],
        ];
    }
}
