<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Enums\LoanProduct;

class LoanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product' => 'required|string',
            'principal' => 'required|numeric|min:1000',
            'interest_rate' => 'required|numeric|min:0.01',
            'tenor_months' => 'required|integer|min:1|max:60',
            'purpose' => 'required|string|max:255',
            'monthly_income' => 'required|numeric|min:0',
        ];
    }
}
