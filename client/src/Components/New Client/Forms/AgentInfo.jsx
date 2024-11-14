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


    const handleAddField = (setState, values) => {
        setState([...values, ""]);
    };

    const handleRemoveField = (index, setState, values) => {
        const updatedValues = [...values];
        updatedValues.splice(index, 1);
        setState(updatedValues);
    };
    const handleCheckboxChange = (index, isChecked) => {
        const updatedProviders = [...providers];
        updatedProviders[index].isChecked = isChecked;
        if (!isChecked) {
            updatedProviders[index].rtp = null; // Reset rtp when checkbox is unchecked
        }
        setProviders(updatedProviders);
    };

    const handleProviderChange = (index, rtpValue) => {
        const updatedProviders = [...providers];
        updatedProviders[index].rtp = rtpValue;
        setProviders(updatedProviders);
    };

    return (
        <form className="space-y-8">
            <div>
                <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
                    Wallet Type <span className="text-red-600">*</span>
                </label>
                <select
                    className=" bg-transparent border-gray-300 w-full text-sm font-sm border pl-[10px] rounded-[3px] p-[7px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a] focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-[#36ad695d]"
                >
                    <option value="" disabled selected className="text-[#B0B3B8]">Please Select</option>
                    <option className="text-[#1F2225]">Transfer wallet</option>
                    <option className="text-[#1F2225]">Seamless/Single Wallet</option>
                </select>
            </div>

            {/* Contact Email */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Contact Email <span className="text-red-600">*</span>
                </label>
                <IncInput />
            </div>

            {/* Skype Group Name */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Skype Group name <span className="text-red-600">*</span>
                </label>
                <IncInput />
                <p className="text-sm text-[#b19c92] mt-1">
                    example : [Azuretech - ATA/YGG] Integration
                </p>
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
                <p className="text-sm text-[#b19c92] mt-1">
                    Do not use the following text as a name: group / brand / demo / test / staging / production
                </p>
            </div>


            {/* Technical Support Personnel */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Technical Support Personnel <span className="text-red-600">*</span>
                </label>
                <IncInput />
            </div>

            {/* Technical Support Personnel Email */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Technical Support Personnel Email <span className="text-red-600">*</span>
                </label>
                <IncInput />
            </div>

            {/* Providers */}

            <div>
                <div className="h-6" />
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-200">
                        <thead className="bg-[#908D89]">
                            <tr>
                                <th className="border-r border-White font-normal text-sm text-white p-3 text-left">Provider</th>
                                <th className="border-l border-White font-normal text-sm text-white p-3 text-left">RTP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {providers.map((provider, index) => (
                                <tr key={provider.id} className="border-b border-gray-200 hover:bg-[#f7f7fa]">
                                    <td className="p-3 flex items-center border-r border-gray-200">
                                        <input
                                            type="checkbox"
                                            id={provider.id}
                                            value={provider.name}
                                            className="w-4 h-4 checked:bg-green-500"
                                            onChange={(e) => handleCheckboxChange(index, e.target.checked)} // Handle checkbox change
                                        />
                                        <label htmlFor={provider.id} className="text-gray-700 text-sm px-2">
                                            {provider.name}
                                        </label>
                                    </td>
                                    <td className="p-3">
                                        {/* Conditionally render RTP radio buttons for "Hacksaw Gaming" or "Nolimiti City" */}
                                        {(provider.name.toLowerCase().includes("hacksaw") || provider.name.toLowerCase().includes("nolimit city")) && (
                                            <div className="flex space-x-4">
                                                <label
                                                    className={`inline-flex items-center text-sm px-2 ${!provider.isChecked ? 'text-gray-400' : 'text-gray-700'}`} // Apply light color when disabled
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`rtp_${provider.id}`}
                                                        value="94"
                                                        checked={provider.rtp === "94"}
                                                        onChange={() => handleProviderChange(index, "94")}
                                                        className="mr-2"
                                                        disabled={!provider.isChecked} // Disable if checkbox is not checked
                                                    />
                                                    94%
                                                </label>
                                                <label
                                                    className={`inline-flex items-center text-sm px-2 ${!provider.isChecked ? 'text-gray-400' : 'text-gray-700'}`} // Apply light color when disabled
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`rtp_${provider.id}`}
                                                        value="96"
                                                        checked={provider.rtp === "96"}
                                                        onChange={() => handleProviderChange(index, "96")}
                                                        className="mr-2"
                                                        disabled={!provider.isChecked} // Disable if checkbox is not checked
                                                    />
                                                    96%
                                                </label>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <div className="h-6" />
            </div>
        </form>
    )
}

export default AgentInformation