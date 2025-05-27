
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import UserMenu from "./components/AdminPanel/UserMenu";
import Dashboard from "./components/AdminPanel/Dashboard";
import AdminUserForm from "./components/AdminPanel/AdminUserForm";
import LoanSystemConfig from "./components/AdminPanel/LoanSystemConfig";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user_menu" element={<UserMenu />} />
          <Route path="/admin_user_form" element={<AdminUserForm />} />
          <Route path="/loan_system_config" element={<LoanSystemConfig />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
  );
}

export default App;
