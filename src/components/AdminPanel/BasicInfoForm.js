import React, { useState } from "react";
import smartphone from "../../Image/smartphone.png"; 



const BasicInfoForm = ({ form, handleChange, progress, onContinue }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit phone number.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.confirmEmail.trim()) {
      newErrors.confirmEmail = "Please confirm your email.";
    } else if (form.confirmEmail !== form.email) {
      newErrors.confirmEmail = "Emails do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onContinue(); 
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">In Progress Basic Info</h2>

   
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm font-medium text-[#30c9d6]">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
        <div
          className="h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: "#30c9d6" }}
        ></div>
      </div>

     
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        <div className="flex-1 flex flex-col">
          <label htmlFor="firstName" className="mb-1 font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-[#30c9d6] py-2"
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>
        <div className="flex-1 flex flex-col">
          <label htmlFor="lastName" className="mb-1 font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-[#30c9d6] py-2"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>

    
      <div className="mb-6 w-full flex flex-col">
        <label htmlFor="mobile" className="mb-1 font-medium text-gray-700">Mobile Phone</label>
        <input
          type="text"
          id="mobile"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          className="border-b border-gray-400 focus:outline-none focus:border-[#30c9d6] py-2"
          style={{ maxWidth: "280px" }}
        />
        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        <div className="flex-1 flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium text-gray-700">Email (Personal)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-[#30c9d6] py-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="flex-1 flex flex-col">
          <label htmlFor="confirmEmail" className="mb-1 font-medium text-gray-700">Confirm Email</label>
          <input
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            value={form.confirmEmail}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-[#30c9d6] py-2"
          />
          {errors.confirmEmail && <p className="text-red-500 text-sm">{errors.confirmEmail}</p>}
        </div>
      </div>

     
      <div className="flex items-start gap-3 mb-6">
        <img
          src={smartphone}
          alt="Smartphone"
          className="w-6 h-6 mt-1 flex-shrink-0"
        />
        <p className="text-sm text-gray-700">
          By choosing to proceed, I agree to the electronic Communication and
          E-Sign Agreement, as well as to receive communications by phone or
          Email from NewCo.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition flex items-center gap-2"
        >
          Continue
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

   
      <div className="mt-6 text-center text-sm">
        <span style={{ color: "black" }}>
          NewCo Financial's{" "}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#005f99]"
          >
            Terms and Authorization
          </a>
        </span>
        <span style={{ color: "black", margin: "0 6px" }}>and</span>
        <a
          href="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[#005f99]"
        >
          Privacy Policy and Notices
        </a>
      </div>
    </div>
  );
};

export default BasicInfoForm;
