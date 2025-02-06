<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Crypt;

class Address extends Model
{
    use SoftDeletes;

    protected $fillable = ['province_code', 'province_name', 'city_municipality_code', 'city_municipality_name', 'barangay_code', 'barangay_name', 'street', 'zip_code'];

    protected $appends = ['complete_address'];

    public function addressable()
    {
        return $this->morphTo();
    }

    protected function completeAddress(): Attribute
    {
        return new Attribute(
            get: fn () => $this->generateAddress(),
        );
    }

    protected function generateAddress()
    {
        $address_parts = [
            $this->street,
            $this->barangay_name,
            $this->city_municipality_name,
            $this->province_name,
        ];

        $filtered_address = array_filter($address_parts);

        $address = implode(', ', $filtered_address);

        return $address;
    }
}
