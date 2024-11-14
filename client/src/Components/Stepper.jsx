import React, { useState } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";

const Stepper = ({ steps, currentStep, onNext, onBack }) => {
    const [stepIndex, setStepIndex] = useState(currentStep || 1);

    const handleNext = () => {
        if (stepIndex < steps.length) {
            setStepIndex(stepIndex + 1);
            onNext && onNext(stepIndex + 1);
        } else {
            // Optionally reset to first step or handle completion
            setStepIndex(1);
        }
    };

    const handleBack = () => {
        if (stepIndex > 1) {
            setStepIndex(stepIndex - 1);
            onBack && onBack(stepIndex - 1);
        }
    };

    return (
        <div className="overflow-x-hidden">
            {/* Stepper Navigation */}
            <ul className="relative flex flex-row gap-x-2 p-3 w-[1200px] overflow-hidden">
                {steps.map((step, index) => (
                    <li key={index} className={`my-6 flex items-center gap-x-2 shrink basis-0 flex-1 ${index + 1 <= stepIndex ? "success" : ""} ${index + 1 === stepIndex ? "active" : ""}`}>
                        <span className="min-w-7 min-h-7 inline-flex items-center text-xs align-middle focus:outline-none">
                            <span className={`size-7 flex justify-center items-center shrink-0 font-medium rounded-full  border-[1px] ${index + 1 === stepIndex ? "bg-[#282F3A] text-white  border-green-600" : index + 1 < stepIndex ? "bg-transparent text-green-600 border-green-600" : "border-[#C2C2C2] text-[#C2C2C2]"}`}>
                                {index + 1 < stepIndex ? (
                                    // If the step is completed, show the checkmark
                                    <IoCheckmarkSharp className="text-green-500 text-base font-semibold" />
                                ) : index + 1 === stepIndex ? (
                                    // If this is the active step, show the step number
                                    <span className="text-base">{index + 1}</span>
                                ) : (
                                    // If this is a future step, show the step number
                                    <span className="text-base">{index + 1}</span>
                                )}
                            </span>
                            <span className={`ms-2 text-base font-medium  ${index + 1 === stepIndex ? " text-gray-800" : " text-[#C2C2C2]"}`}>{step.label}</span>
                        </span>
                        {index + 1 !== steps.length && (
                            <div className={`w-full h-px flex-1 ${index + 1 === stepIndex ? "bg-blue-600" : ""} ${index + 1 < stepIndex ? "bg-green-600" : "bg-gray-200"}`}></div>
                        )}
                    </li>
                ))}
            </ul>

            {/* Stepper Content */}
            <div>
                {steps[stepIndex - 1] && (
                    <div>
                        {steps[stepIndex - 1].content}
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-5 flex justify-center items-center gap-x-2">
                    <button type="button" className="py-[6px] px-[14px] inline-flex items-center gap-x-1 text-sm font-medium rounded-md border border-gray-200 bg-[#A7837A] text-white shadow-sm hover:bg-[#ababab] hover:border-blue-500 focus:outline-none focus:bg-gray-50" onClick={handleBack} disabled={stepIndex === 1}>
                        Preview Step
                    </button>
                    <button type="button" className="py-[6px] px-[14px] inline-flex items-center gap-x-1 text-sm font-medium rounded-sm border border-green-600 bg-[#282F3A] text-white hover:bg-[#347DA3FF] focus:outline-none focus:bg-blue-700" onClick={handleNext}>
                        {stepIndex < steps.length ? "Next Step" : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Stepper;