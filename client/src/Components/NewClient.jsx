import React, { useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import StepOne from "./Steppers/StepOne";
import StepTwo from "./Steppers/StepTwo";
import StepThree from "./Steppers/StepThree";
import StepFour from "./Steppers/StepFour";
import FinalStep from "./Steppers/FinalStep";
import { TailSpin } from 'react-loader-spinner';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

// Validation Function
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

// Duplicate Field Check Function
const checkForDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) !== index);
};

// Custom function to generate request ID in the format 241114-0005
const generateRequestId = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const randomNum = ('0000' + Math.floor(Math.random() * 10000)).slice(-4);
    return `${year}${month}${day}-${randomNum}`;
};


const whatsappNoRegex = /^\+?[0-9]{1,3}?[0-9]{10,15}$/;

const NewClient = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        requestId: generateRequestId(),

        //First Step
        companyName: "",
        companyUrl: "",
        hostingLocation: "",
        walletType: "Seamless/Single Wallet",
        provider: [],

        //Second Step
        clientEmail: [""],
        managerSkypeId: [""],
        financeSkypeId: [""],
        whatsappNo: [""],
        telegramId: [""],

        //Third Step
        backOfficeIpAddress: "",
        APIIpAddress: "",
        stagingEndpointURL: "",

        //Fouth Step
        prodBackOfficeIpAddress: "",
        prodApiIpAddress: "",
        prodEndpointURL: "",

        // Current Date and Time
        submissionDateTime: new Date().toISOString(),
    });

    const [errors, setErrors] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };


    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}$/;

    // Step Validation Logic
    const validateStep = () => {
        let tempErrors = {};

        if (currentStep === 1) {

            // Company Name
            if (!formData.companyName) {
                tempErrors.companyName = "The Company Name field must have a value.";
            }

            // Company URL
            if (!formData.companyUrl) {
                tempErrors.companyUrl = "The Company URL field must have a value.";
            }

            // Hosting Location
            if (formData.hostingLocation === "") {
                tempErrors.hostingLocation = "The Hosting Location field must have a value.";
            }


            // Provider 
            if (formData.provider.length === 0) {
                tempErrors.provider = "The Provider field is required.";
            }
        }

        if (currentStep === 2) {

            if (formData.clientEmail.some(email => !email.trim())) {
                tempErrors.clientEmail = "The Email Id field must have a value.";
            } else {
                formData.clientEmail.forEach((email, index) => {
                    if (email && !validateEmail(email)) {
                        tempErrors.clientEmail = tempErrors.clientEmail || [];
                        tempErrors.clientEmail[index] = "The Email must be a valid email address.";
                    }
                });
            }
            const duplicateClientEmail = checkForDuplicates(formData.clientEmail);
            if (duplicateClientEmail.length > 0) {
                tempErrors.clientEmail = "The Email Id field has a duplicate value.";
            }


            if (formData.managerSkypeId.some(skypeId => !skypeId.trim())) {
                tempErrors.managerSkypeId = "The Manager Skype User Id field must have a value.";
            }
            const duplicatemanagerSkypeId = checkForDuplicates(formData.managerSkypeId);
            if (duplicatemanagerSkypeId.length > 0) {
                tempErrors.managerSkypeId = "The Email Id field has a duplicate value.";
            }



            if (formData.financeSkypeId.some(skypeId => !skypeId.trim())) {
                tempErrors.financeSkypeId = "The Finance Skype User ID field must have a value.";
            }
            const duplicateFinanceSkypeId = checkForDuplicates(formData.financeSkypeId);
            if (duplicateFinanceSkypeId.length > 0) {
                tempErrors.financeSkypeId = "The Email Id field has a duplicate value.";
            }


            if (formData.whatsappNo.some(whatsapp => !whatsapp.trim() || !whatsappNoRegex.test(whatsapp))) {
                tempErrors.whatsappNo = "The Whatsapp No. field must have a valid value.";
            }
            const duplicateWhatsappNo = checkForDuplicates(formData.whatsappNo);
            if (duplicateWhatsappNo.length > 0) {
                tempErrors.whatsappNo = "The Whatsapp No. field has a duplicate value.";
            }

            if (formData.telegramId.some(telegram => !telegram.trim())) {
                tempErrors.telegramId = "The Telegram Id field must have a value.";
            }
            const duplicateTelegramId = checkForDuplicates(formData.telegramId);
            if (duplicateTelegramId.length > 0) {
                tempErrors.telegramId = "The Telegram Id field has a duplicate value.";
            }

        }



        if (currentStep === 3) {

            if (!formData.backOfficeIpAddress) {
                tempErrors.backOfficeIpAddress = "The Back Office IP Address field must have a value.";
            } else if (!ipv4Regex.test(formData.backOfficeIpAddress)) {
                tempErrors.backOfficeIpAddress = "The Back Office IP Address must be a valid IPv4 address.";
            }

            if (!formData.APIIpAddress) {
                tempErrors.APIIpAddress = "The API IP Address field must have a value.";
            } else if (!ipv4Regex.test(formData.APIIpAddress)) {
                tempErrors.APIIpAddress = "The API IP Address must be a valid IPv4 address.";
            }

            if (!formData.stagingEndpointURL) {
                tempErrors.stagingEndpointURL = "The Staging Endpoint URL field must have a value.";
            }

        }

        if (currentStep === 4) {
            if (!formData.prodBackOfficeIpAddress) {
                tempErrors.prodBackOfficeIpAddress = "The Back Office IP Address field must have a value.";
            } else if (!ipv4Regex.test(formData.prodBackOfficeIpAddress)) {
                tempErrors.prodBackOfficeIpAddress = "The Back Office IP Address must be a valid IPv4 address.";
            }

            if (!formData.prodApiIpAddress) {
                tempErrors.prodApiIpAddress = "The API IP Address field must have a value.";
            } else if (!ipv4Regex.test(formData.prodApiIpAddress)) {
                tempErrors.prodApiIpAddress = "The API IP Address must be a valid IPv4 address.";
            }

            if (!formData.prodEndpointURL) {
                tempErrors.prodEndpointURL = "The Production Endpoint URL field must have a value.";
            }
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle Blur Validation for Fields
    const handleBlur = (field) => {
        let tempErrors = { ...errors };

        switch (field) {

            // Step One 

            case "companyName":
                if (!formData.companyName) {
                    tempErrors.companyName = "The Company Name field must have a value.";
                } else {
                    tempErrors.companyName = "";
                }
                break;


            case "companyUrl":
                if (!formData.companyUrl) {
                    tempErrors.companyUrl = "The Company URL field must have a value.";
                } else {
                    tempErrors.companyUrl = "";
                }
                break;


            case "hostingLocation":
                if (!formData.hostingLocation) {
                    tempErrors.hostingLocation = "The Hosting Location field must have a value.";
                } else {
                    tempErrors.hostingLocation = "";
                }
                break;


            case "provider":
                if (formData.provider.length === 0) {
                    tempErrors.provider = "The Provider field is required.";
                } else {
                    tempErrors.provider = "";
                }
                break;


            // Second Step

            case "clientEmail":
                const clientEmailErrors = formData.clientEmail.map((email) =>
                    !email ? "The Email Id field must have a value." : !validateEmail(email) ? "The Email must be a valid email." : ""
                );
                tempErrors.clientEmail = clientEmailErrors;
                break;

            case "managerSkypeId":
                const managerSkypeIdErrors = formData.managerSkypeId.map((skypeId) =>
                    !skypeId ? "The Manager Skype User Id field must have a value." : ""
                );
                tempErrors.managerSkypeId = managerSkypeIdErrors;
                break;

            case "financeSkypeId":
                const financeSkypeIdErrors = formData.financeSkypeId.map((skypeId) =>
                    !skypeId ? "The Finance Skype User ID field must have a value." : ""
                );
                tempErrors.financeSkypeId = financeSkypeIdErrors;
                break;

            case "whatsappNo":
                const whatsappNoErrors = formData.whatsappNo.map((whatsapp) =>
                    !whatsapp ? "The Whatsapp No. field must have a value." : !whatsappNoRegex.test(whatsapp) ? "The Whatsapp No. must be valid ." : ""
                );
                tempErrors.whatsappNo = whatsappNoErrors;
                break;


            case "telegramId":
                const telegramIdErrors = formData.telegramId.map((telegram) =>
                    !telegram ? "The Telegram Id field must have a value." : ""
                );
                tempErrors.telegramId = telegramIdErrors;
                break;


            // Step Three

            case "backOfficeIpAddress":
                if (!formData.backOfficeIpAddress) {
                    tempErrors.backOfficeIpAddress = "The Back Office IP Address field must have a value.";
                } else if (!ipv4Regex.test(formData.backOfficeIpAddress)) {
                    tempErrors.backOfficeIpAddress = "The Back Office IP Address must be a valid IPv4 address.";
                } else {
                    tempErrors.backOfficeIpAddress = "";
                }
                break;

            case "APIIpAddress":
                if (!formData.APIIpAddress) {
                    tempErrors.APIIpAddress = "The API IP Address field must have a value.";
                } else if (!ipv4Regex.test(formData.APIIpAddress)) {
                    tempErrors.APIIpAddress = "The API IP Address must be a valid IPv4 address.";
                } else {
                    tempErrors.APIIpAddress = "";
                }
                break;


            case "stagingEndpointURL":
                if (!formData.stagingEndpointURL) {
                    tempErrors.stagingEndpointURL = "The Staging Endpoint URL field must have a value.";
                } else {
                    tempErrors.stagingEndpointURL = "";
                }
                break;




            // Step Fourth

            case "prodBackOfficeIpAddress":
                if (!formData.prodBackOfficeIpAddress) {
                    tempErrors.prodBackOfficeIpAddress = "The Back Office IP Address field must have a value.";
                } else if (!ipv4Regex.test(formData.prodBackOfficeIpAddress)) {
                    tempErrors.prodBackOfficeIpAddress = "The Back Office IP Address must be a valid IPv4 address.";
                } else {
                    tempErrors.prodBackOfficeIpAddress = "";
                }
                break;

            case "prodApiIpAddress":
                if (!formData.prodApiIpAddress) {
                    tempErrors.prodApiIpAddress = "The API IP Address field must have a value.";
                } else if (!ipv4Regex.test(formData.prodApiIpAddress)) {
                    tempErrors.prodApiIpAddress = "The API IP Address must be a valid IPv4 address.";
                } else {
                    tempErrors.prodApiIpAddress = "";
                }
                break;


            case "prodEndpointURL":
                if (!formData.prodEndpointURL) {
                    tempErrors.prodEndpointURL = "The Production Endpoint URL field must have a value.";
                } else {
                    tempErrors.prodEndpointURL = "";
                }
                break;

            default:
                break;
        }


        if (field === 'clientEmail') {
            const duplicateClientEmail = checkForDuplicates(formData.clientEmail);
            if (duplicateClientEmail.length > 0) {
                tempErrors.clientEmail = "The Email Id field has a duplicate value.";
            }
        }

        if (field === 'managerSkypeId') {
            const duplicatemanagerSkypeId = checkForDuplicates(formData.managerSkypeId);
            if (duplicatemanagerSkypeId.length > 0) {
                tempErrors.managerSkypeId = "The Manager Skype User Id field has a duplicate value.";
            }
        }

        if (field === 'financeSkypeId') {
            const duplicateFinanceSkypeId = checkForDuplicates(formData.financeSkypeId);
            if (duplicateFinanceSkypeId.length > 0) {
                tempErrors.financeSkypeId = "The Finance Skype User ID field has a duplicate value.";
            }
        }

        if (field === 'whatsappNo') {
            const duplicateWhatsappNo = checkForDuplicates(formData.whatsappNo);
            if (duplicateWhatsappNo.length > 0) {
                tempErrors.whatsappNo = "The Whatsapp No. field has a duplicate value.";
            }
        }

        if (field === 'telegramId') {
            const duplicateTelegramId = checkForDuplicates(formData.telegramId);
            if (duplicateTelegramId.length > 0) {
                tempErrors.telegramId = "The Telegram Id field has a duplicate value.";
            }
        }

        setErrors(tempErrors);
    };

    // Step Navigation Handlers
    const nextStep = () => {
        const isValid = validateStep();
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, 5)); // Ensure we don't go beyond 5
        } else {
            toast.error('Form validation failed'); // Show error toast
        }
    };


    const handleSubmit = async () => {
        setIsLoading(true); // Set loading to true
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/send-email`, formData);
            toast.success('Form Submitted Successfully!'); // Show success toast
            nextStep();
        } catch (error) {
            toast.error('Error Form Submittion');
        } finally {
            setIsLoading(false); // Set loading to false
        }
    };

    const goBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1)); // Ensure we don't go below 1
    };

    return (
        <div className="w-full md:grid md:grid-cols-12 gap-3 bg-[#fafafa]">
            <Toaster />
            <div className="md:col-span-10 md:ml-[calc(20%+2.4px)]">
                <div className="relative block overflow-hidden p-3">
                    <div className="m-3 overflow-auto h-full" style={{ boxShadow: "0 1.6px 3.6px rgba(0,0,0,0.132), 0 0.3px 0.9px rgba(0,0,0,0.108)" }}>
                        {/* Header with Tabs */}
                        <header className="flex bg-[#908d89] h-[50px] justify-between items-center">
                            <div className="flex text-sm md:flex-row">
                                <div className="cursor-pointer py-[0.6rem] md:py-[14px] px-4 md:px-[29px] border-t-2 md:border-t-[3px] bg-white border-black text-[#282f3a]">
                                    Account Details
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
                        <div className="px-6 pb-5 bg-white relative">

                            {/* Stepper Navigation */}
                            <ul className="relative flex flex-row gap-x-2 p-3 w-full overflow-hidden">
                                {[
                                    { label: 'Information', count: 1 },
                                    { label: 'Contact Details', count: 2 },
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
                            {isLoading && (
                                <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center">
                                    <TailSpin color="#16a34a" height={50} width={50} />
                                </div>
                            )}

                            <>
                                <div>
                                    {currentStep === 1 && <StepOne formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleBlur={handleBlur} />}
                                    {currentStep === 2 && <StepTwo formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleBlur={handleBlur} />}
                                    {currentStep === 3 && <StepThree formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleBlur={handleBlur} />}
                                    {currentStep === 4 && <StepFour formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} handleBlur={handleBlur} />}
                                    {currentStep === 5 && <FinalStep requestId={formData.requestId} />}

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

export default NewClient