import React, { useState } from 'react';

const Form = ({ formData, setFormData, setErrors, handleBlur, errors }) => {
    const sportsCasinoProviders = [
        "Cricket", "Football", "Tennis", "Kabaddi", "Esoccer", "Horse Racing", "Greyhound Racing",
        "Table Tennis", "Basketball", "Boxing", "Mixed Martial Arts", "American Football", "Volleyball", "Badminton",
        "Snooker", "Ice Hockey", "E Games", "Futsal", "Handball", "Motor Sports", "Politics"
    ];

    const liveCasinoProviders = [
        "Tembo", "Creedroomz", "Vivo Gaming", "Evolution", "EZUGI", "CockFight"
    ];

    const slotGameProviders = [
        "NetEnt", "Red Tiger", "1X2 Gaming", "BB Gaming", "Booongo", "Blueprint Gaming", "Dragoon Soft", "Pocket Games",
        "Elk Studios", "Evoplay", "Fantasma Games", "Gamefish Global", "Habanero", "Hacksaw Gaming", "Iron Dog Studio",
        "Kalamba Games", "Lady Luck", "Nolimit city", "OMI Gaming", "OneTouch", "Play & GO", "PlayPearls", "Push Gaming",
        "Quickspin", "Relax Gaming", "RTG Slots", "Spearhead Studios", "Slotmill", "Splitrock Gaming", "Thunderkick", "Woohoo Games",
        "Yggdrasil", "Amatic", "Egt", "Wazdan", "Novomatic", "Pragmatic", "Virtual Games"
    ];

    const fantasyGameProviders = [
        "smart", "our", "aviator", "creedroomz", "scratch", "darwin"
    ];

    const handleProviderChange = (provider, type) => {
        let updatedProviders;
        if (formData[type].includes(provider)) {
            updatedProviders = formData[type].filter(item => item !== provider);
        } else {
            updatedProviders = [...formData[type], provider];
        }
        setFormData({ ...formData, [type]: updatedProviders });
        validateProvider(updatedProviders, type);
    };

    const validateProvider = (updatedProviders, type) => {
        let providerError = "";
        if (updatedProviders.length === 0) {
            if (type === 'sportsCasinoProviders') {
                providerError = "The Sports Casino Providers is required.";
            }
            if (type === 'liveCasinoProviders') {
                providerError = "The Live Casino Providers is required.";
            }
            if (type === 'slotGameProviders') {
                providerError = "The Slot Game Providers is required.";
            }
            if (type === 'fantasyGameProviders') {
                providerError = "The Fantasy Game Providers is required.";
            }
        }
        setErrors((prevErrors) => ({ ...prevErrors, [type]: providerError }));
    };





    const [images, setImages] = useState({ banner1: null, banner2: null, banner3: null, logo: null });

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file);
            setImages(prevState => ({ ...prevState, [name]: imageUrl }));
            setFormData({ ...formData, [name]: file });
        }
    };

    const handleDrop = (e, fieldName) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImages(prevState => ({ ...prevState, [fieldName]: imageUrl }));
            setFormData({ ...formData, [fieldName]: file });
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Required Domain <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="requiredDomain"
                    value={formData.requiredDomain}
                    onChange={(e) =>
                        setFormData({ ...formData, requiredDomain: e.target.value })
                    }
                    onBlur={() => handleBlur("requiredDomain")}
                    className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                        ${errors.requiredDomain ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                />
                {errors.requiredDomain && <p className="text-red-500 text-sm">{errors.requiredDomain}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    WhatsApp Deposit No. <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="whatsappDepositNo"
                    value={formData.whatsappDepositNo}
                    onChange={(e) =>
                        setFormData({ ...formData, whatsappDepositNo: e.target.value })
                    }
                    onBlur={() => handleBlur("whatsappDepositNo")}
                    className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                        ${errors.whatsappDepositNo ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                />
                {errors.whatsappDepositNo && <p className="text-red-500 text-sm">{errors.whatsappDepositNo}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    WhatsApp Withdrawal No. <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="whatsappWithdrawalNo"
                    value={formData.whatsappWithdrawalNo}
                    onChange={(e) =>
                        setFormData({ ...formData, whatsappWithdrawalNo: e.target.value })
                    }
                    onBlur={() => handleBlur("whatsappWithdrawalNo")}
                    className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                        ${errors.whatsappWithdrawalNo ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                />
                {errors.whatsappWithdrawalNo && <p className="text-red-500 text-sm">{errors.whatsappWithdrawalNo}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Telegram Group Id/Telegram Channel Id <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="telegramGroupId"
                    value={formData.telegramGroupId}
                    onChange={(e) =>
                        setFormData({ ...formData, telegramGroupId: e.target.value })
                    }
                    onBlur={() => handleBlur("telegramGroupId")}
                    className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                        ${errors.telegramGroupId ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                />
                {errors.telegramGroupId && <p className="text-red-500 text-sm">{errors.telegramGroupId}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Instagram Id <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="instaLink"
                    value={formData.instaLink}
                    onChange={(e) =>
                        setFormData({ ...formData, instaLink: e.target.value })
                    }
                    onBlur={() => handleBlur("instaLink")}
                    className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                        ${errors.instaLink ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                />
                {errors.instaLink && <p className="text-red-500 text-sm">{errors.instaLink}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Twitter Id <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="xLink"
                    value={formData.xLink}
                    onChange={(e) =>
                        setFormData({ ...formData, xLink: e.target.value })
                    }
                    onBlur={() => handleBlur("xLink")}
                    className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                        ${errors.xLink ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                />
                {errors.xLink && <p className="text-red-500 text-sm">{errors.xLink}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Customer No. <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    name="customerNo"
                    value={formData.customerNo}
                    onChange={(e) =>
                        setFormData({ ...formData, customerNo: e.target.value })
                    }
                    onBlur={() => handleBlur("customerNo")}
                    className={`mt-2 w-full text-sm font-thin border pl-3 rounded-sm p-[6px] shadow-sm border-gray-300 focus:outline-none focus:shadow-[0px_0px_2px_2px_rgba(0,0,0,0.5)]
                        ${errors.customerNo ? 'border-red-600 hover:border-red-600 focus:border-red-600 focus:shadow-[#ad36365d]' :
                            'border-gray-300 hover:border-[#36ad6a] focus:border-[#36ad6a] focus:shadow-[#36ad695d]'}`}
                />
                {errors.customerNo && <p className="text-red-500 text-sm">{errors.customerNo}</p>}
            </div>



            <div className="flex flex-wrap gap-6 sm:gap-32 justify-center">
                {[1, 2, 3].map((num) => (
                    <div key={num} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2">
                        <label className="block text-sm font-medium text-[#1F2225] mb-1">
                            Banner {num} <span className="text-red-600">*</span>
                        </label>
                        <div className={`mt-2 w-full h-64 border-2 border-dashed border-[#6A5F5A]    ${errors[`banner${num}`] && 'border-red-500'} rounded-md flex items-center justify-center bg-[#908d8949]`}>
                            {images[`banner${num}`] ? (
                                <img
                                    src={images[`banner${num}`]}
                                    alt={`Banner ${num} Preview`}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                                    <input
                                        type="file"
                                        name={`banner${num}`}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <p className="text-[#1F2225] text-center mt-2">Drag & Drop or Click to Upload</p>
                                </label>
                            )}
                        </div>
                        {errors[`banner${num}`] && <p className="text-red-500 text-sm">{errors[`banner${num}`]}</p>}
                    </div>
                ))}
            </div>

            <div>
                <label className="block text-sm font-medium text-[#1F2225]">
                    Logo Upload <span className="text-red-600">*</span>
                </label>
                <div
                    className={`mt-2 w-full h-40 border-2 border-dashed border-[#6A5F5A] ${errors.logo && 'border-red-500'}  rounded-md flex items-center justify-center bg-[#908d8949]`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, 'logo')}
                >
                    {images.logo ? (
                        <img
                            src={images.logo}
                            alt="Logo Preview"
                            className="w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                            <input
                                type="file"
                                name="logo"
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            <p className="text-[#1F2225] text-center mt-2">Drag & Drop or Click to Upload Logo</p>
                        </label>
                    )}
                </div>
                {errors.logo && <p className="text-red-500 text-sm">{errors.logo}</p>}
            </div>

            {/* Provides & there Category  */}
            <div>
                <div className="overflow-x-auto">
                    <div className="min-w-full">
                        <div className="bg-[#6A5F5A]">
                            <div>
                                <p className="font-normal text-sm text-white p-3 text-center">Sports Casino Providers </p>
                            </div>
                        </div>
                        <div className="border border-gray-200">
                            <div className="grid grid-cols-3 grid-rows-4 p-3 space-y-2">
                                {sportsCasinoProviders.map((provider, index) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={provider}
                                            checked={formData.sportsCasinoProviders.includes(provider)}
                                            onChange={() => handleProviderChange(provider, 'sportsCasinoProviders')}
                                            className="w-4 h-4 checked:bg-green-500"
                                        />
                                        <label className="px-2 font-thin text-[#333639] text-sm">{provider}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {errors.sportsCasinoProviders && <p className="text-red-600">{errors.sportsCasinoProviders}</p>}
                    </div>
                </div>
            </div>




            <div>
                <div className="overflow-x-auto">
                    <div className="min-w-full">
                        <div className="bg-[#6A5F5A]">
                            <div>
                                <p className="font-normal text-sm text-white p-3 text-center">Live Casino Providers </p>
                            </div>
                        </div>
                        <div className="border border-gray-200">
                            <div className="grid grid-cols-3 grid-rows-4 p-3 space-y-2 ">
                                {liveCasinoProviders.map((provider, index) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={provider}
                                            checked={formData.liveCasinoProviders.includes(provider)}
                                            onChange={() => handleProviderChange(provider, 'liveCasinoProviders')}
                                            className="w-4 h-4 checked:bg-green-500"
                                        />
                                        <label className="px-2 font-thin text-[#333639] text-sm">{provider}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {errors.liveCasinoProviders && <p className="text-red-600">{errors.liveCasinoProviders}</p>}
                    </div>
                </div>
            </div>






            <div>
                <div className="overflow-x-auto">
                    <div className="min-w-full">
                        <div className="bg-[#6A5F5A]">
                            <div>
                                <p className="font-normal text-sm text-white p-3 text-center">Slot Game Providers </p>
                            </div>
                        </div>
                        <div className="border border-gray-200">
                            <div className="grid grid-cols-3 grid-rows-4 p-3 space-y-2">
                                {slotGameProviders.map((provider, index) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={provider}
                                            checked={formData.slotGameProviders.includes(provider)}
                                            onChange={() => handleProviderChange(provider, 'slotGameProviders')}
                                            className="w-4 h-4 checked:bg-green-500"
                                        />
                                        <label className="px-2 font-thin text-[#333639] text-sm">{provider}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {errors.slotGameProviders && <p className="text-red-600">{errors.slotGameProviders}</p>}
                    </div>
                </div>
            </div>








            <div>
                <div className="overflow-x-auto">
                    <div className="min-w-full">
                        <div className="bg-[#6A5F5A]">
                            <div>
                                <p className="font-normal text-sm text-white p-3 text-center">Fantasy Game Providers</p>
                            </div>
                        </div>
                        <div className="border border-gray-200">
                            <div className="grid grid-cols-3 grid-rows-4 p-3 space-y-2">
                                {fantasyGameProviders.map((provider, index) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={provider}
                                            checked={formData.fantasyGameProviders.includes(provider)}
                                            onChange={() => handleProviderChange(provider, 'fantasyGameProviders')}
                                            className="w-4 h-4 checked:bg-green-500"
                                        />
                                        <label className="px-2 font-thin text-[#333639] text-sm">{provider}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {errors.fantasyGameProviders && <p className="text-red-600">{errors.fantasyGameProviders}</p>}
                    </div>
                </div>
            </div>




        </div>
    );
};

export default Form;