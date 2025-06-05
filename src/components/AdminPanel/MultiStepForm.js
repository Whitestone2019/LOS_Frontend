import React, { useState } from "react";
import { UserCircle, FileText } from "lucide-react";
import BasicInfoForm from "./BasicInfoForm";
import ApplicationDetailForm from "./ApplicationDetailForm";


import DashboardHead from "./DashboardHead";
import DashboardSidebar from "./DashboardSidebar";



const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    confirmEmail: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filledFields = Object.values(form).filter((val) => val.trim() !== '').length;
  const progress = (filledFields / 5) * 100;

  const handleTabClick = (tab) => {
    setStep(tab);
  };

  return (
      <div className="lg:flex md:block font-inter">
        <div className="h-screen hidden lg:block fixed z-20">
          <DashboardSidebar />
        </div>
        <main className="flex-1 lg:ml-72">
          <DashboardHead />

        <div className="bg-white rounded-lg shadow-lg p-6 my-10 mx-6">

          <div className="flex justify-start gap-8 mb-6 border-b border-gray-300">
            <button
              onClick={() => handleTabClick(1)}
              className={`relative pb-2 font-semibold text-lg flex items-center gap-2 ${
                step === 1
                  ? "text-[#30c9d6] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-[#30c9d6]"
                  : "text-gray-600 hover:text-[#30c9d6]"
              }`}
            >
              <UserCircle className="w-5 h-5" />
              Basic Detail
            </button>

            <button
              onClick={() => handleTabClick(2)}
              className={`relative pb-2 font-semibold text-lg flex items-center gap-2 ${
                step === 2
                  ? "text-[#30c9d6] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-[#30c9d6]"
                  : "text-gray-600 hover:text-[#30c9d6]"
              }`}
            >
              <FileText className="w-5 h-5" />
              Application Detail
            </button>
          </div>

        
          <div className="w-full">
            {step === 1 ? (
              <BasicInfoForm
                form={form}
                handleChange={handleChange}
                progress={progress}
                onContinue={() => setStep(2)}
              />
            ) : (
              <ApplicationDetailForm onBack={() => setStep(1)} />
            )}
          </div>
        </div>
        </main>
      </div>
     
  );
};

export default MultiStepForm;
