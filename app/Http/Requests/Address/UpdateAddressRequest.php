<?php

namespace App\Http\Requests\Address;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAddressRequest extends FormRequest
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
            'province_code' => ['required', 'digits:9'],
            'province_name' => ['required', 'string'],
            'city_municipality_code' => ['required', 'digits:9'],
            'city_municipality_name' => ['required', 'string', 'max:100'],
            'barangay_code' => ['required', 'digits:9'],
            'barangay_name' => ['required', 'string', 'max:100'],
            'street' => ['nullable', 'string', 'max:150'],
            'zip_code' => ['required', 'digits:4'],
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'The :attribute field is required.',
            'string' => 'The :attribute must be a string.',
            'max' => 'The :attribute may not be greater than :max characters.',
            'digits' => 'The :attribute must be :digits digits.',
        ];
    }
}
