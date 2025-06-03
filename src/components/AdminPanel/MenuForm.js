import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPhone,
  FaCog,
  FaChartLine,
  FaUsers,
  FaQuestionCircle,
  FaUserCircle,
  FaInfoCircle,
  FaBell,
} from "react-icons/fa";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";


const iconMap = {
  dashboard: FaTachometerAlt,
  "contact us": FaPhone,
  settings: FaCog,
  reports: FaChartLine,
  users: FaUsers,
  help: FaQuestionCircle,
  profile: FaUserCircle,
  about: FaInfoCircle,
  notifications: FaBell,
};

const MenuForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    parent: "None",
    icon: "",
  });

  const [menuList, setMenuList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedMenus = JSON.parse(sessionStorage.getItem("menus")) || [];
    setMenuList(savedMenus);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const selectedIcon = formData.icon.trim();

    if (trimmedName === "") {
      alert("Please enter a menu name.");
      return;
    }

    if (trimmedName === formData.parent) {
      alert("A menu cannot be its own parent.");
      return;
    }

    const key = trimmedName.toLowerCase();
    const iconKey = selectedIcon || (iconMap[key] ? key : null);

    const newMenu = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      name: trimmedName,
      parent: formData.parent === "None" ? null : formData.parent,
      role: "admin",  
      write: false,
      view: false,
      all: false,
      iconKey,
    };

    const updatedMenus = [...menuList, newMenu];
    setMenuList(updatedMenus);
    sessionStorage.setItem("menus", JSON.stringify(updatedMenus));

    setFormData({
      name: "",
      parent: "None",
      icon: "",
    });

    alert("Menu added!");
  };

  const parentMenuOptions = [
    "None",
    ...menuList.map((menu) => menu.name).filter((name) => name !== formData.name),
  ];

  return (



    <div className="lg:flex md:block font-inter">
      <div className="h-screen hidden lg:block fixed z-20">
        <DashboardSidebar />
      </div>
      <main className="flex-1 lg:ml-72">
        <DashboardHead />

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-3xl shadow-lg max-w-2xl w-full p-8">
        <h2 className="text-2xl font-bold mb-6 text-accent flex items-center gap-2">
          📝 Add Menu
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 items-center mb-6 flex-col flex-1">
           
            <div className="w-full">
              <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                Menu Name:
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter menu name"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

           
            <div className="w-full">
              <label htmlFor="parent" className="block mb-1 font-medium text-gray-700">
                Parent Menu:
              </label>
              <select
                id="parent"
                name="parent"
                value={formData.parent}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
              >
                {parentMenuOptions.map((menu) => (
                  <option key={menu} value={menu}>
                    {menu}
                  </option>
                ))}
              </select>
            </div>

            {/* Icon Dropdown */}
            <div className="w-full">
              <label htmlFor="icon" className="block mb-1 font-medium text-gray-700">
                Select Icon:
              </label>
              <select
                id="icon"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">-- Auto-select based on name --</option>
                {Object.entries(iconMap).map(([key]) => (
                  <option key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

         
          {formData.icon && iconMap[formData.icon] && (
            <div className="flex items-center gap-2 mb-4 text-lg text-gray-700">
              Selected Icon: {React.createElement(iconMap[formData.icon])}
            </div>
          )}

         
          <div className="flex flex-row gap-4">
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 rounded-xl hover:bg-secondary transition"
            >
              ➕ Add Menu
            </button>

            <button
              type="button"
              onClick={() => navigate("/access_control")}
              className="w-full bg-accent text-white py-2 rounded-xl hover:bg-secondary transition"
            >
              View Menu
            </button>
          </div>
        </form>
      </div>
    </div>

    </main>
  </div>
  );
};

export default MenuForm;
