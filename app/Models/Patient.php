<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Crypt;

class Patient extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'prefix',
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'sex',
        'birth_date',
        'civil_status',
        'employment_status',
        'educational_attainment',
        'blood_type',
        'mobile_number',
        'email',
    ];

    protected $dates = ['birth_date'];

    protected $appends = ['complete_name'];

    protected $with = ['address'];

    protected function firstName(): Attribute
    {
        return new Attribute(
            get: fn ($value) => $value ? Crypt::decryptString($value) : null,
            set: fn ($value) => $value ? Crypt::encryptString($value) : null,
        );
    }

    protected function middleName(): Attribute
    {
        return new Attribute(
            get: fn ($value) => $value ? Crypt::decryptString($value) : null,
            set: fn ($value) => $value ? Crypt::encryptString($value) : null,
        );
    }

    protected function lastName(): Attribute
    {
        return new Attribute(
            get: fn ($value) => $value ? Crypt::decryptString($value) : null,
            set: fn ($value) => $value ? Crypt::encryptString($value) : null,
        );
    }

    protected function suffix(): Attribute
    {
        return new Attribute(
            get: fn ($value) => $value ? Crypt::decryptString($value) : null,
            set: fn ($value) => $value ? Crypt::encryptString($value) : null,
        );
    }

    protected function mobileNumber(): Attribute
    {
        return new Attribute(
            get: fn ($value) => $value ? Crypt::decryptString($value) : null,
            set: fn ($value) => $value ? Crypt::encryptString($value) : null,
        );
    }

    protected function email(): Attribute
    {
        return new Attribute(
            get: fn ($value) => $value ? Crypt::decryptString($value) : null,
            set: fn ($value) => $value ? Crypt::encryptString($value) : null,
        );
    }

    protected function completeName(): Attribute
    {
        return new Attribute(
            get: fn (): string => $this->generateCompleteName(),
        );
    }

    protected function generateCompleteName()
    {
        $name_parts = [
            $this->first_name,
            $this->middle_name,
            $this->last_name,
            $this->suffix,
        ];

        $filtered_name = array_filter($name_parts);

        $name = implode(' ', $filtered_name);

        return $name;
    }

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }
}
