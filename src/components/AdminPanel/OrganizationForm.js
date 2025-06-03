import React, { useState } from "react";


import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";

const OrganizationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    logo: null,
    logoPreview: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        logo: file,
        logoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can handle form submission logic here (e.g., send to API)
    console.log("Form submitted:", formData);

    alert("Organization details submitted successfully!");
  };

  return (


     <div className="lg:flex md:block font-inter">
      <div className="h-screen hidden lg:block fixed z-20">
        <DashboardSidebar />
      </div>
      <main className="flex-1 lg:ml-72">
        <DashboardHead />

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-xl w-full">
        <h2 className="text-2xl font-semibold mb-6 text-accent">🏢 Organization Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Organization Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Infinity Corp"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block mb-1 font-medium text-gray-700">Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Street, City, ZIP"
              className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent"
              rows="3"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label htmlFor="logo" className="block mb-1 font-medium text-gray-700">Upload Logo:</label>
            <input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-600"
            />
          </div>

          {/* Logo Preview */}
          {formData.logoPreview && (
            <div className="mt-4">
              <p className="text-gray-600 mb-1">Logo Preview:</p>
              <img src={formData.logoPreview} alt="Logo Preview" className="h-24 rounded border" />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-secondary transition"
          >
            ✅ Save Organization
          </button>
        </form>
      </div>
    </div>
        </main> 
        </div>
  );
};

export default OrganizationForm;
