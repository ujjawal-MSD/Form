import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa'; // Importing the + and - icons from react-icons
import { IoAdd, IoRemoveOutline } from "react-icons/io5";

const IncInput = () => {
    const [emailFields, setEmailFields] = useState([{ email: '' }]);

    const handleEmailChange = (index, event) => {
        const updatedFields = [...emailFields];
        updatedFields[index].email = event.target.value;
        setEmailFields(updatedFields);
    };

    const addEmailField = () => {
        if (emailFields.length < 5) {
            setEmailFields([...emailFields, { email: '' }]);
        }
    };

    const removeEmailField = (index) => {
        if (emailFields.length > 1) {
            const updatedFields = [...emailFields];
            updatedFields.splice(index, 1);
            setEmailFields(updatedFields);
        }
    };

    return (
        <>
            {emailFields.map((field, index) => (
                <div key={index} className="flex mt-2 items-center space-x-6">
                    <input
                        type="email"
                        value={field.email}
                        onChange={(event) => handleEmailChange(index, event)}
                        placeholder="Please input"
                        className="flex-1 text-sm font-thin border pl-[10px] border-gray-300 rounded-sm p-[6px] shadow-sm hover:border-[#36ad6a] focus:border-[#36ad6a] focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)] focus:shadow-[#36ad695d]"
                    />

                    <div className="flex ">
                        {/* Decrement Button */}
                        <button
                            type="button"
                            onClick={() => removeEmailField(index)}
                            disabled={emailFields.length === 1}
                            className={`flex items-center border-[1px] justify-center rounded-l-full px-[7px] py-[7px] text-2xl hover:border-[#36ad6a] hover:text-[#36ad6a] ${emailFields.length === 1 ? ' cursor-not-allowed text-[#33363963]' : 'text-[#333639] '}`}
                        >
                            <IoRemoveOutline style={{ fontSize: '18px' }} />
                        </button>

                        {/* Increment Button */}
                        <button
                            type="button"
                            onClick={addEmailField}
                            disabled={emailFields.length === 5}
                            className={`flex items-center border-[1px] justify-center rounded-r-full  px-[7px] py-[7px] text-2xl hover:border-[#36ad6a] hover:text-[#36ad6a] ${emailFields.length === 5 ? ' cursor-not-allowed text-[#33363963]' : ' text-[#333639]'}`}
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
