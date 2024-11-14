// src/Components/Header.jsx
import React, { useState, useEffect } from 'react';

const Header = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const year = now.getUTCFullYear();
            const month = String(now.getUTCMonth() + 1).padStart(2, '0');
            const day = String(now.getUTCDate()).padStart(2, '0');
            const hours = String(now.getUTCHours()).padStart(2, '0');
            const minutes = String(now.getUTCMinutes()).padStart(2, '0');
            const formattedTime = `${year}-${month}-${day} ${hours}:${minutes} (UTC +0)`;
            setCurrentTime(formattedTime);
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="flex justify-between items-center bg-[#6A5F5A] text-white h-[60px] px-4 md:px-6 lg:px-8">
            {/* Logo Section */}
            <div className="text-lg font-bold flex items-center">
                <a href="#">
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAAA8CAMAAADBl9HuAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAApFQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////RBILvQAAANt0Uk5TAAMJCAFB2crLyKRfISJiqNcYLkNJmgsNFjOEyacvMap/MMYbEd/mHZYETH4HCobFSMQGtv8lNTw9EA4UEp2copMVjjh8t+H8RTtSiX36+2ZEsfmfb4Gg6e02Bdrcw1Qaisfd4szTAh54Z/hYcJiZMs/Aaf5Q9bpaS4AZ23N6OsFA9LmeV/J5DOfqqVHk5RMP1etg7Lw0virxq/1r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"
                        alt="Logo"
                        className=" h-auto w-auto"
                    />
                </a>
            </div>

            {/* Time Display Section */}
            <div className="text-xs md:text-sm font-normal">
                <div className="p-[6px] text-[#ffffffd1]">{currentTime}</div>
            </div>
        </header>
    );
};

export default Header;
