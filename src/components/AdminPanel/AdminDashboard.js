import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApplicationCount } from "../api_service";

const AdminDashboard = ({ canRead = false, canWrite = false }) => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [applications, setApplications] = useState([]);

  const getApplications = () => {
    const sessionUserList = JSON.parse(sessionStorage.getItem("userList")) || [];
    return sessionUserList.map((id, index) => ({
      id: id,
      name: `User ${index}`,
      status: "Application Submitted"
    }));
  };

  useEffect(() => {
    setApplications(getApplications());

    const fetchData = async () => {
      try {
        const response = await getApplicationCount();
        setCount(response.data);
      } catch (err) {
        console.error("Failed to fetch application count", err);
        setCount(0);
      }
    };
    fetchData();
  }, []);

  const handleStatusClick = (status) => {
    if (!canWrite) return;
    if (status === "Application Submitted") {
      navigate("/submitted_application");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:pr-8 py-6">
      <div className="w-full max-w-screen-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Loan Application</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card title="Open Tasks" icon="📝" value="0" color="blue" />
          <Card title="Open Applications" icon="📂" value="0" color="green" />
          <Card title="Apps expiring in 24 hrs" icon="⏰" value="0" color="red" />
          <Card title="Apps Submitted in last 24 hrs" icon="✅" value="0" color="gray" />
        </div>

        {/* Status Section */}
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-200">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">
            Loan Application Status
          </h2>
          {[
            ["Application Submitted", "Lead", "Verifications"],
            ["Pending Approval", "Offer Generated", "Agreement Docs Out"],
            ["Pre Funding Review", "Funding Approved", "Funded"],
            ["Declined", "Unwind", "Not interested"],
            ["Expired"]
          ].map((row, i) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4" key={i}>
              {row.map((status) => (
                <StatusBox
                  key={status}
                  label={status}
                  value={status === "Application Submitted" ? count : 0}
                  onClick={handleStatusClick}
                  disabled={!canWrite}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Card Component
const Card = ({ title, icon, value, color }) => (
  <div className="bg-white rounded-lg shadow p-4 border border-gray-200 flex items-center gap-4">
    <div className="text-3xl">{icon}</div>
    <div>
      <div className="text-sm font-semibold text-gray-700">{title}</div>
      <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
    </div>
  </div>
);

// Status Box Component
const StatusBox = ({ label, value, onClick, disabled }) => (
  <div
    onClick={!disabled ? () => onClick(label) : undefined}
    className={`bg-white rounded-lg p-4 border border-primary/50 ${
      !disabled ? "cursor-pointer hover:shadow-md" : "cursor-not-allowed opacity-60"
    } transition`}
  >
    <div className="flex justify-between items-center text-base font-medium text-gray-700">
      <span className="truncate">{label}</span>
      <div className="ml-2 px-3 py-1 bg-primary/20 text-accent text-base font-bold rounded-md">
        {value}
      </div>
    </div>
  </div>
);

export default AdminDashboard;
