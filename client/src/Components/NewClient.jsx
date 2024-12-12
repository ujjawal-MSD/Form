import React, { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import { IoCheckmarkSharp } from "react-icons/io5";
import Form from "./Form";
import FinalStep from "./FinalStep";
import { TailSpin } from 'react-loader-spinner';
import EmailSend from "./Services/EmailSend";

const generateRequestId = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const randomNum = ('0000' + Math.floor(Math.random() * 10000)).slice(-4);
    return `${year}${month}${day}-${randomNum}`;
};

// Validation Function
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const NewClient = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        requestId: generateRequestId(),
        companyName: "",
        clientEmail: "",
        clientContactNo: "",
        category: "",
        description: "",
        targetCountry: "",
        targetState: "",
        targetCity: "",
        submissionDateTime: new Date().toISOString(),
    });

    const [errors, setErrors] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const validateStep = () => {
        let tempErrors = {};
        if (currentStep === 1) {
            if (!formData.companyName) tempErrors.companyName = "The Company Name field must have a value.";

            if (!formData.clientEmail.trim()) {
                tempErrors.clientEmail = "The Client Email field must have a value.";
            } else if (!validateEmail(formData.clientEmail)) {
                tempErrors.clientEmail = "The Client Email must be a valid email address.";
            }

            if (!formData.clientContactNo) tempErrors.clientContactNo = "The Client Contact No. field must have a value";

            if (!formData.category) tempErrors.category = "The Category field must have a value";

            if (!formData.description) tempErrors.description = "The Description field must have a value";

            if (!formData.targetCountry) tempErrors.targetCountry = "The Target Country field must have a value";

            if (!formData.targetState) tempErrors.targetState = "The Target State field must have a value";

            if (!formData.targetCity) tempErrors.targetCity = "The Target City field must have a value";

        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleBlur = (field) => {
        let tempErrors = { ...errors };
        switch (field) {
            case "companyName":
                if (!formData.companyName) {
                    tempErrors.companyName = "The Company Name field must have a value.";
                } else {
                    tempErrors.companyName = "";
                }
                break;

            case "clientEmail":
                if (!formData.clientEmail.trim()) {
                    tempErrors.clientEmail = "The Client Email field must have a value.";
                } else if (!validateEmail(formData.clientEmail)) {
                    tempErrors.clientEmail = "The Client Email must be a valid email address.";
                } else {
                    tempErrors.clientEmail = "";
                }
                break;

            case 'clientContactNo':
                if (!formData.clientContactNo) {
                    tempErrors.clientContactNo = "The Client Contact No. field must have a value";
                } else {
                    tempErrors.clientContactNo = "";
                }
                break;

            case 'category':
                if (!formData.category) {
                    tempErrors.category = "The Category field must have a value";
                } else {
                    tempErrors.category = "";
                }
                break;

            case 'description':
                if (!formData.description) {
                    tempErrors.description = "The Description field must have a value";
                } else {
                    tempErrors.description = "";
                }
                break;

            case 'targetCountry':
                if (!formData.targetCountry) {
                    tempErrors.targetCountry = "The Target Country field must have a value";
                } else {
                    tempErrors.targetCountry = "";
                }
                break;

            case 'targetState':
                if (!formData.targetState) {
                    tempErrors.targetState = "The Target State field must have a value";
                } else {
                    tempErrors.targetState = "";
                }
                break;

            case 'targetCity':
                if (!formData.targetCity) {
                    tempErrors.targetCity = "The Target City field must have a value";
                } else {
                    tempErrors.targetCity = "";
                }
                break;

            default:
                break;
        }

        setErrors(tempErrors);
    };

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const isValid = validateStep();
        if (isValid) {
            try {
                // console.log('Form data:', formData); // Debugging log
                await EmailSend(formData);
                // console.log('Form Submitted Successfully!'); // Debugging log
                toast.success('Form Submitted Successfully!');
                nextStep();
            } catch (error) {
                // console.error('Error Form Submission', error);
                toast.error('Error Form Submission');
            } finally {
                setIsLoading(false);
            }
        } else {
            // console.error('Form validation failed'); // Debugging log
            toast.error('Form validation failed');
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full md:grid md:grid-cols-12 gap-3 bg-[#fafafa]">
            <Toaster />
            <div className="md:col-span-10 md:ml-[calc(20%+2.4px)]">
                <div className="relative block overflow-hidden p-3">
                    <div className="m-3 overflow-auto h-full" style={{ boxShadow: "0 1.6px 3.6px rgba(0,0,0,0.132), 0 0.3px 0.9px rgba(0,0,0,0.108)" }}>
                        <header className="flex bg-[#908d89] h-[50px] justify-between items-center">
                            <div className="flex text-sm md:flex-row">
                                <div className="cursor-pointer py-[0.6rem] md:py-[14px] px-4 md:px-[29px] border-t-2 md:border-t-[3px] bg-white border-black text-[#282f3a]">
                                    Client Details
                                </div>
                            </div>
                            <div className="hidden md:block items-center">
                                <select value={selectedLanguage} onChange={handleLanguageChange} className="border text-[#282f3a] border-gray-300 rounded-sm p-2 h-10 w-36 mr-[5px]">
                                    <option value="English">English</option>
                                </select>
                            </div>
                        </header>
                        <div className="px-6 pb-5 bg-white relative">
                            <ul className="relative flex flex-row gap-x-2 p-3 w-full overflow-hidden">
                                {[
                                    { label: 'Information', count: 1 },
                                    { label: 'Finish', count: 2 }
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
                                        {step.count !== 2 && (
                                            <div className={`w-full h-px flex-1 ${step.count === currentStep ? "bg-blue-600" : ""} ${step.count < currentStep ? "bg-green-600" : "bg-gray-200"}`} />
                                        )}
                                    </li>
                                ))}
                            </ul>
                            {isLoading && (
                                <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center">
                                    <TailSpin color="#16a34a" height={50} width={50} />
                                </div>
                            )}
                            <>
                                <div>
                                    {currentStep === 1 && <Form formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleBlur={handleBlur} />}
                                    {currentStep === 2 && <FinalStep requestId={formData.requestId} />}
                                    <div className="mt-5 flex justify-center items-center gap-x-2">
                                        {currentStep === 1 && (
                                            <button
                                                type="button"
                                                className="py-[6px] px-[14px] inline-flex items-center gap-x-1 text-sm font-medium rounded-sm text-white bg-[#CC5F5A] hover:bg-[#c77874] focus:outline-none"
                                                onClick={handleSubmit}
                                            >
                                                Submit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewClient;