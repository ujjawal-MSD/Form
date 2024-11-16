import React, { useState } from 'react'
import IncInput from '../../IncInput';

const CompanyInformation = () => {
    const countries = [
        'China', 'Japan', 'Korea', 'Thailand', 'Indonesia',
        'Malaysia', 'India', 'Myanmar', 'Vietnam', 'Philippines',
        'Commonwealth of Independent States'
    ];

    const [otherCountry, setOtherCountry] = useState('');
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [marketError, setMarketError] = useState('');

    const handleCheckboxChange = (country) => {
        const updatedCountries = selectedCountries.includes(country)
            ? selectedCountries.filter((c) => c !== country)
            : [...selectedCountries, country];

        setSelectedCountries(updatedCountries);

        // Validation: Check if any checkbox is selected
        if (updatedCountries.length === 0) {
            setMarketError('The Main Operations Market field must have a value.');
        } else if (updatedCountries.includes('Other') && !otherCountry) {
            setMarketError('If Other is checked, please provide additional information.');
        } else {
            setMarketError('');
        }
    };

    const handleOtherChange = (e) => {
        const value = e.target.value;
        setOtherCountry(value);

        // Clear error if "Other" is selected and input is provided
        if (selectedCountries.includes('Other') && value) {
            setMarketError('');
        }
    };


    // Handle Contact Email validation
    const [boAdminEmail, setBoAdminEmail] = useState([]);
    const [boAdminEmailError, setBoAdminEmailError] = useState('');
    const handelBoAdminEmailValidation = (event) => {
        const value = event.target.value.trim();
        if (!value) {
            setBoAdminEmailError('The Bo Admin Email field must have a value.');
        } else if (boAdminEmail.includes(value)) {
            setBoAdminEmailError('The Bo Admin Email field has a duplicate value.');
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            setBoAdminEmailError('The Bo Admin Email must be a valid email address.');
        } else {
            setBoAdminEmailError('');
            if (event.type === 'blur') {
                setBoAdminEmail((prevGroups) => [...prevGroups, value]);
            }
        }
    };


    // Handle Group Name validation
    const [companyNameError, setCompanyNameError] = useState('');
    const [isCompanyHasError, setIsCompanyHasError] = useState(false);

    const handleCompanyNameValidation = (event) => {
        const value = event.target.value.trim();
        if (!value) {
            setCompanyNameError('The Company Name field must have a value.');
            setIsCompanyHasError(true)
        } else {
            setCompanyNameError('');
            setIsCompanyHasError(false)
        }
    };


    return (
        <form className="space-y-8">

            {/* Company Name */}
            <div>
                <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
                    Company Name  <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Please input"
                    className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                    ${isCompanyHasError ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                    onChange={handleCompanyNameValidation}
                    onBlur={handleCompanyNameValidation}
                />
                {companyNameError && (
                    <span className="text-red-600 text-sm">{companyNameError}</span>
                )}
            </div>


            {/* Contact Email */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Bo Admin Email <span className="text-red-600">*</span>
                </label>
                <IncInput
                    type="email"
                    onChange={handelBoAdminEmailValidation}
                    onBlur={handelBoAdminEmailValidation}
                    isError={boAdminEmailError ? 1 : 0} // Pass error state to IncInput
                />
                {boAdminEmailError && (
                    <span className="text-red-600 text-sm">{boAdminEmailError}</span>
                )}
            </div>

            {/* Providers */}

            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Main Operations Market <span className="text-red-600">*</span>
                </label>
                <div className="overflow-x-auto">
                    <div className="min-w-full ">
                        <div className="bg-[#6A5F5A]">
                            <div>
                                <p className=" font-normal text-sm text-white p-3 text-center">Market</p>
                            </div>
                        </div>
                        <div className="border border-gray-200">
                            <div className="grid grid-cols-3 grid-rows-4 p-3">
                                {countries.map((country, index) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={country}
                                            checked={selectedCountries.includes(country)}
                                            onChange={() => handleCheckboxChange(country)}
                                            className="w-4 h-4 checked:bg-green-500"
                                        />
                                        <label className="px-2 font-thin text-[#333639] text-sm">{country}</label>
                                    </div>
                                ))}
                                <div className="flex items-center space-x-2">
                                    <div>
                                        <input
                                            type="checkbox"
                                            value="Other"
                                            checked={selectedCountries.includes('Other')}
                                            onChange={() => handleCheckboxChange('Other')}
                                            className="w-4 h-4 checked:bg-green-500"
                                        />
                                        <label className="px-2 font-thin text-[#333639] text-sm">Other</label>
                                    </div>
                                    <input
                                        type="text"
                                        value={otherCountry}
                                        onChange={handleOtherChange}
                                        placeholder="Please input"
                                        className="bg-transparent border-gray-300 text-sm border rounded-[3px] p-[6px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a] focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-[#36ad695d]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {marketError && (
                    <span className="text-red-600 text-sm">{marketError}</span>
                )}
            </div>
        </form>
    )
}

export default CompanyInformation