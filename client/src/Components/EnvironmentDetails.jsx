import React from "react";
import DynamicInputFields from "../DynamicInputFields";
import DynamicLoginFields from "./DynamicLoginFields";

const EnvironmentDetails = ({ environment, formData, setFormData, errors, handleBlur }) => {
    const handleIpAddressChange = (newIpAddress) => {
        setFormData({ ...formData, [environment]: { ...formData[environment], ipAddress: newIpAddress } });
    };

    const handleLoginCredentialsChange = (newLoginCredentials) => {
        setFormData({ ...formData, [environment]: { ...formData[environment], loginCredentials: newLoginCredentials } });
    };

    return (
        <div className="space-y-8 pt-4">
            {/* End Point */}
            <div>
                <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
                    End Point  <span className="text-red-600">*</span>
                </label>
                <input
                    type="url"
                    placeholder="Please input"
                    value={formData[environment].endPoint}
                    onChange={(e) => setFormData({ ...formData, [environment]: { ...formData[environment], endPoint: e.target.value } })}
                    onBlur={() => handleBlur(`${environment}.endPoint`)} // Trigger blur validation
                    className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                          ${errors[environment]?.endPoint ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                />
                {errors[environment]?.endPoint && <p className="text-red-500 text-sm">{errors[environment].endPoint}</p>}
            </div>

            {/* Lobby Url */}
            <div>
                <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
                    Lobby Url
                </label>
                <input
                    type="url"
                    value={formData[environment].lobbyUrl}
                    onChange={(e) => setFormData({ ...formData, [environment]: { ...formData[environment], lobbyUrl: e.target.value } })}
                    placeholder="Please input"
                    onBlur={() => handleBlur(`${environment}.lobbyUrl`)} // Trigger blur validation
                    className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                          ${errors[environment]?.lobbyUrl ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                />
                {errors[environment]?.lobbyUrl && <p className="text-red-500 text-sm">{errors[environment].lobbyUrl}</p>}
            </div>

            {/* Login Credentials */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Login Credentials
                </label>
                <DynamicLoginFields
                    values={formData[environment].loginCredentials}
                    onChange={handleLoginCredentialsChange}
                    placeholderAccount="Account Name"
                    placeholderPassword="Password"
                    onBlur={() => handleBlur(`${environment}.loginCredentials`)}
                    errors={errors[environment]?.loginCredentials || []}
                />
                {errors[environment]?.loginCredentials &&
                    <p className="text-red-600 text-xs">{errors[environment].loginCredentials}</p>
                }
            </div>

            {/* IP Address */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    IP Address <span className="text-red-600">*</span>
                </label>
                <DynamicInputFields
                    values={formData[environment].ipAddress}
                    onChange={handleIpAddressChange}
                    placeholder="Please input"
                    onBlur={() => handleBlur(`${environment}.ipAddress`)}
                    errors={errors[environment]?.ipAddress}
                />
                <p className="text-sm text-[#b19c92] mt-1">Up to 20, currently: {formData[environment].ipAddress.length}</p>
                {errors[environment]?.ipAddress && <p className="text-red-600 text-sm">{errors[environment].ipAddress}</p>}
            </div>
        </div>
    );
};

export default EnvironmentDetails;