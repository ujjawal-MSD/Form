import React, { useState } from 'react'
import IncInput from '../../IncInput';

const CompanyInformation = () => {
    const countries = [
        'China', 'Japan', 'Korea', 'Thailand', 'Indonesia',
        'Malaysia', 'India', 'Myanmar', 'Vietnam', 'Philippines',
        'Commonwealth of Independent States'
    ];

    const [otherCountry, setOtherCountry] = useState('');

    const handleOtherChange = (e) => {
        setOtherCountry(e.target.value);
    };


    return (
        <form className="space-y-8">

            {/* Group Name */}
            <div>
                <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
                    Company Name  <span className="text-red-600">*</span>
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


            {/* Contact Email */}
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Contact Email <span className="text-red-600">*</span>
                </label>
                <IncInput />
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
                        <div className='border border-gray-200'>
                            <div className="grid grid-cols-3 grid-rows-4 p-3">
                                {countries.map((country, index) => (
                                    <div key={index} className="flex items-center">
                                        <input type="checkbox" value={country} className="w-4 h-4 checked:bg-green-500" />
                                        <label htmlFor="" className="px-2 font-thin text-[#333639] text-sm">{country}</label>
                                    </div>
                                ))}
                                <div className="flex items-center space-x-2">
                                    <div>
                                        <input type="checkbox" value="Other" className="w-4 h-4 checked:bg-green-500" />
                                        <label htmlFor="" className="px-2 font-thin text-[#333639] text-sm">Other</label>
                                    </div>
                                    <input
                                        type="text"
                                        value={otherCountry}
                                        onChange={handleOtherChange}
                                        placeholder="Please input"
                                        className="bg-transparent border-gray-300 text-sm font-sm border rounded-[3px] p-[6px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a] focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-[#36ad695d]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-6" />
            </div>
        </form>
    )
}

export default CompanyInformation