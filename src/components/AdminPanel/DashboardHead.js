import React, { useState, useRef } from 'react';
import { IoSearch, IoLogOutOutline, IoNotificationsOutline, IoChevronDownSharp } from "react-icons/io5";
import { TiThMenu, TiArrowBack } from "react-icons/ti";
import DashboardSidebar from './DashboardSidebar';

const DashboardHead = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    return (
        <div>
            {/* Sidebar for Mobile */}
            <div
                ref={sidebarRef}
                className={`bg-white lg:hidden h-screen bg-transparent fixed z-10 transition-transform duration-300 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <DashboardSidebar />
                <TiArrowBack
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden absolute top-6 right-6 text-4xl text-accent hover:text-gray-800"
                />
            </div>

            {/* Header */}
            <div className="w-full h-14 bg-none px-4 flex items-center justify-between">
                {/* Mobile Sidebar Toggle */}
                <div className="lg:hidden">
                    <TiThMenu
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-2xl cursor-pointer"
                    />
                </div>

                {/* Search Bar */}
                <div className="flex-1 mx-4">
                    <div className="flex items-center bg-white rounded-lg px-3 py-1 w-full max-w-md border border-gray-500 hover:border-black">
                        <IoSearch className="text-gray-400 mr-3 size-7" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none w-full text-gray-800 text-sm sm:text-base"
                        />
                    </div>
                </div>

                {/* Icons and Profile */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <button>
                        <IoNotificationsOutline className="text-gray-800 text-xl sm:text-2xl hover:text-violet-800" />
                    </button>

                    <button>
                        <IoLogOutOutline className="text-gray-800 text-xl hidden lg:block hover:text-violet-800" />
                    </button>

                    <div className="flex items-center gap-2">
                        <img
                            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg"
                            alt="Profile"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300"
                        />
                        <span className="text-sm hidden lg:block text-gray-800 font-medium hover:text-violet-800">
                            Shariq
                        </span>
                        <IoChevronDownSharp className="text-gray-800" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHead;
