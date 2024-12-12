import React, { useState } from 'react';
import { Country, State, City } from 'country-state-city';

const Form = ({ formData, setFormData, errors, setErrors, handleBlur }) => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const handleCountryChange = (e) => {
        const countryIsoCode = e.target.value;
        const country = Country.getAllCountries().find(c => c.isoCode === countryIsoCode);
        setSelectedCountry(countryIsoCode);
        setSelectedState('');
        setFormData({ ...formData, targetCountry: country.name, targetState: '', targetCity: '' });
    };

    const handleStateChange = (e) => {
        const stateIsoCode = e.target.value;
        const state = State.getStatesOfCountry(selectedCountry).find(s => s.isoCode === stateIsoCode);
        setSelectedState(stateIsoCode);
        setFormData({ ...formData, targetState: state.name, targetCity: '' });
    };

    const handleCityChange = (e) => {
        const city = e.target.value;
        setFormData({ ...formData, targetCity: city });
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

            {/* Company Name */}
            <div>
                <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
                    Client Email <span className="text-red-600">*</span>
                </label>
                <input
                    type="email"
                    placeholder="Please input"
                    value={formData.clientEmail}
                    onChange={(e) =>
                        setFormData({ ...formData, clientEmail: e.target.value })
                    }
                    onBlur={() => handleBlur("clientEmail")} // Trigger blur validation
                    className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.clientEmail
                            ? "border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]"
                            : "border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]"
                        }`}
                />
                {errors.clientEmail && (
                    <p className="text-red-500 text-sm">{errors.clientEmail}</p>
                )}
            </div>


            {/* Customer No. */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Client Contact No. <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="clientContactNo"
                    value={formData.clientContactNo}
                    onChange={(e) =>
                        setFormData({ ...formData, clientContactNo: e.target.value })
                    }
                    onBlur={() => handleBlur("clientContactNo")}
                    className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                        ${errors.clientContactNo ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                />
                {errors.clientContactNo && <p className="text-red-500 text-sm">{errors.clientContactNo}</p>}
            </div>


            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Category <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                    }
                    onBlur={() => handleBlur("category")}
                    className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                        ${errors.category ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                />
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>





            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Target Country <span className="text-red-600">*</span>
                </label>
                <select
                    name="targetCountry"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    onBlur={() => handleBlur("targetCountry")}
                    className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                        ${errors.targetCountry ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                >
                    <option value="">Select Country</option>
                    {Country.getAllCountries().map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                        </option>
                    ))}
                </select>
                {errors.targetCountry && <p className="text-red-500 text-sm">{errors.targetCountry}</p>}
            </div>

            {/* Target State */}
            {selectedCountry && (
                <div>
                    <label className="block text-sm font-medium text-[#1F2225]">
                        Target State <span className="text-red-600">*</span>
                    </label>
                    <select
                        name="targetState"
                        value={selectedState}
                        onChange={handleStateChange}
                        onBlur={() => handleBlur("targetState")}
                        className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.targetState ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                    >
                        <option value="">Select State</option>
                        {State.getStatesOfCountry(selectedCountry).map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                    {errors.targetState && <p className="text-red-500 text-sm">{errors.targetState}</p>}
                </div>
            )}

            {/* Target City */}
            {selectedState && (
                <div>
                    <label className="block text-sm font-medium text-[#1F2225]">
                        Target City <span className="text-red-600">*</span>
                    </label>
                    <select
                        name="targetCity"
                        value={formData.targetCity}
                        onChange={handleCityChange}
                        onBlur={() => handleBlur("targetCity")}
                        className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.targetCity ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                    >
                        <option value="">Select City</option>
                        {City.getCitiesOfState(selectedCountry, selectedState).map((city) => (
                            <option key={city.name} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                    {errors.targetCity && <p className="text-red-500 text-sm">{errors.targetCity}</p>}
                </div>
            )}


            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Description <span className="text-red-600">*</span>
                </label>
                <textarea
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    onBlur={() => handleBlur("description")}
                    className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                        ${errors.description ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>



        </div>
    );
};

export default Form;