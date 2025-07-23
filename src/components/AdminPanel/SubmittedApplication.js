import React, { useEffect, useState } from "react";
import {
  getAllApplicationDetails,
  deleteApplicationByNumber,
  saveColumnPreferencesAPI,
  fetchColumnPreferencesAPI,
} from "../api_service";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaTrashAlt,FaChevronLeft, FaChevronRight } from "react-icons/fa";

const allColumns = [
  { key: "applicationId", label: "Application ID" },
  { key: "city", label: "City" },
  { key: "confirmSsn", label: "Confirm SSN" },
  { key: "createdBy", label: "Created By" },
  { key: "createdDate", label: "Created Date" },
  { key: "dateOfBirth", label: "Date of Birth" },
  { key: "homeAddress", label: "Home Address" },
  { key: "homeAddress2", label: "Home Address 2" },
  { key: "howMuchDoYouNeed", label: "Loan Amount" },
  { key: "isHomeOwner", label: "Is Home Owner" },
  { key: "loanType", label: "Loan Type" },
  { key: "monthlyGrossIncome", label: "Monthly Gross Income" },
  { key: "ssn", label: "SSN" },
  { key: "state", label: "State" },
  { key: "updatedBy", label: "Updated By" },
  { key: "updatedDate", label: "Updated Date" },
  { key: "zipCode", label: "Zip Code" },
  { key: "email", label: "Email" },
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "phone", label: "Phone" },
  { key: "action", label: "Action" },
];

