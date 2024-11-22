import React, { useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import StepOne from "../StepOne";
import StepTwo from "../StepTwo";
import StepThree from "../StepThree";
import StepFour from "../StepFour";
import FinalStep from "../FinalStep";

// Validation Functions
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

const checkForDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) !== index);
};

const checkForDuplicateCredentials = (credentials) => {
    const seen = new Set();
    const duplicates = new Set();
    credentials.forEach(cred => {
        const key = `${cred.accountName}-${cred.password}`;
        if (seen.has(key)) {
            duplicates.add(key);
        } else {
            seen.add(key);
        }
    });
    return duplicates.size > 0;
};

const NewClient = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        emails: [""],
        walletType: "",
        skypeGroup: [""],
        brandName: [""],
        technicalSupport: [""],
        technicalSupportEmail: [""],
        groupName: "",


        companyName: "",
        selectedCountries: [], // Add this line
        otherCountry: "",
        adminEmail: [""],

        endPoint: [""],
        lobbyUrl: [""],
        loginCredentials: [[{ accountName: "", password: "" }]],
        ipAddress: [[""]],
        provider: [],

        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const invalidNames = /^(?!.*(?:group|brand|demo|test|staging|production))^[a-zA-Z0-9]+$/i;

    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}$/;

    // Step Validation Logic
    const validateStep = () => {
        let tempErrors = {};

        if (currentStep === 1) {
            if (formData.walletType === "") {
                tempErrors.walletType = "The Wallet Type field must have a value.";
            }

            if (formData.emails.some(email => !email.trim())) {
                tempErrors.emails = "The email field must have a value.";
            } else {
                formData.emails.forEach((email, index) => {
                    if (email && !validateEmail(email)) {
                        tempErrors.emails = tempErrors.emails || [];
                        tempErrors.emails[index] = "The email must be a valid email address.";
                    }
                });
            }
            const duplicateEmails = checkForDuplicates(formData.emails);
            if (duplicateEmails.length > 0) {
                tempErrors.emails = "The email field has a duplicate value.";
            }

            if (formData.skypeGroup.some(skypeGroup => !skypeGroup.trim())) {
                tempErrors.skypeGroup = "The Skype Group Name field must have a value.";
            }
            const duplicateSkypeGroup = checkForDuplicates(formData.skypeGroup);
            if (duplicateSkypeGroup.length > 0) {
                tempErrors.skypeGroup = "The Skype Group field has a duplicate value.";
            }

            if (formData.brandName.some(brandName => !brandName.trim())) {
                tempErrors.brandName = "The Brand Name field must have a value.";
            } else if (formData.brandName.some(brandName => invalidNames.test(brandName))) {
                tempErrors.brandName = "The Brand Name is not valid.";
            }
            const duplicateBrandName = checkForDuplicates(formData.brandName);
            if (duplicateBrandName.length > 0) {
                tempErrors.brandName = "The Brand Name field has a duplicate value.";
            }

            if (formData.technicalSupport.some(technicalSupport => !technicalSupport.trim())) {
                tempErrors.technicalSupport = "The Technical Support Personnel field must have a value.";
            }
            const duplicateTechnicalSupport = checkForDuplicates(formData.technicalSupport);
            if (duplicateTechnicalSupport.length > 0) {
                tempErrors.technicalSupport = "The Technical Support Personnel field has a duplicate value.";
            }

            if (!formData.groupName) {
                tempErrors.groupName = "The Group Name field must have a value.";
            } else if (invalidNames.test(formData.groupName)) {
                tempErrors.groupName = "Please enter a valid Group Name.";
            }

            if (formData.technicalSupportEmail.some(technicalSupportEmail => !technicalSupportEmail.trim())) {
                tempErrors.technicalSupportEmail = "The Technical Support Personnel Email field must have a value.";
            } else formData.technicalSupportEmail.forEach((email, index) => {
                if (email && !validateEmail(email)) {
                    tempErrors.technicalSupportEmail = tempErrors.technicalSupportEmail || [];
                    tempErrors.technicalSupportEmail[index] = "The email must be a valid email address.";
                }
            });
            const duplicateTechnicalSupportEmail = checkForDuplicates(formData.technicalSupportEmail);
            if (duplicateTechnicalSupportEmail.length > 0) {
                tempErrors.technicalSupportEmail = "The Technical Support Personnel Email field has a duplicate value.";
            }




            if (formData.provider.length === 0) {
                tempErrors.provider = "The Provider field is required.";
            } else {
                for (const provider of formData.provider) {
                    if (["hacksaw", "nolimit city"].some(name => provider.id.toLowerCase().includes(name)) && !provider.rtp) {
                        tempErrors.provider = 'The RTP field is required.';
                        break;
                    }
                }
            }


        }




        if (currentStep === 2) {

            if (!formData.companyName) {
                tempErrors.companyName = "The Company Name field must have a value.";
            }

            if (formData.adminEmail.some(email => !email.trim())) {
                tempErrors.adminEmail = "The BO Admin Email field must have a value.";
            } else {
                formData.adminEmail.forEach((email, index) => {
                    if (email && !validateEmail(email)) {
                        tempErrors.adminEmail = tempErrors.adminEmail || [];
                        tempErrors.adminEmail[index] = "The BO Admin Email must be a valid email address.";
                    }
                });
            }
            const duplicateAdminEmail = checkForDuplicates(formData.adminEmail);
            if (duplicateAdminEmail.length > 0) {
                tempErrors.adminEmail = "The BO Admin Email field has a duplicate value.";
            }

            if (formData.selectedCountries.length === 0) {
                tempErrors.selectedCountries = "The Main Operations Market field must have a value.";
            } else if (formData.selectedCountries.includes("Other") && !formData.otherCountry.trim()) {
                tempErrors.selectedCountries = "If Other is checked, please provide additional information.";
            }


        }

        if (currentStep === 3) {

            if (!formData.endPoint) {
                tempErrors.endPoint = "The End Point field must have a value.";
            } else if (!(formData.endPoint.startsWith("https://") || formData.endPoint.startsWith("http://"))) {
                tempErrors.endPoint = "The End Point must start with one of the following: http:// or https://.";
            }


            if (formData.lobbyUrl.length >= 200) {
                tempErrors.lobbyUrl = "The Lobby Url must be less than 200 characters.";
            }


            if (formData.loginCredentials.some(cred => (cred.accountName && !cred.password) || (!cred.accountName && cred.password))) {
                // Check for missing fields in login credentials
                tempErrors.loginCredentials = formData.loginCredentials.map((cred, index) => {
                    if ((cred.accountName && !cred.password) || (!cred.accountName && cred.password)) {
                        return `Login credentials at index ${index} are incomplete.`;
                    }
                    return null; // No error for this credential
                }).filter(error => error !== null); // Remove null entries
            }

            if (checkForDuplicateCredentials(formData.loginCredentials)) {
                tempErrors.loginCredentials = tempErrors.loginCredentials || [];
                tempErrors.loginCredentials.push("Duplicate login credentials are not allowed.");
            }






            if (formData.ipAddress.some(ip => !ip.trim())) {
                tempErrors.ipAddress = "The IP field must have a value.";
            } else {
                formData.ipAddress.forEach((ip, index) => {
                    if (ip && !ipv4Regex.test(ip)) {
                        tempErrors.ipAddress = tempErrors.ipAddress || [];
                        tempErrors.ipAddress[index] = (`The IP ["${ip}"] must be a valid IPv4 address.`)
                    }
                });
            }

        }

        if (currentStep === 4) {
            // tempErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Handle Blur Validation for Fields
    const handleBlur = (field) => {
        let tempErrors = { ...errors };

        switch (field) {

            // Step One 
            case "emails":
                const emailErrors = formData.emails.map((email) =>
                    !email ? "The email field must have a value." : !validateEmail(email) ? "The email must be a valid email address." : ""
                );
                tempErrors.emails = emailErrors;
                break;

            case "walletType":
                if (!formData.walletType) {
                    tempErrors.walletType = "The Wallet Type field must have a value.";
                } else {
                    tempErrors.walletType = "";
                }
                break;


            case "skypeGroup":
                if (formData.skypeGroup.some(group => !group.trim())) {
                    tempErrors.skypeGroup = "The Skype Group Name field must have a value.";
                } else {
                    tempErrors.skypeGroup = "";
                }
                break;

            case "groupName":
                if (!formData.groupName) {
                    tempErrors.groupName = "The Group Name field must have a value.";
                } else if (invalidNames.test(formData.groupName)) {
                    tempErrors.groupName = "The Group Name is not valid.";
                } else {
                    tempErrors.groupName = "";
                }
                break;

            case "brandName":
                if (formData.brandName.some(group => !group.trim())) {
                    tempErrors.brandName = "The Brand Name field must have a value.";
                } else if (formData.brandName.some(brandName => invalidNames.test(brandName))) {
                    tempErrors.brandName = "The Brand Name is not valid.";
                } else {
                    tempErrors.brandName = "";
                }
                break;
            case "technicalSupport":
                if (formData.technicalSupport.some(group => !group.trim())) {
                    tempErrors.technicalSupport = "The Technical Support Personnel field must have a value.";
                } else {
                    tempErrors.technicalSupport = "";
                }
                break;
            case "technicalSupportEmail":
                const technicalSupportEmailErrors = formData.technicalSupportEmail.map((email) =>
                    !email ? "The Technical Support Personnel Email field must have a value." : !validateEmail(email) ? "The Technical Support Personnel Email must be a valid email address." : ""
                );
                tempErrors.technicalSupportEmail = technicalSupportEmailErrors;
                break;


            case "provider":
                if (formData.provider.length === 0) {
                    tempErrors.provider = "The Provider field is required.";
                } else {
                    let providerError = "";
                    for (const provider of formData.provider) {
                        if (["hacksaw", "nolimit city"].some(name => provider.id.toLowerCase().includes(name)) && !provider.rtp) {
                            providerError = 'The RTP field is required.';
                            break;
                        }
                    }
                    tempErrors.provider = providerError;
                }
                break;







            // Second Step
            case "companyName":
                if (!formData.companyName) {
                    tempErrors.companyName = "The Company Name field must have a value.";
                } else {
                    tempErrors.companyName = "";
                }
                break;


            case "selectedCountries":
                if (formData.selectedCountries.length === 0) {
                    tempErrors.selectedCountries = "The Main Operations Market field must have a value.";
                } else if (formData.selectedCountries.includes("Other") && !formData.otherCountry.trim()) {
                    tempErrors.selectedCountries = "If Other is checked, please provide additional information.";
                } else {
                    tempErrors.selectedCountries = "";
                }
                break;


            case "adminEmail":
                const adminEmailErrors = formData.adminEmail.map((email) =>
                    !email ? "The email field must have a value." : !validateEmail(email) ? "The BO Admin Email must be a valid email address." : ""
                );
                tempErrors.adminEmail = adminEmailErrors;
                break;






            // Step Three 

            case "endPoint":
                if (!formData.endPoint) {
                    tempErrors.endPoint = "The End Point field must have a value.";
                } else if (!(formData.endPoint.startsWith("https://") || formData.endPoint.startsWith("http://"))) {
                    tempErrors.endPoint = "The End Point must start with one of the following: http:// or https://.";
                } else {
                    tempErrors.endPoint = "";
                }
                break;

            case "lobbyUrl":
                if (formData.lobbyUrl.length >= 200) {
                    tempErrors.lobbyUrl = "The Lobby Url must be less than 200 characters.";
                } else {
                    tempErrors.lobbyUrl = "";
                }
                break;



            case "loginCredentials":
                const loginCredentialsErrors = formData.loginCredentials.map((cred) =>
                    (cred.accountName && !cred.password) || (!cred.accountName && cred.password)
                        ? "The Login Credentials field is required when Login Credentials is present."
                        : ""
                );
                tempErrors.loginCredentials = loginCredentialsErrors.filter(error => error !== "");

                if (checkForDuplicateCredentials(formData.loginCredentials)) {
                    tempErrors.loginCredentials = tempErrors.loginCredentials || [];
                    tempErrors.loginCredentials.push("Duplicate login credentials are not allowed.");
                }
                break;



            case "ipAddress":
                const ipAddressErrors = formData.ipAddress.map((ip) =>
                    !ip ? "The IP field must have a value." : !ipv4Regex.test(ip) ? (`The IP ["${ip}"] must be a valid IPv4 address.`) : ""
                );
                tempErrors.ipAddress = ipAddressErrors;
                break;



            case "email":
                if (!formData.email) {
                    tempErrors.email = "The email field must have a value.";
                } else if (!validateEmail(formData.email)) {
                    tempErrors.email = "The email must be a valid email address.";
                } else {
                    tempErrors.email = "";
                }
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
                tempErrors.emails = "The email field has a duplicate value.";
            }
        }

        if (field === 'skypeGroup') {
            const duplicateSkypeGroup = checkForDuplicates(formData.skypeGroup);
            if (duplicateSkypeGroup.length > 0) {
                tempErrors.skypeGroup = "The Skype Group field has a duplicate value.";
            }
        }

        if (field === 'brandName') {
            const duplicateBrandName = checkForDuplicates(formData.brandName);
            if (duplicateBrandName.length > 0) {
                tempErrors.brandName = "The Brand Name field has a duplicate value.";
            }
        }

        if (field === 'technicalSupport') {
            const duplicateTechnicalSupport = checkForDuplicates(formData.technicalSupport);
            if (duplicateTechnicalSupport.length > 0) {
                tempErrors.technicalSupport = "The Technical Support Personnel field has a duplicate value.";
            }
        }

        if (field === 'technicalSupportEmail') {
            const duplicateTechnicalSupportEmail = checkForDuplicates(formData.technicalSupportEmail);
            if (duplicateTechnicalSupportEmail.length > 0) {
                tempErrors.technicalSupportEmail = "The Technical Support Personnel Email field has a duplicate value.";
            }
        }


        if (field === 'adminEmail') {
            const duplicateAdminEmail = checkForDuplicates(formData.adminEmail);
            if (duplicateAdminEmail.length > 0) {
                tempErrors.adminEmail = "The BO Admin email field has a duplicate value.";
            }
        }

        if (field === 'ipAddress') {
            const duplicateIpAddress = checkForDuplicates(formData.ipAddress);
            if (duplicateIpAddress.length > 0) {
                tempErrors.ipAddress = "The IP field has a duplicate value.";
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

export default NewClient
