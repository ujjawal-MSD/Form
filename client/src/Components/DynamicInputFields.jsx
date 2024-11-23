import React from "react";
import { IoAdd, IoRemoveOutline } from "react-icons/io5";

const DynamicInputFields = ({
    values,
    onChange,
    placeholder,
    onBlur,
    errors
}) => {
    // Function to handle adding new fields
    const handleAdd = () => {
        onChange([...values, ""]); // Adds an empty field to the array
    };

    // Function to handle removing specific fields
    const handleRemove = (index) => {
        const updatedValues = values.filter((_, i) => i !== index); // Removes the field at index
        onChange(updatedValues);
    };

    // Function to handle the change in value of each input
    const handleChange = (index, value) => {
        const updatedValues = [...values];
        updatedValues[index] = value; // Update the value at the specific index
        onChange(updatedValues);
    };

    return (
        <>
            {values.map((value, index) => (
                <div key={index} className="flex mt-2 items-center space-x-6">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(index, e.target.value)} // Update value when changed
                        placeholder={placeholder}
                        className={`flex-1 text-sm font-thin border pl-3 rounded-sm p-[7px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] ${errors && errors[index] ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]'
                            : 'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`
                        }
                        onBlur={() => onBlur(index)} // Trigger onBlur for validation
                    />

                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => handleRemove(index)} // Remove field at index
                            disabled={values.length === 1}
                            className={`flex items-center border-[1px] justify-center rounded-l-full px-2 py-2 text-2xl hover:border-[#36ad6a] hover:text-[#36ad6a] ${values.length === 1 ? 'cursor-not-allowed text-gray-400' : 'text-gray-600'}`}
                        >
                            <IoRemoveOutline style={{ fontSize: '18px' }} />
                        </button>


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
            {/* Button to add new input field */}
        </>
    );
};

export default DynamicInputFields;