const SubmittedApplication = () => {
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [selected, setSelected] = useState({});
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    filterType: "",
    loanAmount: "",
    loanType: "",
    name: "",
    fromDate: "",
    toDate: "",
  });
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const toggleColumn = (key) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredApplications = applications.filter((app) => {
    const d = app.applicationDetails || {};
    const u = app.userDetails || {};
    const l = app.loanTypeWorkflow || {};
    const createdDate = new Date(d.createdDate || "");
    const fullName = `${u.firstName || ""} ${u.lastName || ""}`.toLowerCase();

    switch (filters.filterType) {
      case "loanAmount":
        return d.howMuchDoYouNeed?.toString().includes(filters.loanAmount);
      case "loanType":
        return l.loanType?.toLowerCase().includes(filters.loanType.toLowerCase());
      case "name":
        return fullName.includes(filters.name.toLowerCase());
      case "date":
        const from = filters.fromDate ? new Date(filters.fromDate) : null;
        const to = filters.toDate ? new Date(filters.toDate) : null;
        return (!from || createdDate >= from) && (!to || createdDate <= to);
      default:
        return true;
    }
  });

  const totalPages = Math.ceil(filteredApplications.length / rowsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await getAllApplicationDetails();
      console.log("Fetched Application:",res);
      setApplications(res?.data || []);
    } catch (err) {
      console.error("Failed to fetch applications", err);
    }
  };

  const storePreferences = async () => {
    const payload = allColumns.map(({ key, label }) => ({
      columnName: label,
      visible: !!selected[key],
    }));
    try {
      await saveColumnPreferencesAPI(payload);
    } catch (e) {
      console.error("Error saving preferences", e);
    }
  };

  const loadPreferences = async () => {
    try {
      const res = await fetchColumnPreferencesAPI();
      if (res.status === 200 && Array.isArray(res.data)) {
        const mapped = {};
        allColumns.forEach((col) => {
          const match = res.data.find((item) => item.columnName === col.label);
          mapped[col.key] = match ? match.visible : false;
        });
        setSelected(mapped);
      }
    } catch (error) {
      console.error("❌ Error loading column preferences:", error);
    }
  };

  const handleContinue = async () => {
    await storePreferences();
    await fetchApplications();
    setStep(2);
  };

  const handleDelete = async (appNumber) => {
    if (!window.confirm(`Delete application ${appNumber}?`)) return;
    try {
      const res = await deleteApplicationByNumber(appNumber);
      if (res.status === 200) fetchApplications();
      else alert("Failed to delete");
    } catch {
      alert("Error deleting");
    }
  };

  useEffect(() => {
    const role = (sessionStorage.getItem("role") || "").toLowerCase();
    setUserRole(role);

    const init = async () => {
      const defaultSelected = {};
      allColumns.forEach((col) => {
        defaultSelected[col.key] = false;
      });
      setSelected(defaultSelected);

      await loadPreferences();

      if (role === "approver") {
        await fetchApplications();
        setStep(2);
      }

      setLoading(false);
    };

    init();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // reset page when filters change
  }, [filters]);

  if (loading) return <div className="p-6">Loading...</div>;

  const hasVisibleColumns = Object.values(selected).some((val) => val === true);

  return (
    <div className="min-h-screen bg-gray-100 pt-6 pr-8">
      <div className="max-w-8xl mx-auto bg-white shadow px-4 py-6 rounded-xl">
        {step === 1 && userRole === "admin" ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-accent">Select Columns to Display</h2>
           <div className="max-h-[450px] overflow-y-auto custom-scrollbar border rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-3 font-medium">Label</th>
                  <th className="p-3 font-medium text-center">Show</th>
                </tr>
              </thead>
              <tbody>
                {allColumns.map((col) => (
                  <tr key={col.key}>
                    <td className="p-3">{col.label}</td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={!!selected[col.key]}
                        onChange={() => toggleColumn(col.key)}
                        className="accent-primary w-4 h-4 text-white"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <button
              onClick={handleContinue}
              className="mt-4 px-6 py-2 rounded bg-accent text-white hover:bg-secondary"
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-accent">Submitted Applications</h2>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="px-4 py-2 rounded bg-accent text-white hover:bg-secondary"
              >
                {showFilter ? "Hide Filter" : "Show Filter"}
              </button>
            </div>

            {showFilter && (
              <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  name="filterType"
                  value={filters.filterType}
                  onChange={handleFilterChange}
                  className="p-2 border rounded"
                >
                  <option value="">Select Filter</option>
                  <option value="loanAmount">Loan Amount</option>
                  <option value="loanType">Loan Type</option>
                  <option value="name">Name</option>
                  <option value="date">Date</option>
                </select>

                {filters.filterType === "loanAmount" && (
                  <input
                    type="text"
                    name="loanAmount"
                    value={filters.loanAmount}
                    onChange={handleFilterChange}
                    placeholder="Enter loan amount"
                    className="p-2 border rounded"
                  />
                )}
                {filters.filterType === "loanType" && (
                  <input
                    type="text"
                    name="loanType"
                    value={filters.loanType}
                    onChange={handleFilterChange}
                    placeholder="Enter loan type"
                    className="p-2 border rounded"
                  />
                )}
                {filters.filterType === "name" && (
                  <input
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    placeholder="Enter name"
                    className="p-2 border rounded"
                  />
                )}
                {filters.filterType === "date" && (
                  <div className="flex gap-2 col-span-2">
                    <input
                      type="date"
                      name="fromDate"
                      value={filters.fromDate}
                      onChange={handleFilterChange}
                      className="p-2 border rounded w-1/2"
                    />
                    <input
                      type="date"
                      name="toDate"
                      value={filters.toDate}
                      onChange={handleFilterChange}
                      className="p-2 border rounded w-1/2"
                    />
                  </div>
                )}
              </div>
            )}

            {!hasVisibleColumns ? (
              <p className="text-gray-500">No visible columns selected by admin.</p>
            ) : (
             <div className="max-h-[500px] overflow-auto border rounded-lg">
  <table className="min-w-full text-sm text-left">

                  <thead className="bg-gray-100">
                    <tr>
                      {Object.entries(selected).map(
                        ([k, v]) =>
                          v && (
                            <th key={k} className="p-3 font-medium">
                              {allColumns.find((col) => col.key === k)?.label}
                            </th>
                          )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedApplications.map((app, i) => {
                      const d = app.applicationDetails || {};
                      const u = app.userDetails || {};
                      const l = app.loanTypeWorkflow || {};
                      const appNum = l?.applicationNumber;

                      return (
                        <tr key={i} className="hover:bg-blue-50">
                          {Object.entries(selected).map(([k, v]) => {
                            if (!v) return null;

                            if (k === "action") {
                              return (
                                <td key="action" className="p-3 flex items-center space-x-3">
                                  <button className="text-green-600 hover:text-green-800" title="Approve">
                                    <FaCheckCircle size={18} />
                                  </button>
                                  <button className="text-red-600 hover:text-red-800" title="Reject">
                                    <FaTimesCircle size={18} />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDelete(appNum);
                                    }}
                                    className="text-gray-500 hover:text-red-600"
                                    title="Delete"
                                  >
                                    <FaTrashAlt size={18} />
                                  </button>
                                </td>
                              );
                            }

                            const val = d[k] ?? u[k] ?? l[k] ?? "-";
                            return (
                              <td
                                key={k}
                                className="p-3 cursor-pointer"
                                onClick={() => navigate(`/application-details/${appNum}`)}
                              >
                                {String(val)}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
               </div>
            )}

          <div className="mt-4 flex justify-center items-center gap-4">
  <button
    onClick={() => goToPage(currentPage - 1)}
    disabled={currentPage === 1}
    className={`p-1.5 rounded-full transition-colors duration-200 ${
      currentPage === 1
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-gray-100 border border-gray-300 hover:bg-sky-100 text-gray-700"
    }`}
    title="Previous Page"
  >
    <FaChevronLeft size={14} />
  </button>

  <span className="text-sm font-medium text-gray-700">
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => goToPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`p-1.5 rounded-full transition-colors duration-200 ${
      currentPage === totalPages
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-gray-100 border border-gray-300 hover:bg-sky-100 text-gray-700"
    }`}
    title="Next Page"
  >
    <FaChevronRight size={14} />
  </button>
         </div>  
          </>
        )}
      </div>
    </div>
  );
};

export default SubmittedApplication;
