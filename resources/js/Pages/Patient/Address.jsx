import { useEffect, useState } from "react";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import InputError from "@/Components/InputError";
import { Input } from "@/Components/ui/input";

const Address = ({ formHandler }) => {
    const [provinces, setProvinces] = useState([]);
    const [cityMunicipalities, setCityMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]);

    useEffect(() => {
        if (formHandler.data.address) {
            if (
                !formHandler.data.province_code &&
                formHandler.data.address.province_code
            ) {
                formHandler.setData((prevState) => ({
                    ...prevState,
                    province_code: formHandler.data.address.province_code,
                    province_name: formHandler.data.address.province_name,
                }));
            }

            if (
                !formHandler.data.city_municipality_code &&
                formHandler.data.address.city_municipality_code
            ) {
                formHandler.setData((prevState) => ({
                    ...prevState,
                    city_municipality_code:
                        formHandler.data.address.city_municipality_code,
                    city_municipality_name:
                        formHandler.data.address.city_municipality_name,
                }));
            }

            if (
                !formHandler.data.barangay_code &&
                formHandler.data.address.barangay_code
            ) {
                formHandler.setData((prevState) => ({
                    ...prevState,
                    barangay_code: formHandler.data.address.barangay_code,
                    barangay_name: formHandler.data.address.barangay_name,
                }));
            }

            if (!formHandler.data.street && formHandler.data.address.street) {
                formHandler.setData((prevState) => ({
                    ...prevState,
                    street: formHandler.data.address.street,
                }));
            }
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://psgc.gitlab.io/api/regions/050000000/provinces/"
                );

                const provinceData = response.data;
                const sortedProvince = Object.values(provinceData).sort(
                    (a, b) => a.name.localeCompare(b.name)
                );

                setProvinces(sortedProvince);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
            }
        };

        fetchData();
    }, [formHandler.data.address, formHandler]);

    const handleChangeProvince = (e) => {
        const selectedValue = e;
        const selectedProvince = provinces.find(
            (province) => province.code === selectedValue
        );

        formHandler.setData((prevState) => ({
            ...prevState,
            province_code: selectedValue,
            province_name: selectedProvince ? selectedProvince.name : "",
        }));
    };

    useEffect(() => {}, [formHandler.data]);

    useEffect(() => {
        const fetchCityMunicipalities = async () => {
            try {
                const provinceCode = formHandler.data.province_code;

                if (provinceCode) {
                    const response = await axios.get(
                        `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`
                    );
                    const citiesData = response.data;
                    const sortedCities = Object.values(citiesData).sort(
                        (a, b) => a.name.localeCompare(b.name)
                    );

                    setCityMunicipalities(sortedCities);
                }
            } catch (error) {
                console.error(
                    "There was an error fetching the city municipalities!",
                    error
                );
            }
        };

        fetchCityMunicipalities();
    }, [formHandler.data.province_code]);

    const handleChangeCityMunicipality = (e) => {
        const selectedValue = e;
        const selectedCityMunicipality = cityMunicipalities.find(
            (cityMunicipality) => cityMunicipality.code === selectedValue
        );

        formHandler.setData((prevState) => ({
            ...prevState,
            city_municipality_code: selectedValue,
            city_municipality_name: selectedCityMunicipality
                ? selectedCityMunicipality.name
                : "",
        }));
    };

    useEffect(() => {
        const fetchBarangay = async () => {
            try {
                const cityMunicipalityCode =
                    formHandler.data.city_municipality_code;

                if (cityMunicipalityCode) {
                    const response = await axios.get(
                        `https://psgc.gitlab.io/api/cities-municipalities/${cityMunicipalityCode}/barangays`
                    );
                    const barangayData = response.data;
                    const sortedBarangay = Object.values(barangayData).sort(
                        (a, b) => a.name.localeCompare(b.name)
                    );

                    setBarangays(sortedBarangay);
                } else {
                    setBarangays([]);
                    formHandler.setData("barangay_code", "");
                    formHandler.setData("barangay_name", "");
                }
            } catch (error) {
                console.error(
                    "There was an error fetching the barangays!",
                    error
                );
            }
        };

        fetchBarangay();
    }, [formHandler.data.city_municipality_code]);

    const handleChangeBarangay = (e) => {
        const selectedValue = e;
        const selectedBarangay = barangays.find(
            (barangay) => barangay.code === selectedValue
        );

        formHandler.setData((prevState) => ({
            ...prevState,
            barangay_code: selectedValue,
            barangay_name: selectedBarangay ? selectedBarangay.name : "",
        }));
    };

    return (
        <div className="flex items-start space-x-4">
            <div className="grid gap-1.5 w-full">
                <Label htmlFor="street" optional>
                    House No/Street/Purok
                </Label>
                <Input
                    id="street"
                    type="text"
                    name="street"
                    placeholder="Sitio Liko-Liko"
                    autoComplete="on"
                    hasError={formHandler.errors.street}
                    value={formHandler.data.street}
                    onChange={(e) =>
                        formHandler.setData("street", e.target.value)
                    }
                />
                <InputError message={formHandler.errors.street} />
            </div>

            <div className="grid gap-1.5 w-full">
                <Label htmlFor="province">Province</Label>
                <Select
                    name="province_code"
                    onValueChange={handleChangeProvince}
                    value={
                        formHandler.data.province_code ||
                        formHandler.data.address?.province_code ||
                        ""
                    }
                >
                    <SelectTrigger
                        id="province"
                        disabled={provinces.length < 1}
                        hasError={formHandler.errors.province_code}
                    >
                        <SelectValue placeholder="Select Province" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {provinces.map((province) => (
                                <SelectItem
                                    key={province.code}
                                    value={province.code}
                                >
                                    {province.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <InputError message={formHandler.errors.province_code} />
            </div>

            <div className="grid gap-1.5 w-full">
                <Label htmlFor="city-municipality">City/Municipality</Label>
                <Select
                    name="city_municipality_code"
                    onValueChange={handleChangeCityMunicipality}
                    value={
                        formHandler.data.city_municipality_code ||
                        formHandler.data.address?.city_municipality_code ||
                        ""
                    }
                >
                    <SelectTrigger
                        id="city-municipality"
                        disabled={cityMunicipalities.length < 1}
                        hasError={formHandler.errors.city_municipality_code}
                    >
                        <SelectValue placeholder="Select City/Municipality" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {cityMunicipalities.map((cityMunicipality) => (
                                <SelectItem
                                    key={cityMunicipality.code}
                                    value={cityMunicipality.code}
                                >
                                    {cityMunicipality.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <InputError
                    message={formHandler.errors.city_municipality_code}
                />
            </div>

            <div className="grid gap-1.5 w-full">
                <Label htmlFor="barangay">Barangay</Label>
                <Select
                    name="barangay_code"
                    onValueChange={handleChangeBarangay}
                    value={
                        formHandler.data.barangay_code ||
                        formHandler.data.address?.barangay_code ||
                        ""
                    }
                >
                    <SelectTrigger
                        id="barangay"
                        disabled={barangays.length < 1}
                        hasError={formHandler.errors.barangay_code}
                    >
                        <SelectValue placeholder="Select Barangay" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {barangays.map((barangay) => (
                                <SelectItem
                                    key={barangay.code}
                                    value={barangay.code}
                                >
                                    {barangay.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <InputError message={formHandler.errors.barangay_code} />
            </div>

            <div className="grid gap-1.5 w-full">
                <Label htmlFor="zip-code">Zip Code</Label>
                <Input
                    id="zip-code"
                    type="text"
                    name="zip_code"
                    placeholder="4500"
                    autoComplete="on"
                    hasError={formHandler.errors.zip_code}
                    value={formHandler.data.zip_code}
                    onChange={(e) =>
                        formHandler.setData("zip_code", e.target.value)
                    }
                />
                <InputError message={formHandler.errors.zip_code} />
            </div>
        </div>
    );
};

export default Address;
