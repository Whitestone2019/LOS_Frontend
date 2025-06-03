import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AiFillHome,
} from "react-icons/ai";
import {
  PiCalendarStarBold,
  PiFolders,
} from "react-icons/pi";
import {
  MdOutlineAnalytics,
} from "react-icons/md";
import {
  HiOutlineNewspaper,
} from "react-icons/hi2";
import {
  IoBagRemoveOutline,
  IoSearch,
} from "react-icons/io5";

const SidebarItem = ({ icon: Icon, label, path }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // const isActive = location.pathname === path;
  
  const isActive = path.includes(location.pathname);


  return (
    <li
      className={`flex items-center gap-3 px-6 py-3 rounded-l-full cursor-pointer transition-colors duration-200 ${
        isActive
          ? "bg-gray-100 text-accent font-semibold shadow"
          : "text-gray-600 hover:bg-blue-50 hover:text-accent"
      }`}
      onClick={() => navigate(path[0])}
    >
      <Icon className="text-lg" />
      <span>{label}</span>
    </li>
  );
};

const DashboardSidebar = () => {
  return (
    <aside className="w-72 bg-white h-screen flex flex-col rounded-xl">
      <div className="px-4 py-6 ">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-200" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">File MG</h2>
            <p className="text-sm text-gray-500">Ryan Aldridge</p>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="flex items-center px-4 py-2 border border-gray-300 bg-gray-100 rounded-md mb-4">
          <IoSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none placeholder-gray-500 text-sm"
          />
        </div>
      </div>

      <div className="text-xs font-bold text-gray-400 px-4 uppercase mb-3">Menu</div>
      <ul className="space-y-1 pl-5">
        <SidebarItem icon={AiFillHome} label="Dashboard" path={["/dashboard"]} />
        <SidebarItem icon={PiCalendarStarBold} label="User Menu" path={["/user_menu_data"]} />
        <SidebarItem icon={MdOutlineAnalytics} label="Role Creation" path={["/admin_user_data"]} />
        <SidebarItem icon={HiOutlineNewspaper} label="System Configuration" path={["/loan_system_config"]} />
        <SidebarItem icon={IoBagRemoveOutline} label="Login" path={["/login"]} />
        <SidebarItem icon={PiFolders} label="Menu Creation" path={["/menu_creation", "/access_control"]} />
        <SidebarItem icon={IoSearch} label="Organization Form" path={["/organization_form"]} />


      </ul>
    </aside>
  );
};

export default DashboardSidebar;
