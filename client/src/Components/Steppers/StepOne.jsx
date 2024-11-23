import { useState, useEffect } from "react";
import DynamicInputFields from "../DynamicInputFields";

const StepOne = ({ formData, setFormData, errors, setErrors, handleBlur }) => {
    const [providers, setProviders] = useState([
        { id: "IN", name: "India", isChecked: false, currency: "INR" },
        { id: "US", name: "United States", isChecked: false, currency: "USD" },
        { id: "UK", name: "United Kingdom", isChecked: false, currency: "GBP" },
        { id: "CA", name: "Canada", isChecked: false, currency: "CAD" },
        { id: "AU", name: "Australia", isChecked: false, currency: "AUD" },
        { id: "JP", name: "Japan", isChecked: false, currency: "JPY" },
        { id: "CN", name: "China", isChecked: false, currency: "CNY" },
        { id: "FR", name: "France", isChecked: false, currency: "EUR" },
        { id: "DE", name: "Germany", isChecked: false, currency: "EUR" },
        { id: "IT", name: "Italy", isChecked: false, currency: "EUR" },
        { id: "ES", name: "Spain", isChecked: false, currency: "EUR" },
        { id: "BR", name: "Brazil", isChecked: false, currency: "BRL" },
        { id: "MX", name: "Mexico", isChecked: false, currency: "MXN" },
        { id: "ZA", name: "South Africa", isChecked: false, currency: "ZAR" },
        { id: "RU", name: "Russia", isChecked: false, currency: "RUB" },
        { id: "KR", name: "South Korea", isChecked: false, currency: "KRW" },
        { id: "SA", name: "Saudi Arabia", isChecked: false, currency: "SAR" },
        { id: "AE", name: "United Arab Emirates", isChecked: false, currency: "AED" },
        { id: "SG", name: "Singapore", isChecked: false, currency: "SGD" },
        { id: "HK", name: "Hong Kong", isChecked: false, currency: "HKD" },
        { id: "NZ", name: "New Zealand", isChecked: false, currency: "NZD" },
        { id: "SE", name: "Sweden", isChecked: false, currency: "SEK" },
        { id: "CH", name: "Switzerland", isChecked: false, currency: "CHF" },
        { id: "NO", name: "Norway", isChecked: false, currency: "NOK" },
        { id: "DK", name: "Denmark", isChecked: false, currency: "DKK" },
    ]);




    const handleWalletTypeChange = (e) => {
        setFormData({ ...formData, walletType: e.target.value });
    };


    const handleHostingLocationChange = (e) => {
        setFormData({ ...formData, hostingLocation: e.target.value });
    };

    const validateProvider = (updatedProviders) => {
        let providerError = "";
        if (updatedProviders.every(provider => !provider.isChecked)) {
            providerError = "The Provider field is required.";
        }
        setErrors((prevErrors) => ({ ...prevErrors, provider: providerError }));
    };

    const handleProviderChange = (providerId) => {
        const updatedProviders = providers.map(provider =>
            provider.id === providerId ? { ...provider, isChecked: !provider.isChecked } : provider
        );
        setProviders(updatedProviders);

        const selectedProviders = updatedProviders.filter(provider => provider.isChecked).map(provider => ({
            id: provider.id,
            name: provider.name,
            currency: provider.currency,
        }));
        setFormData({ ...formData, provider: selectedProviders });

        validateProvider(updatedProviders);
    };



    return (
        <>
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

                {/* Company URL */}
                <div>
                    <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
                        Company URL  <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="url"
                        placeholder="Please input"
                        value={formData.companyUrl}
                        onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
                        onBlur={() => handleBlur('companyUrl')} // Trigger blur validation
                        className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.companyUrl ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                    />
                    {errors.companyUrl && <p className="text-red-500 text-sm">{errors.companyUrl}</p>}
                </div>

                {/* Hosting Location */}
                <div>
                    <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
                        Hosting Location <span className="text-red-600">*</span>
                    </label>
                    <select
                        className={`w-full bg-transparent text-sm font-thin border pl-3 rounded-sm p-[7px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
            ${errors.hostingLocation ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                        value={formData.hostingLocation}
                        onChange={handleHostingLocationChange}
                        onBlur={() => handleBlur("hostingLocation")}
                    >
                        <option value="" disabled>Please Select</option>
                        {[
                            "United States", "Canada", "Mexico", "United Kingdom", "Germany", "France", "Netherlands",
                            "Ireland", "Switzerland", "Sweden", "India", "Singapore", "Japan", "South Korea", "Hong Kong",
                            "China", "Australia", "New Zealand", "Brazil", "Argentina", "Chile", "United Arab Emirates",
                            "Saudi Arabia", "South Africa", "Israel"
                        ].map((location) => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                    {errors.hostingLocation && (
                        <span className="text-red-600 text-sm">{errors.hostingLocation}</span>
                    )}
                </div>


                {/* Wallet Type */}
                <div>
                    <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
                        Wallet Type <span className="text-red-600">*</span>
                    </label>
                    <select
                        className={`w-full bg-transparent text-sm font-thin border pl-3 rounded-sm p-[7px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.walletType ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                        value={"Seamless/Single Wallet"}
                        onChange={handleWalletTypeChange}
                        onBlur={() => handleBlur("walletType")}
                    >
                        <option value="Seamless/Single Wallet">Seamless/Single Wallet</option>
                    </select>
                    {errors.walletType && (
                        <span className="text-red-600 text-sm">{errors.walletType}</span>
                    )}
                </div>

                {/* Providers */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                        <thead className="bg-[#908D89]">
                            <tr>
                                <th className="w-1/2 border-r font-normal text-sm text-white p-3 text-left">Target Country</th>
                                <th className="w-1/2 border-l font-normal text-sm text-white p-3 text-left">Currency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {providers.map((provider) => (
                                <tr key={provider.id} className="border-b border-gray-200 hover:bg-[#f7f7fa]">
                                    <td className="p-3 flex items-center border-r">
                                        <input
                                            type="checkbox"
                                            checked={provider.isChecked}
                                            onChange={() => handleProviderChange(provider.id)}
                                            onBlur={() => handleBlur('provider')}
                                        />
                                        <label htmlFor={provider.id} className="text-gray-700 text-sm px-2">{provider.name}</label>
                                    </td>
                                    <td className="p-3">
                                        <span className="text-gray-700 text-sm">{provider.currency}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {errors.provider && <p className="text-red-600">{errors.provider}</p>}
                </div>

            </div>


        </>
    );
};

export default StepOne;
