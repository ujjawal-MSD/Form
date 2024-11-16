import React, { useState } from "react";
import IncInput from '../../IncInput';

const AgentInformation = () => {
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

    // handel dropdown changes 
    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => setSelectedValue(event.target.value);


    // Handle Checkbox selection change
    const [providerError, setProviderError] = useState('');

    const handleCheckboxChange = (index, isChecked) => {
        const updatedProviders = [...providers];
        updatedProviders[index].isChecked = isChecked;
        if (!isChecked) updatedProviders[index].rtp = null; // Reset RTP if unchecked
        setProviders(updatedProviders);

        // Real-time validation: Check if the provider needs an RTP value when checked
        if (!updatedProviders.some(provider => provider.isChecked)) {
            setProviderError('The Provider field is required.');
        } else if (
            isChecked &&
            ["hacksaw", "nolimit city"].some(name => updatedProviders[index].name.toLowerCase().includes(name)) &&
            !updatedProviders[index].rtp
        ) {
            setProviderError('The RTP field is required.');
        } else {
            setProviderError('');
        }
    };

    const handleProviderChange = (index, rtpValue) => {
        const updatedProviders = [...providers];
        updatedProviders[index].rtp = rtpValue;
        setProviders(updatedProviders);

        // Real-time validation: Clear error if RTP is selected for the checked provider
        if (updatedProviders[index].isChecked && rtpValue) {
            setProviderError('');
        }
    };

    // Handle Skype Group validation
    const [skypeGroups, setSkypeGroups] = useState([]);
    const [groupError, setGroupError] = useState('');
    const handleGroupValidation = (event) => {
        const value = event.target.value.trim();
        if (!value) {
            setGroupError('The Skype Group name field must have a value.');
        } else if (skypeGroups.includes(value)) {
            setGroupError('The Skype Group name field has a duplicate value.');
        } else {
            setGroupError('');
            if (event.type === 'blur') {
                setSkypeGroups((prevGroups) => [...prevGroups, value]);
            }
        }
    };


    // Handle Technical Support Personnal validation
    const [technicalSupport, setTechnicalSupport] = useState([]);
    const [technicalSupportError, setTechnicalSupportError] = useState('');
    const handeltechnicalSupportValidation = (event) => {
        const value = event.target.value.trim();
        if (!value) {
            setTechnicalSupportError('The Technical Support Personnel field must have a value.');
        } else if (technicalSupport.includes(value)) {
            setTechnicalSupportError('The  Technical Support Personnel field has a duplicate value.');
        } else {
            setTechnicalSupportError('');
            if (event.type === 'blur') {
                setTechnicalSupport((prevGroups) => [...prevGroups, value]);
            }
        }
    };


    // Handle Technical Support Personnal Email validation
    const [technicalEmail, setTechnicalEmail] = useState([]);
    const [technicalEmailError, setTechnicalEmailError] = useState('');
    const handeltechnicalEmailValidation = (event) => {
        const value = event.target.value.trim();
        if (!value) {
            setTechnicalEmailError('The Technical Support Personnel Email field must have a value.');
        } else if (technicalEmail.includes(value)) {
            setTechnicalEmailError('The  Technical Support Personnel Email field has a duplicate value.');
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            setTechnicalEmailError('The Technical Support Personnel Email must be a valid email address.');
        } else {
            setTechnicalEmailError('');
            if (event.type === 'blur') {
                setTechnicalEmail((prevGroups) => [...prevGroups, value]);
            }
        }
    };


    // Handle Contact Email validation
    const [contactEmail, setContactEmail] = useState([]);
    const [contactEmailError, setContactEmailError] = useState('');
    const handelContactEmailValidation = (event) => {
        const value = event.target.value.trim();
        if (!value) {
            setContactEmailError('The email field must have a value.');
        } else if (contactEmail.includes(value)) {
            setContactEmailError('The email field has a duplicate value.');
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            setContactEmailError('The email must be a valid email address.');
        } else {
            setContactEmailError('');
            if (event.type === 'blur') {
                setContactEmail((prevGroups) => [...prevGroups, value]);
            }
        }
    };


    // Handle Brand Name validation
    const invalidNames = /group|brand|demo|test|staging|production/i;
    const [brand, setBrand] = useState([]);
    const [brandError, setBrandError] = useState('');
    const handleBrandValidation = (event) => {
        const value = event.target.value.trim();
        if (!value) {
            setBrandError('The Brand Name field must have a value.');
        } else if (brand.includes(value)) {
            setBrandError('The Brand Name field has a duplicate value.');
        } else if (invalidNames.test(value)) {
            setBrandError('The Brand Name is not valid.');
        } else {
            setBrandError('');
            if (event.type === 'blur') {
                setBrand((prevGroups) => [...prevGroups, value]);
            }
        }
    };

    // Handle Group Name validation
    const [groupNameError, setGroupNameError] = useState('');
    const [isGroupHasError, setIsGroupHasError] = useState(false);

    const handleGroupNameValidation = (event) => {
        const value = event.target.value.trim();
        if (!value) {
            setIsGroupHasError(true);
            setGroupNameError('The Group Name field must have a value.');
        } else if (invalidNames.test(value)) {
            setIsGroupHasError(true);
            setGroupNameError('The Group Name is not valid.');
        } else {
            setIsGroupHasError(false);
            setGroupNameError('');
        }
    };


    return (
        <form className="space-y-8">
            {/* Wallet Type */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Wallet Type <span className="text-red-600">*</span>
                </label>
                <select
                    className="bg-transparent border-gray-300 w-full text-sm font-sm border pl-[10px] rounded-[3px] p-[7px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a]"
                    value={selectedValue}
                    onChange={handleChange}
                >
                    <option value="" className="hidden" disabled>Please Select</option>
                    <option value="transfer">Transfer wallet</option>
                    <option value="seamless">Seamless/Single Wallet</option>
                </select>
            </div>

            {/* Contact Email */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Contact Email <span className="text-red-600">*</span>
                </label>
                <IncInput
                    type="email"
                    onChange={handelContactEmailValidation}
                    onBlur={handelContactEmailValidation}
                    isError={contactEmailError ? 1 : 0} // Pass error state to IncInput
                />
                {contactEmailError && (
                    <span className="text-red-600 text-sm">{contactEmailError}</span>
                )}
            </div>

            {/* Skype Group Name */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Skype Group name <span className="text-red-600">*</span>
                </label>
                <IncInput
                    type="text"
                    placeholder="Please input"
                    onChange={handleGroupValidation}
                    onBlur={handleGroupValidation}
                    isError={groupError ? 1 : 0} // Pass error state to IncInput
                />
                {groupError && (
                    <span className="text-red-600 text-sm">{groupError}</span>
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
                    className={`w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                    ${isGroupHasError ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                    onChange={handleGroupNameValidation}
                    onBlur={handleGroupNameValidation}
                />
                {groupNameError && (
                    <span className="text-red-600 text-sm">{groupNameError}</span>
                )}
                <p className="text-sm text-[#b19c92] mt-1">
                    Do not use the following text as a name: group / brand / demo / test / staging / production
                </p>
            </div>


            {/* Brand Name */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Brand Name <span className="text-red-600">*</span>
                </label>
                <IncInput
                    type="text"
                    placeholder="Please input"
                    onChange={handleBrandValidation}
                    onBlur={handleBrandValidation}
                    isError={brandError ? 1 : 0} // Pass error state to IncInput
                />
                {brandError && (
                    <span className="text-red-600 text-sm">{brandError}</span>
                )}
                <p className="text-sm text-[#b19c92] mt-1">Do not use the following text as a name: group / brand / demo / test / staging / production</p>
            </div>

            {/* Technical Support Personnel */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Technical Support Personnel <span className="text-red-600">*</span>
                </label>
                <IncInput
                    type="text"
                    placeholder="Please input"
                    onChange={handeltechnicalSupportValidation}
                    onBlur={handeltechnicalSupportValidation}
                    isError={technicalSupportError ? 1 : 0} // Pass error state to IncInput
                />
                {technicalSupportError && (
                    <span className="text-red-600 text-sm">{technicalSupportError}</span>
                )}
            </div>

            {/* Technical Support Personnel Email */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Technical Support Personnel Email <span className="text-red-600">*</span>
                </label>
                <IncInput
                    type="email"
                    placeholder="Please input"
                    onChange={handeltechnicalEmailValidation}
                    onBlur={handeltechnicalEmailValidation}
                    isError={technicalEmailError ? 1 : 0} // Pass error state to IncInput
                />
                {technicalEmailError && (
                    <span className="text-red-600 text-sm">{technicalEmailError}</span>
                )}
            </div>

            {/* Providers */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead className="bg-[#908D89]">
                        <tr>
                            <th className="border-r font-normal text-sm text-white p-3 text-left">Provider</th>
                            <th className="border-l font-normal text-sm text-white p-3 text-left">RTP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {providers.map((provider, index) => (
                            <tr key={provider.id} className="border-b border-gray-200 hover:bg-[#f7f7fa]">
                                <td className="p-3 flex items-center border-r">
                                    <input
                                        type="checkbox"
                                        id={provider.id}
                                        className="w-4 h-4 checked:bg-green-500"
                                        onChange={(e) => handleCheckboxChange(index, e.target.checked)}
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
                                                        name={`rtp_${provider.id}`}
                                                        value={rtpValue}
                                                        checked={provider.rtp === rtpValue}
                                                        onChange={() => handleProviderChange(index, rtpValue)}
                                                        disabled={!provider.isChecked}
                                                        className="mr-2"
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
                {providerError && (
                    <span className="text-red-600 text-sm">{providerError}</span>
                )}
            </div>
        </form>
    );
};

export default AgentInformation;