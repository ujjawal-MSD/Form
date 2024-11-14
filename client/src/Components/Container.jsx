import { useState } from 'react';
import NewClient from './New Client/NewClient';
import ExistingClient from './Existing Client/ExistingClient';
import NewProvider from './New Provider/NewProvider';

const Container = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [activeTab, setActiveTab] = useState('newClient');

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    return (
        <div className="w-full grid grid-cols-12 gap-3 bg-[#fafafa]">
            <div className="col-span-10 ml-[calc(20%+2.4px)]">
                {/* Inner Container */}
                <div className="relative block overflow-hidden p-3">
                    <div className="m-3 overflow-auto h-full" style={{ boxShadow: "0 1.6px 3.6px 0 rgba(0,0,0,0.132),0 0.3px 0.9px 0 rgba(0,0,0,0.108)" }}>

                        {/* Header with Tabs */}
                        <header className="flex bg-[#908d89] h-[50px] justify-between items-center">
                            <div className="flex text-sm">
                                <div
                                    className={`cursor-pointer py-[14px] h-[50px] px-[29px] border-t-[3px]  ${activeTab === 'newClient' ? 'bg-white border-black  text-[#282f3a]' : 'text-white border-[#908d89]'}`}
                                    onClick={() => setActiveTab('newClient')}
                                >
                                    New Client
                                </div>
                                <div
                                    className={`cursor-pointer py-[14px] h-[50px] px-[18px] border-t-[3px]  ${activeTab === 'existingClient' ? 'bg-white border-black  text-[#282f3a]' : 'text-white border-[#908d89]'}`}
                                    onClick={() => setActiveTab('existingClient')}
                                >
                                    Existing Client
                                </div>
                                <div
                                    className={`cursor-pointer py-[14px] h-[50px] px-[22px] border-t-[3px]  ${activeTab === 'newProvider' ? 'bg-white border-black  text-[#282f3a]' : 'text-white border-[#908d89]'}`}
                                    onClick={() => setActiveTab('newProvider')}
                                >
                                    New Provider
                                </div>
                            </div>
                            <div className="flex items-center">
                                <select
                                    value={selectedLanguage}
                                    onChange={handleLanguageChange}
                                    className="border text-[#282f3a] border-gray-300 rounded-sm p-2 h-10 w-36 mr-[5px]"
                                >
                                    <option value="English">English</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="French">French</option>
                                </select>
                            </div>
                        </header>


                        {/* Content Area */}
                        <div className="px-6 pb-5 bg-white">
                            {activeTab === 'newClient' && (
                                <NewClient />
                            )}
                            {activeTab === 'existingClient' && (
                                <ExistingClient />
                            )}
                            {activeTab === 'newProvider' && (
                                <NewProvider />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Container;
