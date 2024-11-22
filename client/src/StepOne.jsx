import { useState, useEffect } from "react";
import DynamicInputFields from "./DynamicInputFields";

const StepOne = ({ formData, setFormData, errors, setErrors, handleBlur }) => {
    const [providers, setProviders] = useState([
        { id: "DCACE", name: "DCACE", isChecked: false, rtp: null },
        { id: "Yggdrasil Gaming", name: "Yggdrasil Gaming", isChecked: false, rtp: null },
        { id: "Nolimit City", name: "Nolimit City", isChecked: false, rtp: null },
        { id: "Relax Gaming", name: "Relax Gaming", isChecked: false, rtp: null },
        { id: "Ezugi", name: "Ezugi", isChecked: false, rtp: null },
        { id: "AvatarUX", name: "AvatarUX", isChecked: false, rtp: null },
        { id: "Play'n GO", name: "Play'n GO", isChecked: false, rtp: null },
        { id: "GAMOMAT", name: "GAMOMAT", isChecked: false, rtp: null },
        { id: "Evoplay", name: "Evoplay", isChecked: false, rtp: null },
        { id: "Hacksaw Gaming", name: "Hacksaw Gaming", isChecked: false, rtp: null },
        { id: "FunTa Gaming", name: "FunTa Gaming", isChecked: false, rtp: null },
        { id: "Push Gaming", name: "Push Gaming", isChecked: false, rtp: null },
        { id: "WIN FAST", name: "WIN FAST", isChecked: false, rtp: null },
        { id: "ParlayBay", name: "ParlayBay", isChecked: false, rtp: null },
        { id: "Evolution", name: "Evolution", isChecked: false, rtp: null },
        { id: "Slotmill", name: "Slotmill", isChecked: false, rtp: null },
        { id: "Big Time Gaming", name: "Big Time Gaming", isChecked: false, rtp: null },
        { id: "NetEnt", name: "NetEnt", isChecked: false, rtp: null },
        { id: "Red Tiger Gaming", name: "Red Tiger Gaming", isChecked: false, rtp: null },
        { id: "7Mojos", name: "7Mojos", isChecked: false, rtp: null },
        { id: "Fantasma Games", name: "Fantasma Games", isChecked: false, rtp: null },
        { id: "Peter & Sons", name: "Peter & Sons", isChecked: false, rtp: null },
        { id: "SPRIBE", name: "SPRIBE", isChecked: false, rtp: null },
        { id: "SmartSoft", name: "SmartSoft", isChecked: false, rtp: null },
        { id: "Voltent (Wazdan)", name: "Voltent (Wazdan)", isChecked: false, rtp: null },
        { id: "Thunderkick", name: "Thunderkick", isChecked: false, rtp: null },
        { id: "Turbo Games (Asia)", name: "Turbo Games (Asia)", isChecked: false, rtp: null },
        { id: "Lucky Monaco", name: "Lucky Monaco", isChecked: false, rtp: null },
        { id: "Turbo Games (rest of World)", name: "Turbo Games (rest of World)", isChecked: false, rtp: null },
        { id: "BGaming", name: "BGaming", isChecked: false, rtp: null },
        { id: "SA Gaming", name: "SA Gaming", isChecked: false, rtp: null },
        { id: "Yolted", name: "Yolted", isChecked: false, rtp: null },
        { id: "BluePrint", name: "BluePrint", isChecked: false, rtp: null },
        { id: "Octoplay", name: "Octoplay", isChecked: false, rtp: null },
        { id: "Novomatic", name: "Novomatic", isChecked: false, rtp: null },
        { id: "Hacksaw Gaming ROW", name: "Hacksaw Gaming ROW", isChecked: false, rtp: null },
        { id: "Hacksaw Gaming Latam", name: "Hacksaw Gaming Latam", isChecked: false, rtp: null }
    ]);
    const validateProvider = (updatedProviders) => {
        let providerError = "";
        if (updatedProviders.every(provider => !provider.isChecked)) {
            providerError = "The Provider field is required.";
        } else {
            for (const provider of updatedProviders) {
                if (provider.isChecked && ["hacksaw", "nolimit city"].some(name => provider.id.toLowerCase().includes(name)) && !provider.rtp) {
                    providerError = 'Please select RTP for the checked provider.';
                    break;
                }
            }
        }
        setErrors((prevErrors) => ({ ...prevErrors, provider: providerError }));
    };

    const handleProviderChange = (providerId) => {
        const updatedProviders = providers.map(provider =>
            provider.id === providerId ? { ...provider, isChecked: !provider.isChecked, rtp: provider.isChecked ? null : provider.rtp } : provider
        );
        setProviders(updatedProviders);

        const selectedProviders = updatedProviders.filter(provider => provider.isChecked).map(provider => ({
            id: provider.id,
            name:provider.name,
            rtp: provider.rtp,
        }));
        setFormData({ ...formData, provider: selectedProviders });

        validateProvider(updatedProviders);
    };

    const handleRTPChange = (providerId, rtpValue) => {
        const updatedProviders = providers.map(provider =>
            provider.id === providerId ? { ...provider, rtp: rtpValue } : provider
        );
        setProviders(updatedProviders);

        const selectedProviders = updatedProviders.filter(provider => provider.isChecked).map(provider => ({
            id: provider.id,
            name:provider.name,
            rtp: provider.rtp,
        }));
        setFormData({ ...formData, provider: selectedProviders });

        validateProvider(updatedProviders);
    };





    const handleSkypeGroupChange = (newSkypeGroup) => {
        setFormData({ ...formData, skypeGroup: newSkypeGroup });
    };

    const handleEmailsChange = (newEmails) => {
        setFormData({ ...formData, emails: newEmails });
    };

    const handleBrandNameChange = (newBrandName) => {
        setFormData({ ...formData, brandName: newBrandName });
    };

    const handleTechnicalSupportChange = (newTechnicalSupport) => {
        setFormData({ ...formData, technicalSupport: newTechnicalSupport });
    }


    const handleTechnicalSupportEmailChange = (newTechnicalSupportEmail) => {
        setFormData({ ...formData, technicalSupportEmail: newTechnicalSupportEmail });
    }

    const handleWalletTypeChange = (e) => {
        setFormData({ ...formData, walletType: e.target.value });
    };






    return (
        <>
            <div className="space-y-8">

                {/* Wallet Type */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2225]">
                        Wallet Type <span className="text-red-600">*</span>
                    </label>
                    <select
                        className={`w-full bg-transparent text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
        ${errors.walletType ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                        value={formData.walletType}
                        onChange={handleWalletTypeChange}
                        onBlur={() => handleBlur("walletType")}
                    >
                        <option value="" disabled>Please Select</option>
                        <option value="Transfer wallet">Transfer wallet</option>
                        <option value="Seamless/Single Wallet">Seamless/Single Wallet</option>
                    </select>
                    {errors.walletType && (
                        <span className="text-red-600 text-sm">{errors.walletType}</span>
                    )}
                </div>


                {/* Contact Email */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2225]">
                        Contact Email <span className="text-red-600">*</span>
                    </label>
                    <DynamicInputFields
                        label="Emails"
                        values={formData.emails}
                        onChange={handleEmailsChange}
                        placeholder="Please input"
                        onBlur={(index) => handleBlur("emails")}
                        errors={errors.emails}
                    />
                    {errors.emails && (
                        <span className="text-red-600 text-sm">{errors.emails}</span>
                    )}
                </div>

                {/* Skype Group Name */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2225]">
                        Skype Group name <span className="text-red-600">*</span>
                    </label>
                    <DynamicInputFields
                        type="text"
                        values={formData.skypeGroup}
                        onChange={handleSkypeGroupChange}
                        placeholder="Please input"
                        onBlur={(index) => handleBlur("skypeGroup")}
                        errors={errors.skypeGroup}
                    />
                    {errors.skypeGroup && (
                        <span className="text-red-600 text-sm">{errors.skypeGroup}</span>
                    )}
                    <p className="text-sm text-[#b19c92] mt-1">Example: [Azuretech - ATA/YGG] Integration</p>
                </div>

                {/* Group Name */}
                <div>
                    <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
                        Group Name  <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Please input"
                        value={formData.groupName}
                        onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                        onBlur={() => handleBlur('groupName')} // Trigger blur validation
                        className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${errors.groupName ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                                'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                    />
                    {errors.groupName && <p className="text-red-500 text-sm">{errors.groupName}</p>}

                    <p className="text-sm text-[#b19c92] mt-1">
                        Do not use the following text as a name: group / brand / demo / test / staging / production
                    </p>
                </div>


                {/* Brand Name */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2225]">
                        Brand Name <span className="text-red-600">*</span>
                    </label>
                    <DynamicInputFields
                        type="text"
                        values={formData.brandName}
                        onChange={handleBrandNameChange}
                        placeholder="Please input"
                        onBlur={(index) => handleBlur("brandName")}
                        errors={errors.brandName}
                    />
                    {errors.brandName && (
                        <span className="text-red-600 text-sm">{errors.brandName}</span>
                    )}
                    <p className="text-sm text-[#b19c92] mt-1">Do not use the following text as a name: group / brand / demo / test / staging / production</p>
                </div>

                {/* Technical Support Personnel */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2225]">
                        Technical Support Personnel <span className="text-red-600">*</span>
                    </label>
                    <DynamicInputFields
                        type="text"
                        values={formData.technicalSupport}
                        onChange={handleTechnicalSupportChange}
                        placeholder="Please input"
                        onBlur={(index) => handleBlur("technicalSupport")}
                        errors={errors.technicalSupport}
                    />
                    {errors.technicalSupport && (
                        <span className="text-red-600 text-sm">{errors.technicalSupport}</span>
                    )}
                </div>

                {/* Technical Support Personnel Email */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2225]">
                        Technical Support Personnel Email <span className="text-red-600">*</span>
                    </label>
                    <DynamicInputFields
                        type="email"
                        values={formData.technicalSupportEmail}
                        onChange={handleTechnicalSupportEmailChange}
                        placeholder="Please input"
                        onBlur={(index) => handleBlur("technicalSupportEmail")}
                        errors={errors.technicalSupportEmail}
                    />
                    {errors.technicalSupportEmail && (
                        <span className="text-red-600 text-sm">{errors.technicalSupportEmail}</span>
                    )}
                </div>
            </div>


            {/* Providers */}
            <div className="h-12" />
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-[#908D89]">
                        <tr>
                            <th className="border-r font-normal text-sm text-white p-3 text-left">Provider</th>
                            <th className="border-l font-normal text-sm text-white p-3 text-left">RTP</th>
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
                                        {["hacksaw", "nolimit city"].some(name => provider.name.toLowerCase().includes(name)) && (
                                            <div className="flex space-x-4">
                                                {["94", "96"].map(rtpValue => (
                                                    <label
                                                        key={rtpValue}
                                                        className={`inline-flex items-center text-sm px-2 ${!provider.isChecked ? 'text-gray-400' : 'text-gray-700'}`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            checked={provider.rtp === rtpValue}
                                                            onChange={() => handleRTPChange(provider.id, rtpValue)}
                                                            onBlur={() => handleBlur('provider')}
                                                            disabled={!provider.isChecked} // Disable if checkbox is not checked
                                                        />
                                                        {rtpValue}%
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>
                {errors.provider && <p className="text-red-600">{errors.provider}</p>}
            </div>
        </>
    );
};

export default StepOne;
