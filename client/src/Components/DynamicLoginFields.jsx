import React, { useState } from "react";
import { IoAdd, IoRemoveOutline, IoEye, IoEyeOff } from "react-icons/io5";

const DynamicLoginFields = ({
    values,
    onChange,
    placeholderAccount,
    placeholderPassword,
    onBlur
}) => {
    const [showPassword, setShowPassword] = useState(values.map(() => false));

    // Function to handle adding new fields
    const handleAdd = () => {
        onChange([...values, { accountName: "", password: "" }]); // Adds an empty field to the array
        setShowPassword([...showPassword, false]);
    };

    // Function to handle removing specific fields
    const handleRemove = (index) => {
        const updatedValues = values.filter((_, i) => i !== index); // Removes the field at index
        onChange(updatedValues);
        setShowPassword(showPassword.filter((_, i) => i !== index));
    };

    // Function to handle the change in value of each input
    const handleChange = (index, field, value) => {
        const updatedValues = [...values];
        updatedValues[index][field] = value; // Update the value at the specific index
        onChange(updatedValues);
    };

    // Function to toggle password visibility
    const toggleShowPassword = (index) => {
        const updatedShowPassword = [...showPassword];
        updatedShowPassword[index] = !updatedShowPassword[index];
        setShowPassword(updatedShowPassword);
    };

    return (
        <>
            {values.map((value, index) => (
                <div key={index} className="flex mt-2 items-center space-x-6">
                    <div className='flex-1 w-full flex'>
                        <input
                            type="text"
                            value={value.accountName}
                            onChange={(e) => handleChange(index, "accountName", e.target.value)} // Update value when changed
                            placeholder={placeholderAccount}
                            onBlur={() => onBlur(index)}
                            className="w-1/2 text-sm font-thin border pl-3 border-gray-300 rounded-l-sm p-[6px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a] focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-[#36ad695d]"
                        />
                        <div className="relative w-1/2">
                            <input
                                type={showPassword[index] ? "text" : "password"}
                                value={value.password}
                                onChange={(e) => handleChange(index, "password", e.target.value)} // Update value when changed
                                placeholder={placeholderPassword}
                                onBlur={() => onBlur(index)}
                                className="w-full text-sm font-thin border pl-3 border-gray-300 rounded-r-sm p-[6px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a] focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-[#36ad695d]"
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword(index)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            >
                                {showPassword[index] ? <IoEyeOff /> : <IoEye />}
                            </button>
                        </div>
                    </div>
                    <div className="flex">
                        {/* Decrement Button */}
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            disabled={values.length === 1}
                            className={`flex items-center border-[1px] justify-center rounded-l-full px-2 py-2 text-2xl hover:border-[#36ad6a] hover:text-[#36ad6a] ${values.length === 1 ? 'cursor-not-allowed text-gray-400' : 'text-gray-600'}`}
                        >
                            <IoRemoveOutline style={{ fontSize: '18px' }} />
                        </button>

                        {/* Increment Button */}
                        <button
                            type="button"
                            onClick={handleAdd}
                            disabled={values.length === 5}
                            className={`flex items-center border-[1px] justify-center rounded-r-full px-2 py-2 text-2xl hover:border-[#36ad6a] hover:text-[#36ad6a] ${values.length === 5 ? 'cursor-not-allowed text-gray-400' : 'text-gray-600'}`}
                        >
                            <IoAdd style={{ fontSize: '18px' }} />
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default DynamicLoginFields;