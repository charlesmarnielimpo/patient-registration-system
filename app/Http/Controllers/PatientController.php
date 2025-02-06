<?php

namespace App\Http\Controllers;

use App\Enums\BloodType;
use App\Enums\CivilStatus;
use App\Enums\EducationalAttainment;
use App\Enums\EmployementStatus;
use App\Enums\Prefix;
use App\Enums\Sex;
use App\Enums\Suffix;
use App\Http\Requests\Address\StoreAddressRequest;
use App\Http\Requests\Address\UpdateAddressRequest;
use App\Http\Requests\Patient\StorePatientRequest;
use App\Http\Requests\Patient\UpdatePatientRequest;
use App\Models\Patient;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        return Inertia::render('Patient/PatientIndex', [
            'patients' => fn() => Patient::get(),
            'prefixes' => Prefix::cases(),
            'suffixes' => Suffix::cases(),
            'sexes' => Sex::cases(),
            'civilStatuses' => CivilStatus::cases(),
            'educationalAttainments' => EducationalAttainment::cases(),
            'bloodTypes' => BloodType::cases(),
            'employmentStatuses' => EmployementStatus::cases(),
        ]);
    }

    public function store(StorePatientRequest $request, StoreAddressRequest $addressRequest)
    {
        $patient = Patient::create($request->validated());
        $patient->address()->create($addressRequest->validated());

        return redirect()->back();
    }

    public function update(UpdatePatientRequest $request, UpdateAddressRequest $addressRequest, Patient $patient)
    {
        $patient->update($request->validated());
        $patient->address()->update($addressRequest->validated());

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $patient->delete();

        return redirect()->back();
    }
}
