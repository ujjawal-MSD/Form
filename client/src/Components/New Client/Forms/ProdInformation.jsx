import React from 'react'
import IncInput from '../../IncInput'
import { IoIosArrowDown } from "react-icons/io";

const ProdInformation = () => {
    return (
        <form >
            <div className='font-semibold text-[#282F3A]'>
                <IoIosArrowDown className='inline' /> adgh
            </div>
            <div className="space-y-8 pt-4">

                {/* Endpoint */}
                <div>
                    <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
                        Endpoint  <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Please input"
                        className=" bg-transparent border-gray-300 w-full text-sm font-sm border pl-[10px] rounded-[3px] p-[7px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a] focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-[#36ad695d]"
                    />
                </div>

                {/* Lobby Url */}
                <div>
                    <label className="block text-sm font-medium pl-[2px] pb-[6px] text-[#1F2225]">
                        Lobby Url
                    </label>
                    <input
                        type="text"
                        placeholder="Please input"
                        className=" bg-transparent border-gray-300 w-full text-sm font-sm border pl-[10px] rounded-[3px] p-[7px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a] focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-[#36ad695d]"
                    />
                </div>

                {/* Login Credentials */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2225]">
                        Login Credentials
                    </label>
                    <IncInput count='2' />
                </div>

                {/* Technical Support Personnel */}
                <div>
                    <label className="block text-sm font-medium text-[#1F2225]">
                        IP Address <span className="text-red-600">*</span>
                    </label>
                    <IncInput />
                    <p className="text-sm text-[#b19c92] mt-1">
                        Up to 20 , currently : 1
                    </p>
                </div>
            </div>
        </form>
    )
}

export default ProdInformation