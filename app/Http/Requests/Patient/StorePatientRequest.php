<?php

namespace App\Http\Requests\Patient;

use App\Enums\BloodType;
use App\Enums\CivilStatus;
use App\Enums\EducationalAttainment;
use App\Enums\EmployementStatus;
use App\Enums\Prefix;
use App\Enums\Sex;
use App\Enums\Suffix;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePatientRequest extends FormRequest
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
            'prefix' => ['nullable', 'string', Rule::in(Prefix::cases())],
            'first_name' => ['required', 'regex:/^[A-Za-z]+([ .\'*-][A-Za-z]+)*$/'],
            'middle_name' => ['nullable', 'regex:/^[A-Za-z]+([ .\'*-][A-Za-z]+)*$/'],
            'last_name' => ['required', 'regex:/^[A-Za-z]+([ .\'*-][A-Za-z]+)*$/'],
            'suffix' => ['nullable', 'string', Rule::in(Suffix::cases())],
            'sex' => ['required', 'string', Rule::in(Sex::cases())],
            'birth_date' => ['required', 'date'],
            'civil_status' => ['required', 'string', Rule::in(CivilStatus::cases())],
            'educational_attainment' => ['required', 'string', Rule::in(EducationalAttainment::cases())],
            'blood_type' => ['required', 'string', Rule::in(BloodType::cases())],
            'employment_status' => ['required', 'string', Rule::in(EmployementStatus::cases())],
            'email' => ['nullable', 'email'],
            'mobile_number' => ['nullable', 'regex:/^09\d{9}$/']

        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'The :attribute field is required.',
            'string' => 'The :attribute must be a string.',
            'regex' => 'The :attribute format is invalid.',
            'date' => 'The :attribute is not a valid date.',
            'in' => 'The selected :attribute is invalid.',
            'email' => 'The :attribute must be a valid email address.',
        ];
    }
}
