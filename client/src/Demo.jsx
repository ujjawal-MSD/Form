import React, { useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import FinalStep from "./FinalStep";

// Validation Functions
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const checkForDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) !== index);
};

const Demo = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        names: [""],
        emails: [""],
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    // Step Validation Logic
    const validateStep = () => {
        let tempErrors = {};

        if (currentStep === 1) {
            if (formData.names.some(name => !name.trim())) {
                tempErrors.names = "Please enter at least one name.";
            }
            if (formData.emails.some(email => !email.trim())) {
                tempErrors.emails = "Please enter at least one email address.";
            } else {
                formData.emails.forEach((email, index) => {
                    if (email && !validateEmail(email)) {
                        tempErrors.emails = tempErrors.emails || [];
                        tempErrors.emails[index] = "Invalid email address.";
                    }
                });
            }
            const duplicateEmails = checkForDuplicates(formData.emails);
            if (duplicateEmails.length > 0) {
                tempErrors.emails = "Emails cannot be duplicated.";
            }
        }

        if (currentStep === 2) {
            if (!formData.email) {
                tempErrors.email = "Email is required.";
            } else if (!validateEmail(formData.email)) {
                tempErrors.email = "Please enter a valid email address.";
            }
        }

        if (currentStep === 3 && !formData.password) {
            tempErrors.password = "Password is required.";
        }

        if (currentStep === 4 && formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle Blur Validation for Fields
    const handleBlur = (field) => {
        let tempErrors = { ...errors };

        switch (field) {
            case "email":
                if (!formData.email) {
                    tempErrors.email = "Email is required.";
                } else if (!validateEmail(formData.email)) {
                    tempErrors.email = "Invalid email address.";
                } else {
                    tempErrors.email = "";
                }
                break;
            case "emails":
                const emailErrors = formData.emails.map((email) =>
                    !email ? "Email is required" : !validateEmail(email) ? "Invalid email address" : ""
                );
                tempErrors.emails = emailErrors;
                break;
            case "password":
                tempErrors.password = formData.password ? "" : "Password is required.";
                break;
            case "confirmPassword":
                tempErrors.confirmPassword = formData.password !== formData.confirmPassword ? "Passwords do not match." : "";
                break;
            case "names":
                tempErrors.names = formData.names.some(name => !name) ? "Please enter at least one name." : "";
                break;
            default:
                break;
        }

        if (field === 'emails') {
            const duplicateEmails = checkForDuplicates(formData.emails);
            if (duplicateEmails.length > 0) {
                tempErrors.emails = "Emails cannot be duplicated.";
            }
        }

        setErrors(tempErrors);
    };

    // Step Navigation Handlers
    const nextStep = () => {
        const isValid = validateStep();
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, 5)); // Ensure we don't go beyond 5
        }
    };

    const goBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1)); // Ensure we don't go below 1
    };

    return (
        <div className="w-full md:grid md:grid-cols-12 gap-3 bg-[#fafafa]">
            <div className="md:col-span-10 md:ml-[calc(20%+2.4px)]">
                <div className="relative block overflow-hidden p-3">
                    <div className="m-3 overflow-auto h-full" style={{ boxShadow: "0 1.6px 3.6px rgba(0,0,0,0.132), 0 0.3px 0.9px rgba(0,0,0,0.108)" }}>
                        {/* Header with Tabs */}
                        <header className="flex bg-[#908d89] h-[50px] justify-between items-center">
                            <div className="flex text-sm md:flex-row">
                                <div className="cursor-pointer py-[0.6rem] md:py-[14px] px-4 md:px-[29px] border-t-2 md:border-t-[3px] bg-white border-black text-[#282f3a]">
                                    New Client
                                </div>
                            </div>
                            <div className="hidden md:block items-center">
                                <select value={selectedLanguage} onChange={handleLanguageChange} className="border text-[#282f3a] border-gray-300 rounded-sm p-2 h-10 w-36 mr-[5px]">
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="French">French</option>
                                </select>
                            </div>
                        </header>

                        {/* Content Area */}
                        <div className="px-6 pb-5 bg-white">
                            {/* Stepper Navigation */}
                            <ul className="relative flex flex-row gap-x-2 p-3 w-full overflow-hidden">
                                {[
                                    { label: 'Agent Information', count: 1 },
                                    { label: 'Company Information', count: 2 },
                                    { label: 'Staging Information', count: 3 },
                                    { label: 'Prod Information', count: 4 },
                                    { label: 'Finish', count: 5 }
                                ].map((step) => (
                                    <li key={step.count} className={`my-6 flex items-center gap-x-2 shrink basis-0 flex-1 ${step.count <= currentStep ? "success" : ""} ${step.count === currentStep ? "active" : ""}`}>
                                        <span className="min-w-7 min-h-7 inline-flex items-center text-xs">
                                            <span className={`size-7 flex justify-center items-center rounded-full border-[1px] ${step.count === currentStep ? "bg-[#282F3A] text-white border-green-600" : step.count < currentStep ? "bg-transparent text-green-600 border-green-600" : "border-[#C2C2C2] text-[#C2C2C2]"}`}>
                                                {step.count < currentStep ? (
                                                    <IoCheckmarkSharp className="text-green-500 text-base font-semibold" />
                                                ) : (
                                                    <span className="text-base">{step.count}</span>
                                                )}
                                            </span>
                                            <span className={`ms-2 text-base font-medium ${step.count === currentStep ? "text-gray-800" : "text-[#C2C2C2]"}`}>
                                                {step.label}
                                            </span>
                                        </span>
                                        {step.count !== 5 && (
                                            <div className={`w-full h-px flex-1 ${step.count === currentStep ? "bg-blue-600" : ""} ${step.count < currentStep ? "bg-green-600" : "bg-gray-200"}`} />
                                        )}
                                    </li>
                                ))}
                            </ul>

                            {/* Stepper Content */}
                            <div>
                                {currentStep === 1 && <StepOne formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleBlur={handleBlur} />}
                                {currentStep === 2 && <StepTwo formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleBlur={handleBlur} />}
                                {currentStep === 3 && <StepThree formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleBlur={handleBlur} />}
                                {currentStep === 4 && <StepFour formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleBlur={handleBlur} />}
                                {currentStep === 5 && <FinalStep formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />}

                                {/* Navigation Buttons */}
                                <div className="mt-5 flex justify-center items-center gap-x-2">
                                    {currentStep > 1 && currentStep !== 5 && (
                                        <button
                                            type="button"
                                            className="py-[6px] px-[14px] inline-flex items-center gap-x-1 text-sm font-medium rounded-[4px] border border-gray-200 bg-[#A7837A] text-white shadow-sm hover:bg-[#ababab] hover:border-blue-500"
                                            onClick={goBack}
                                            disabled={currentStep === 1}
                                        >
                                            Preview Step
                                        </button>
                                    )}
                                    {currentStep < 4 && (
                                        <button
                                            type="button"
                                            className="py-[6px] px-[14px] inline-flex items-center gap-x-1 text-sm font-medium rounded-sm text-white border border-green-600 bg-[#282F3A] hover:bg-[#347DA3FF] focus:outline-none"
                                            onClick={nextStep}
                                        >
                                            Next Step
                                        </button>
                                    )}
                                    {currentStep === 4 && (
                                        <button
                                            type="button"
                                            className="py-[6px] px-[14px] inline-flex items-center gap-x-1 text-sm font-medium rounded-sm text-white bg-[#CC5F5A] hover:bg-[#c77874] focus:outline-none"
                                            onClick={nextStep}
                                        >
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Demo;
