import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicationDetailsByNumber,
  getLinkedBankAccount,
  getDocumentVerification,
  getAcceptOffer,
  getReviewAgreement,
  getFunded,
  deleteLinkedBankAccount,
  deleteDocumentVerification,
  deleteAcceptOffer,
  deleteReviewAgreement,
  deleteFunded,
} from "../api_service";

const ApplicationDetailPage = () => {
  const { applicationNumber } = useParams();

  const [activeTab, setActiveTab] = useState("Application Details");
  const [details, setDetails] = useState(null);
  const [linkedBank, setLinkedBank] = useState(null);
  const [document, setDocument] = useState(null);
  const [offer, setOffer] = useState(null);
  const [review, setReview] = useState(null);
  const [funded, setFunded] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      const safeSetData = (res) => {
        if (res?.status === 200) return res.data;
        if (res?.status === 404) return null;
        if (res?.message?.toLowerCase().includes("not data found")) return null;
        return null;
      };

      const res = await getApplicationDetailsByNumber(applicationNumber);
      setDetails(safeSetData(res));

      const b = await getLinkedBankAccount(applicationNumber);
      setLinkedBank(safeSetData(b));

      const d = await getDocumentVerification(applicationNumber);
      setDocument(safeSetData(d));

      const o = await getAcceptOffer(applicationNumber);
      setOffer(safeSetData(o));

      const r = await getReviewAgreement(applicationNumber);
      setReview(safeSetData(r));

      const f = await getFunded(applicationNumber);
      setFunded(safeSetData(f));
    };
    fetchAll();
  }, [applicationNumber]);

  const handleDelete = async (fn, setFn, label) => {
    if (!window.confirm(`Delete ${label}?`)) return;
    const res = await fn(applicationNumber);
    if (res?.status === 200) {
      alert("Deleted successfully");
      setFn(null);
    } else alert("Failed to delete");
  };

const renderObject = (obj) => {
  const entries = Object.entries(obj);
  const rows = [];

  for (let i = 0; i < entries.length; i += 2) {
    const [k1, v1] = entries[i];
    const [k2, v2] = entries[i + 1] || [];

    const format = (key, value) => {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      let displayValue = "";
      if (typeof value === "boolean") displayValue = value ? "Yes" : "No";
      else if (typeof value === "object" && value !== null) displayValue = JSON.stringify(value, null, 2);
      else if (String(value).includes("T") && String(value).includes(":"))
        displayValue = new Date(value).toLocaleString();
      else displayValue = String(value ?? "-");

      return (
        <div className="flex-1 min-w-[200px]">
          <span className="block font-semibold text-gray-600 mb-1">{formattedKey}</span>
          <span className="text-gray-800 break-words">{displayValue}</span>
        </div>
      );
    };

    rows.push(
      <div
        key={i}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3"
      >
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-2xl border hover:border-primary/60 transition">
          {format(k1, v1)}
        </div>

        {k2 && (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-2xl border hover:border-primary transition">
            {format(k2, v2)}
          </div>
        )}
      </div>
    );
  }

  return <div>{rows}</div>;
};



  const tabTitleMap = {
    "Application Details": "Application Details",
    "Linked Bank": "Linked Bank Account",
    Document: "Document Verification",
    Offer: "Accept Offer",
    Review: "Review & Sign Agreement",
    Funded: "Funded Details",
  };

  const currentData = {
    "Application Details": details,
    "Linked Bank": linkedBank,
    Document: document,
    Offer: offer,
    Review: review,
    Funded: funded,
  }[activeTab];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:pr-7 py-6">
      <div className="w-full max-w-screen-xl mx-auto bg-white rounded-xl transition text-base p-4 sm:p-6">

        <h1 className="text-xl sm:text-2xl font-semibold  mb-4 sm:mb-6 text-black-200">
          {tabTitleMap[activeTab]} - {applicationNumber}
        </h1>

        <div className="flex flex-wrap gap-6 mb-2 border-b border-gray-400 text-sm sm:text-base">
          {Object.keys(tabTitleMap).map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer pb-2 ${
                activeTab === tab
                  ? "border-b-4 border-accent text-accent font-semibold"
                  : "text-gray-600 hover:text-accent-600"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="bg-accent/20 p-6 rounded-2xl ">
          {activeTab === "Application Details" && details ? (
            <>
              {renderObject(details.applicationDetails ?? {})}
              {renderObject(details.userDetails ?? {})}
            </>
          ) : activeTab === "Application Details" && !details ? (
            <p className="text-gray-500">No data found.</p>
          ) : currentData ? (
            <>
              {renderObject(Array.isArray(currentData) ? currentData[0] : currentData)}
              <button
                onClick={() => {
                  const deleteMap = {
                    "Linked Bank": [deleteLinkedBankAccount, setLinkedBank],
                    Document: [deleteDocumentVerification, setDocument],
                    Offer: [deleteAcceptOffer, setOffer],
                    Review: [deleteReviewAgreement, setReview],
                    Funded: [deleteFunded, setFunded],
                  };
                  const [fn, setFn] = deleteMap[activeTab];
                  handleDelete(fn, setFn, tabTitleMap[activeTab]);
                }}
                className="text-red-600 hover:underline mt-4"
              >
                Delete
              </button>
            </>
          ) : (
            <p className="text-gray-500">No data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
