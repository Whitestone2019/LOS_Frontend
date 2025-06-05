import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import UserMenu from "./components/AdminPanel/UserMenuForm";
import Dashboard from "./components/AdminPanel/Dashboard";
import AdminUserForm from "./components/AdminPanel/AdminUserForm";
import LoanSystemConfig from "./components/AdminPanel/LoanSystemConfig";
import UserMenuData from "./components/AdminPanel/UserMenuData";
import AdminUserPanel from "./components/AdminPanel/AdminUserData";

import Login from "./components/Login";
import MenuForm from "./components/AdminPanel/MenuForm";
import AccessControl from "./components/AdminPanel/AccessControl";
import OrganizationForm from "./components/AdminPanel/OrganizationForm";
import MultiStepForm from "./components/AdminPanel/MultiStepForm";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className=" bg-gray-100 min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user_menu" element={<UserMenu />} />
          <Route path="/admin_user_form" element={<AdminUserForm />} />
          <Route path="/loan_system_config" element={<LoanSystemConfig />} />
          <Route path="/user_menu_data" element={<UserMenuData />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin_user_data" element={<AdminUserPanel />} />
          <Route path="/menu_creation" element={<MenuForm />} />
          <Route path="/access_control" element={<AccessControl />} />
          <Route path="/login" element={<Login />} />
          <Route path="/organization_form" element={<OrganizationForm />} />
          <Route path="/application_form" element={<MultiStepForm />} />

          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
