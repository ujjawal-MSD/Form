import React, { useState } from "react";
import IncInput from '../../IncInput';

const AgentInformation = () => {
    const [providers, setProviders] = useState([
        { id: "DCACE", name: "DCACE", rtp: null },
        { id: "Yggdrasil Gaming", name: "Yggdrasil Gaming", rtp: null },
        { id: "Nolimit City", name: "Nolimit City", rtp: null },
        { id: "Relax Gaming", name: "Relax Gaming", rtp: null },
        { id: "Ezugi", name: "Ezugi", rtp: null },
        { id: "AvatarUX", name: "AvatarUX", rtp: null },
        { id: "Play'n GO", name: "Play'n GO", rtp: null },
        { id: "GAMOMAT", name: "GAMOMAT", rtp: null },
        { id: "Evoplay", name: "Evoplay", rtp: null },
        { id: "Hacksaw Gaming", name: "Hacksaw Gaming", rtp: null },
        { id: "FunTa Gaming", name: "FunTa Gaming", rtp: null },
        { id: "Push Gaming", name: "Push Gaming", rtp: null },
        { id: "WIN FAST", name: "WIN FAST", rtp: null },
        { id: "ParlayBay", name: "ParlayBay", rtp: null },
        { id: "Evolution", name: "Evolution", rtp: null },
        { id: "Slotmill", name: "Slotmill", rtp: null },
        { id: "Big Time Gaming", name: "Big Time Gaming", rtp: null },
        { id: "NetEnt", name: "NetEnt", rtp: null },
        { id: "Red Tiger Gaming", name: "Red Tiger Gaming", rtp: null },
        { id: "7Mojos", name: "7Mojos", rtp: null },
        { id: "Fantasma Games", name: "Fantasma Games", rtp: null },
        { id: "Peter & Sons", name: "Peter & Sons", rtp: null },
        { id: "SPRIBE", name: "SPRIBE", rtp: null },
        { id: "SmartSoft", name: "SmartSoft", rtp: null },
        { id: "Voltent (Wazdan)", name: "Voltent (Wazdan)", rtp: null },
        { id: "Thunderkick", name: "Thunderkick", rtp: null },
        { id: "Turbo Games (Asia)", name: "Turbo Games (Asia)", rtp: null },
        { id: "Lucky Monaco", name: "Lucky Monaco", rtp: null },
        { id: "Turbo Games (rest of World)", name: "Turbo Games (rest of World)", rtp: null },
        { id: "BGaming", name: "BGaming", rtp: null },
        { id: "SA Gaming", name: "SA Gaming", rtp: null },
        { id: "Yolted", name: "Yolted", rtp: null },
        { id: "BluePrint", name: "BluePrint", rtp: null },
        { id: "Octoplay", name: "Octoplay", rtp: null },
        { id: "Novomatic", name: "Novomatic", rtp: null },
        { id: "Hacksaw Gaming ROW", name: "Hacksaw Gaming ROW", rtp: null },
        { id: "Hacksaw Gaming Latam", name: "Hacksaw Gaming Latam", rtp: null }
    ]);
    const [selectedValue, setSelectedValue] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isEmailError, setIsEmailError] = useState(0); // Error flag
    const [skypeGroups, setSkypeGroups] = useState([]);
    const [groupError, setGroupError] = useState('');
    const [TechnicalSupportPersonnelError, setTechnicalSupportPersonnelChangeError] = useState('');
    const [TechnicalSupportPersonnelfield, setTechnicalSupportPersonnelfield] = useState([]);



    // Handle checkbox change and associated rtp logic
    const handleCheckboxChange = (index, isChecked) => {
        setProviders((prevProviders) => {
            const updatedProviders = [...prevProviders];
            updatedProviders[index].isChecked = isChecked;
            if (!isChecked) updatedProviders[index].rtp = null;
            return updatedProviders;
        });
    };

    // Handle provider rtp change
    const handleProviderChange = (index, rtpValue) => {
        setProviders((prevProviders) => {
            const updatedProviders = [...prevProviders];
            updatedProviders[index].rtp = rtpValue;
            return updatedProviders;
        });
    };

    // Handle selection change
    const handleChange = (event) => setSelectedValue(event.target.value);

    // Handle email validation
    const handleEmailBlur = () => {
        if (!email) {
            setEmailError("The email field must have a value.");
            setIsEmailError(1);
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("The email must be a valid email address.");
            setIsEmailError(1);
        } else {
            setEmailError('');
            setIsEmailError(0);
        }
    };

    // Handle Skype Group validation
    const handleGroupChange = (event) => {
        const value = event.target.value;
        if (!value.trim()) {
            setGroupError('The Skype Group name field must have a value.');
        } else if (skypeGroups.includes(value)) {
            setGroupError('The Skype Group name field has a duplicate value.');
        } else {
            setGroupError('');
        }
    };


    const handleBlur = (event) => {
        const value = event.target.value.trim();
        if (!value) {
            setGroupError('The Skype Group name field must have a value.');
        } else if (skypeGroups.includes(value)) {
            setGroupError('The Skype Group name field has a duplicate value.');
        } else {
            setSkypeGroups((prevGroups) => [...prevGroups, value]);
            setGroupError('');
        }
    };


    const TechnicalSupportPersonnelChange = (event) => {
        const value = event.target.value;
        if (!value.trim()) {
            setTechnicalSupportPersonnelChangeError('The Technical Support Personnel field must have a value');
        } else if (TechnicalSupportPersonnelfield.includes(value)) {
            setTechnicalSupportPersonnelChangeError('The Technical Support Personnel field has a duplicate value.');
        } else {
            setTechnicalSupportPersonnelChangeError('');
        }
    };

    const handleTechnicalSupportPersonnelBlur = (event) => {
        const value = event.target.value.trim();
        if (!value.trim()) {
            setTechnicalSupportPersonnelChangeError('The Technical Support Personnel field must have a value');
        } else if (skypeGroups.includes(value)) {
            setTechnicalSupportPersonnelChangeError('The Technical Support Personnel field has a duplicate value.');
        } else {
            setTechnicalSupportPersonnelfield((prevGroups) => [...prevGroups, value]);
            setTechnicalSupportPersonnelChangeError('');
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
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleEmailBlur} // Trigger validation on blur
                    isError={isEmailError} // Pass error state as prop
                />
                {emailError && (
                    <span className="text-red-600 text-sm">{emailError}</span>
                )}
            </div>

            {/* Skype Group Name */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Skype Group name <span className="text-red-600">*</span>
                </label>
                <IncInput
                    type="text"
                    placeholder="Please enter Skype Group name"
                    onChange={handleGroupChange}
                    onBlur={handleBlur}
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
                    className=" bg-transparent border-gray-300 w-full text-sm font-sm border pl-[10px] rounded-[3px] p-[7px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a] focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-[#36ad695d]"
                />
                <p className="text-sm text-[#b19c92] mt-1">
                    Do not use the following text as a name: group / brand / demo / test / staging / production
                </p>
            </div>


            {/* Brand Name */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Brand Name <span className="text-red-600">*</span>
                </label>
                <IncInput />
                <p className="text-sm text-[#b19c92] mt-1">Do not use: group, brand, demo, test, staging, production</p>
            </div>

            {/* Technical Support Personnel */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Technical Support Personnel <span className="text-red-600">*</span>
                </label>
                <IncInput
                    type="text"
                    placeholder="Please enter Skype Group name"
                    onChange={TechnicalSupportPersonnelChange}
                    onBlur={handleTechnicalSupportPersonnelBlur}
                    isError={TechnicalSupportPersonnelError ? 1 : 0} // Pass error state to IncInput
                />
                {TechnicalSupportPersonnelError && (
                    <span className="text-red-600 text-sm">{TechnicalSupportPersonnelError}</span>
                )}
            </div>

            {/* Technical Support Personnel Email */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Technical Support Personnel Email <span className="text-red-600">*</span>
                </label>
                <IncInput />
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
            </div>
        </form>
    );
};

export default AgentInformation;