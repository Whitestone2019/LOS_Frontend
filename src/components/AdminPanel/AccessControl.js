import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FaEdit,
  FaTrash,
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

const AccessControl = () => {
  const [menuList, setMenuList] = useState([]);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [currentUserRole, setCurrentUserRole] = useState("admin"); 
  const navigate = useNavigate();

  useEffect(() => {
    const savedMenus = JSON.parse(sessionStorage.getItem("menus")) || [];

    const buildHierarchy = (menus) => {
      const map = {};
      const roots = [];

      menus.forEach((menu) => {
        map[menu.id] = { ...menu, children: [] };
      });

      menus.forEach((menu) => {
        if (menu.parent) {
          const parent = menus.find((m) => m.name === menu.parent);
          if (parent && map[parent.id]) {
            map[parent.id].children.push(map[menu.id]);
          } else {
            roots.push(map[menu.id]);
          }
        } else {
          roots.push(map[menu.id]);
        }
      });

      return roots;
    };

    setMenuList(buildHierarchy(savedMenus));
  }, []);

  const toggleExpand = (id) => {
    setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };
const editMenu = (menu) => {
    navigate(`/menu_creation`);
  };

  const handlePermissionChange = (id, type) => {
    const updatePermissions = (item) => {
      const updated = { ...item };
      if (type === "read") {
        updated.read = !updated.read;
        if (!updated.read) {
          updated.write = false;
          updated.view = false;
          updated.all = false;
        }
      } else if (type === "write") {
        updated.write = !updated.write;
        if (updated.write) updated.read = true;
        else updated.all = false;
      } else if (type === "view") {
        updated.view = !updated.view;
        if (updated.view) updated.read = true;
        else updated.all = false;
      } else if (type === "all") {
        updated.all = !updated.all;
        updated.read = updated.all;
        updated.write = updated.all;
        updated.view = updated.all;
      }
      return updated;
    };

    const updateMenuList = (menus) => {
      return menus.map((menu) => {
        if (menu.id === id) return updatePermissions(menu);
        if (menu.children) {
          return { ...menu, children: updateMenuList(menu.children) };
        }
        return menu;
      });
    };

    const updatedMenus = updateMenuList(menuList);
    setMenuList(updatedMenus);
  };

  const handleSavePermissions = () => {
    const flattenMenus = (menus) => {
      let flat = [];
      menus.forEach((menu) => {
        const { children, ...rest } = menu;
        flat.push(rest);
        if (children && children.length > 0) {
          flat = flat.concat(flattenMenus(children));
        }
      });
      return flat;
    };

    const flatMenus = flattenMenus(menuList);
    sessionStorage.setItem("menus", JSON.stringify(flatMenus));
    alert("Permissions saved!");
  };

 
  const filterMenusByRole = (menus) => {
    return menus.map((menu) => ({
      ...menu,
      children: menu.children ? filterMenusByRole(menu.children) : [],
    }));
  };

  const filteredMenus = filterMenusByRole(menuList);

  const renderMenuRow = (menu, level = 0, isChild = false) => {
    const hasChildren = menu.children && menu.children.length > 0;
    const isExpanded = expandedMenus[menu.id];

    const iconKey = menu.iconKey?.toLowerCase?.();
    const IconComponent = iconMap[iconKey];

    return (


      
      <React.Fragment key={menu.id}>
        <tr
          className={`border-t text-center hover:bg-gray-50 ${
            level === 0 ? "bg-gray-100 font-semibold" : ""
          }`}
        >
          <td className="p-3 text-left">
            <div
              className="flex items-center cursor-pointer select-none"
              style={{ paddingLeft: `${level * 1.5}rem` }}
              onClick={() => hasChildren && toggleExpand(menu.id)}
            >
              {hasChildren ? (
                <span className="mr-2 text-accent">{isExpanded ? "▼" : "▶"}</span>
              ) : (
                <span className="inline-block w-4 mr-2" />
              )}

              {isChild && (
                <span className="text-gray-400 mr-1 select-none">└──</span>
              )}

              {IconComponent ? (
                <IconComponent className="text-secondary bg-white rounded-full p-1 text-2xl mr-2 shadow-sm" />
              ) : (
                <span className="text-xl mr-2">{isChild ? "📄" : "📁"}</span>
              )}

              <Link
                to={`/menu/${menu.id}`}
                className="hover:underline text-gray-800"
              >
                {menu.name}
              </Link>

            </div>
          </td>

          {["read", "write", "view", "all"].map((perm) => (
            <td key={perm}>
              <input
                type="checkbox"
                checked={menu[perm]}
                onChange={() => handlePermissionChange(menu.id, perm)}
                className="scale-125 accent-accent"
              />
            </td>
          ))}

          <td className="flex justify-center gap-2 py-2">
            <button
              onClick={() => editMenu(menu)}
              className="text-blue-500 hover:underline text-sm"
            >
              
                <FaEdit />
            </button>
            <button
              // onClick=}
              className="text-red-500 hover:underline text-sm"
            >
              <FaTrash />
            </button>
          </td>
        </tr>


        {hasChildren &&
          isExpanded &&
          menu.children.map((child) => renderMenuRow(child, level + 1, true))}
      </React.Fragment>
    );
  };

  return (

    <div className="lg:flex md:block font-inter">
      <div className="h-screen hidden lg:block fixed z-20">
        <DashboardSidebar />
      </div>
      <main className="flex-1 lg:ml-72">
        <DashboardHead />

    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-2xl shadow-lg max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-accent mb-6">
           Manage Menu Permissions
        </h2>

      
        <div className="mb-6 flex items-center gap-4">
          <label
            htmlFor="roleSelect"
            className="font-semibold text-gray-700"
          >
             Role Access:
          </label>
          <select
            id="roleSelect"
            value={currentUserRole}
            onChange={(e) => setCurrentUserRole(e.target.value)}
            className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Menu Name</th>
              <th className="p-3 text-center">Read</th>
              <th className="p-3 text-center">Write</th>
              <th className="p-3 text-center">View</th>
              <th className="p-3 text-center">All</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenus.length > 0 ? (
              filteredMenus.map((menu) => renderMenuRow(menu))
            ) : (
              <tr>
                <td colSpan={5} className="p-5 text-center text-gray-500">
                  No menus found. Please add menus from the form.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => navigate("/menu_creation")}
            className="bg-accent text-white px-5 py-2 rounded-xl hover:bg-secondary"
          >
            Add Menu
          </button>
          <button
            onClick={handleSavePermissions}
            className="bg-accent text-white px-5 py-2 rounded-xl hover:bg-secondary"
          >
            Save Permissions
          </button>
        </div>
      </div>
    </div>
    </main>
    </div>
  );
};

export default AccessControl;
