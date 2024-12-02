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
					<img src="/images/logo.png" alt="Logo" className=" h-auto w-auto" />
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
