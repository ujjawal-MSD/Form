import React, { useState } from 'react'
import IncInput from '../../IncInput'
import { IoIosArrowDown } from "react-icons/io";

const StagingInformation = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleFieldChange = (field, value) => {
        if (field === 'name') {
            setName(value);
        } else if (field === 'password') {
            setPassword(value);
        }

        // Validation logic
        if (value && ((field === 'name' && password) || (field === 'password' && name))) {
            if (name === password) {
                setError('The Login Credentials field has a duplicate value.');
            } else {
                setError('');
            }
        } else if (value) {
            setError('The Login Credentials field is required when Login Credentials is present.');
        } else {
            setError('');
        }
    };

    return (
        <form >
            <div className='font-semibold text-[#282F3A]'>
                <IoIosArrowDown className='inline' /> adgh
            </div>
            <div className="space-y-8 pt-4">

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
                    <IncInput count='2'
                        value1={name}
                        value2={password}
                        onChange={(field, value) => handleFieldChange(field, value)}
                    />
                    {error && <p className="text-red-600 text-xs">{error}</p>}
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

export default StagingInformation