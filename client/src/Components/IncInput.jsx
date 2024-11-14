import React, { useState } from 'react';
import { IoAdd, IoRemoveOutline } from "react-icons/io5";

const IncInput = ({ type = "text", placeholder = "Please input", value = '', onChange, onBlur, count = '1', isError = 0 }) => {
    const [fields, setFields] = useState([{ value }]);

    const handleFieldChange = (index, event) => {
        const updatedFields = [...fields];
        updatedFields[index].value = event.target.value;
        setFields(updatedFields);
    };

    const addField = () => {
        if (fields.length < 5) {
            setFields([...fields, { value }]);
        }
    };

    const removeField = (index) => {
        if (fields.length > 1) {
            const updatedFields = [...fields];
            updatedFields.splice(index, 1);
            setFields(updatedFields);
        }
    };

    const inputClassName = isError
        ? "flex-1 text-sm font-thin border pl-3 border-red-600 rounded-sm p-[6px] shadow-sm hover:border-red-600 focus:border-red-600 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-red-600"
        : "flex-1 text-sm font-thin border pl-3 border-gray-300 rounded-sm p-[6px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a] focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-[#36ad695d]";

    return (
        <>
            {fields.map((field, index) => (
                <div key={index} className="flex mt-2 items-center space-x-6">
                    {count == '1' ?
                        <input
                            type={type}
                            value={field.value}
                            onChange={(event) => {
                                handleFieldChange(index, event);
                                if (onChange) onChange(event); // Pass to parent handler
                            }}
                            onBlur={onBlur} // Trigger validation on blur
                            placeholder={placeholder}
                            className={`flex-1 text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                            ${isError ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]'
                                    : 'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`
                            }
                        />
                        :
                        <div className='flex-1 w-full '>
                            <input
                                type={type}
                                value={field.value}
                                onChange={(event) => handleFieldChange(index, event)}
                                placeholder={placeholder}
                                className=" w-1/2 text-sm font-thin border pl-3 border-gray-300 rounded-l-sm p-[6px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a] focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-[#36ad695d]"
                            />
                            <input
                                type={type}
                                value={field.value}
                                onChange={(event) => handleFieldChange(index, event)}
                                placeholder={placeholder}
                                className="  w-1/2 text-sm font-thin border pl-3 border-gray-300 rounded-r-sm p-[6px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a] focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-[#36ad695d]"
                            />
                        </div>
                    }

                    <div className="flex">
                        {/* Decrement Button */}
                        <button
                            type="button"
                            onClick={() => removeField(index)}
                            disabled={fields.length === 1}
                            className={`flex items-center border-[1px] justify-center rounded-l-full px-2 py-2 text-2xl hover:border-[#36ad6a] hover:text-[#36ad6a] ${fields.length === 1 ? 'cursor-not-allowed text-gray-400' : 'text-gray-600'}`}
                        >
                            <IoRemoveOutline style={{ fontSize: '18px' }} />
                        </button>

                        {/* Increment Button */}
                        <button
                            type="button"
                            onClick={addField}
                            disabled={fields.length === 5}
                            className={`flex items-center border-[1px] justify-center rounded-r-full px-2 py-2 text-2xl hover:border-[#36ad6a] hover:text-[#36ad6a] ${fields.length === 5 ? 'cursor-not-allowed text-gray-400' : 'text-gray-600'}`}
                        >
                            <IoAdd style={{ fontSize: '18px' }} />
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default IncInput;
