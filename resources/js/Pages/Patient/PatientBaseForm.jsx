import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { DatePicker } from "@/Components/DatePicker";
import InputError from "@/Components/InputError";
import Address from "./Address";

const PatientBaseForm = ({
    formHandler,
    prefixes,
    suffixes,
    sexes,
    civilStatuses,
    educationalAttainments,
    bloodTypes,
    employmentStatuses,
}) => {
    const [formData, setFormData] = useState(formHandler.data);

    const handleDateChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        formHandler.setData(name, value);
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="grid gap-4">
                <h2 className="font-semibold tracking-tighter inline-flex border-b-2 border-green-600">
                    Personal Information
                </h2>
                <div className="flex items-start space-x-4">
                    <div className="grid gap-1.5 w-1/2">
                        <Label htmlFor="prefix" optional>
                            Prefix
                        </Label>
                        <Select
                            id="prefix"
                            name="prefix"
                            onValueChange={(value) =>
                                formHandler.setData("prefix", value)
                            }
                            value={formHandler.data.prefix}
                        >
                            <SelectTrigger
                                id="prefix"
                                hasError={formHandler.errors.prefix}
                            >
                                <SelectValue placeholder="Select Prefix" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {prefixes.map((prefix) => (
                                        <SelectItem value={prefix} key={prefix}>
                                            {prefix}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={formHandler.errors.prefix} />
                    </div>

                    <div className="grid gap-1.5 w-full">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input
                            id="first-name"
                            type="text"
                            name="first_name"
                            placeholder="Juan"
                            autoComplete="on"
                            hasError={formHandler.errors.first_name}
                            value={formHandler.data.first_name}
                            onChange={(e) =>
                                formHandler.setData(
                                    "first_name",
                                    e.target.value
                                )
                            }
                        />
                        <InputError message={formHandler.errors.first_name} />
                    </div>

                    <div className="grid gap-1.5 w-full">
                        <Label htmlFor="middle-name" optional>
                            Middle Name
                        </Label>
                        <Input
                            id="middle-name"
                            type="text"
                            name="middle_name"
                            placeholder="Dela"
                            autoComplete="on"
                            hasError={formHandler.errors.middle_name}
                            value={formHandler.data.middle_name}
                            onChange={(e) =>
                                formHandler.setData(
                                    "middle_name",
                                    e.target.value
                                )
                            }
                        />
                        <InputError message={formHandler.errors.middle_name} />
                    </div>

                    <div className="grid gap-1.5 w-full">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                            id="last-name"
                            type="text"
                            name="last_name"
                            placeholder="Cruz"
                            autoComplete="on"
                            hasError={formHandler.errors.last_name}
                            value={formHandler.data.last_name}
                            onChange={(e) =>
                                formHandler.setData("last_name", e.target.value)
                            }
                        />
                        <InputError message={formHandler.errors.last_name} />
                    </div>

                    <div className="grid gap-1.5 w-1/2">
                        <Label htmlFor="suffix" optional>
                            Suffix
                        </Label>
                        <Select
                            id="suffix"
                            name="suffix"
                            onValueChange={(value) =>
                                formHandler.setData("suffix", value)
                            }
                            value={formHandler.data.suffix}
                        >
                            <SelectTrigger
                                id="suffix"
                                hasError={formHandler.errors.suffix}
                            >
                                <SelectValue placeholder="Select Suffix" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {suffixes.map((suffix) => (
                                        <SelectItem value={suffix} key={suffix}>
                                            {suffix}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={formHandler.errors.suffix} />
                    </div>
                </div>

                <div className="flex items-start space-x-4 w-1/2">
                    <div className="grid gap-1.5 w-full">
                        <Label htmlFor="sex">Sex</Label>
                        <Select
                            id="sex"
                            name="sex"
                            onValueChange={(value) =>
                                formHandler.setData("sex", value)
                            }
                            value={formHandler.data.sex}
                        >
                            <SelectTrigger
                                id="sex"
                                hasError={formHandler.errors.sex}
                            >
                                <SelectValue placeholder="Select Sex" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {sexes.map((sex) => (
                                        <SelectItem value={sex} key={sex}>
                                            {sex}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={formHandler.errors.sex} />
                    </div>

                    <div className="grid gap-1.5 w-full">
                        <Label htmlFor="birth-date">Birth Date</Label>
                        <DatePicker
                            id="birth-date"
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleDateChange}
                        />
                        <InputError message={formHandler.errors.birth_date} />
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                <h2 className="font-semibold tracking-tighter inline-flex border-b-2 border-green-600">
                    Other Personal Information
                </h2>
                <div className="flex items-start space-x-4">
                    <div className="grid gap-1.5 w-full">
                        <Label htmlFor="civil-status">Civil Status</Label>
                        <Select
                            name="civil_status"
                            onValueChange={(value) =>
                                formHandler.setData("civil_status", value)
                            }
                            value={formHandler.data.civil_status}
                        >
                            <SelectTrigger
                                id="civil-status"
                                hasError={formHandler.errors.civil_status}
                            >
                                <SelectValue placeholder="Select Civil Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {civilStatuses.map((civilStatus) => (
                                        <SelectItem
                                            value={civilStatus}
                                            key={civilStatus}
                                        >
                                            {civilStatus}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={formHandler.errors.civil_status} />
                    </div>

                    <div className="grid gap-1.5 w-full">
                        <Label htmlFor="educational-attainment">
                            Educational Attainment
                        </Label>
                        <Select
                            name="educational_attainment"
                            onValueChange={(value) =>
                                formHandler.setData(
                                    "educational_attainment",
                                    value
                                )
                            }
                            value={formHandler.data.educational_attainment}
                        >
                            <SelectTrigger
                                id="educational-attainment"
                                hasError={
                                    formHandler.errors.educational_attainment
                                }
                            >
                                <SelectValue placeholder="Select Educational Attainment" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {educationalAttainments.map(
                                        (educationalAttainment) => (
                                            <SelectItem
                                                value={educationalAttainment}
                                                key={educationalAttainment}
                                            >
                                                {educationalAttainment}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError
                            message={formHandler.errors.educational_attainment}
                        />
                    </div>

                    <div className="grid gap-1.5 w-full">
                        <Label htmlFor="blood-type">Blood Type</Label>
                        <Select
                            name="blood_type"
                            onValueChange={(value) =>
                                formHandler.setData("blood_type", value)
                            }
                            value={formHandler.data.blood_type}
                        >
                            <SelectTrigger
                                id="blood-type"
                                hasError={formHandler.errors.blood_type}
                            >
                                <SelectValue placeholder="Select Blood Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {bloodTypes.map((bloodType) => (
                                        <SelectItem
                                            value={bloodType}
                                            key={bloodType}
                                        >
                                            {bloodType}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError message={formHandler.errors.blood_type} />
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="grid gap-1.5 w-full">
                        <Label htmlFor="employment-status">
                            Employment Status
                        </Label>
                        <Select
                            name="employment_status"
                            onValueChange={(value) =>
                                formHandler.setData("employment_status", value)
                            }
                            value={formHandler.data.employment_status}
                        >
                            <SelectTrigger
                                id="employment-status"
                                hasError={formHandler.errors.employment_status}
                            >
                                <SelectValue placeholder="Select Employment Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {employmentStatuses.map(
                                        (employmentStatus) => (
                                            <SelectItem
                                                value={employmentStatus}
                                                key={employmentStatus}
                                            >
                                                {employmentStatus}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputError
                            message={formHandler.errors.employment_status}
                        />
                    </div>

                    <div className="grid gap-1.5 w-full">
                        <Label htmlFor="mobile-number" optional>
                            Mobile Number
                        </Label>
                        <Input
                            id="mobile-number"
                            type="text"
                            name="mobile_number"
                            placeholder="0927555333"
                            autoComplete="on"
                            maxLength="11"
                            hasError={formHandler.errors.mobile_number}
                            value={formHandler.data.mobile_number}
                            onChange={(e) =>
                                formHandler.setData(
                                    "mobile_number",
                                    e.target.value
                                )
                            }
                        />
                        <InputError
                            message={formHandler.errors.mobile_number}
                        />
                    </div>

                    <div className="grid gap-1.5 w-full">
                        <Label htmlFor="email" optional>
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="juan.delacruz@gmail.com"
                            autoComplete="on"
                            hasError={formHandler.errors.email}
                            value={formHandler.data.email}
                            onChange={(e) =>
                                formHandler.setData("email", e.target.value)
                            }
                        />
                        <InputError message={formHandler.errors.email} />
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                <h2 className="font-semibold tracking-tighter inline-flex border-b-2 border-green-600">
                    Address
                </h2>

                <Address formHandler={formHandler} />
            </div>
        </div>
    );
};

export default PatientBaseForm;
