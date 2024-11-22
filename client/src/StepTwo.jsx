import { useState } from "react";
import DynamicInputFields from "./DynamicInputFields";

const StepTwo = ({ formData, setFormData, errors, setErrors, handleBlur }) => {

  const countries = [
    'China', 'Japan', 'Korea', 'Thailand', 'Indonesia',
    'Malaysia', 'India', 'Myanmar', 'Vietnam', 'Philippines',
    'Commonwealth of Independent States'
  ];

  const [selectedCountries, setSelectedCountries] = useState(formData.selectedCountries || []);
  const [otherCountry, setOtherCountry] = useState(formData.otherCountry || "");

  const handleCheckboxChange = (country) => {
    let updatedSelectedCountries;
    if (selectedCountries.includes(country)) {
      updatedSelectedCountries = selectedCountries.filter(item => item !== country);
    } else {
      updatedSelectedCountries = [...selectedCountries, country];
    }
    setSelectedCountries(updatedSelectedCountries);
    setFormData({ ...formData, selectedCountries: updatedSelectedCountries });

    // Validate immediately
    validateCountries(updatedSelectedCountries, otherCountry);
  };

  const handleOtherCountryChange = (e) => {
    setOtherCountry(e.target.value);
    setFormData({ ...formData, otherCountry: e.target.value });

    // Validate immediately
    validateCountries(selectedCountries, e.target.value);
  };

  const validateCountries = (selectedCountries, otherCountry = "") => {
    let countryError = "";
    if (selectedCountries.length === 0) {
      countryError = "The Main Operations Market field must have a value.";
    } else if (selectedCountries.includes("Other") && !otherCountry.trim()) {
      countryError = "If Other is checked, please provide additional information.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, selectedCountries: countryError }));
  };




  const handleAdminEmailChange = (newAdminEmail) => {
    setFormData({ ...formData, adminEmail: newAdminEmail });
  };



  return (
    <div className="space-y-8">
      {/* Company Name */}
      <div>
        <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
          Company Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          placeholder="Please input"
          value={formData.companyName}
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
          onBlur={() => handleBlur("companyName")} // Trigger blur validation
          className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.companyName
              ? "border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]"
              : "border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]"
            }`}
        />
        {errors.companyName && (
          <p className="text-red-500 text-sm">{errors.companyName}</p>
        )}
      </div>

      {/* Contact Email */}
      <div>
        <label className="block text-sm font-medium text-[#1F2225]">
          Bo Admin Email <span className="text-red-600">*</span>
        </label>
        <DynamicInputFields
          values={formData.adminEmail}
          onChange={handleAdminEmailChange}
          placeholder="Please input"
          onBlur={(index) => handleBlur("adminEmail")}
          errors={errors.adminEmail}
        />
        {errors.adminEmail && (
          <span className="text-red-600 text-sm">{errors.adminEmail}</span>
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
                                <p className="font-normal text-sm text-white p-3 text-center">Market</p>
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
                                    {selectedCountries.includes('Other') && (
                                        <input
                                            type="text"
                                            value={otherCountry}
                                            onChange={handleOtherCountryChange}
                                            onBlur={() => handleBlur('selectedCountries')}
                                            className="border border-gray-300 rounded-sm p-2"
                                            placeholder="Please specify"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        {errors.selectedCountries && <p className="text-red-600">{errors.selectedCountries}</p>}
                    </div>
                </div>
            </div>
    </div>
  );
};

export default StepTwo;
