import React, { useState } from 'react';
import { FaCog, FaTrash, FaPlus, FaSave } from 'react-icons/fa';

import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";



const LoanSystemConfig = () => {
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [defaultRate, setDefaultRate] = useState('');
  const [minCreditScore, setMinCreditScore] = useState('');
  const [documentTypes, setDocumentTypes] = useState([]);
  const [newDocument, setNewDocument] = useState('');
  const [loanTerms, setLoanTerms] = useState([]);
  const [newLoanTerm, setNewLoanTerm] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (minRate === '' || isNaN(minRate) || Number(minRate) < 0) {
      newErrors.minRate = 'Minimum Rate must be a non-negative number';
    }
    if (maxRate === '' || isNaN(maxRate) || Number(maxRate) <= 0) {
      newErrors.maxRate = 'Maximum Rate must be a positive number';
    }
    if (defaultRate === '' || isNaN(defaultRate) || Number(defaultRate) < 0) {
      newErrors.defaultRate = 'Default Rate must be a non-negative number';
    }
    if (
      !newErrors.minRate &&
      !newErrors.maxRate &&
      !newErrors.defaultRate &&
      (Number(minRate) > Number(defaultRate) || Number(defaultRate) > Number(maxRate))
    ) {
      newErrors.defaultRate = 'Default Rate must be between Minimum and Maximum Rate';
    }

    if (minCreditScore === '' || isNaN(minCreditScore) || Number(minCreditScore) < 0) {
      newErrors.minCreditScore = 'Minimum Credit Score must be a non-negative number';
    }

    if (newLoanTerm !== '') {
      if (isNaN(newLoanTerm) || Number(newLoanTerm) <= 0) {
        newErrors.newLoanTerm = 'Loan term must be a positive number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddDocument = () => {
    if (newDocument.trim() !== '') {
      setDocumentTypes([...documentTypes, newDocument.trim()]);
      setNewDocument('');
      setErrors((prev) => ({ ...prev, newDocument: undefined }));
    }
  };

  const handleRemoveDocument = (index) => {
    const updated = [...documentTypes];
    updated.splice(index, 1);
    setDocumentTypes(updated);
  };

  const handleAddLoanTerm = () => {
    const trimmedTerm = newLoanTerm.trim();
    if (trimmedTerm !== '' && !isNaN(trimmedTerm) && Number(trimmedTerm) > 0) {
      setLoanTerms([...loanTerms, trimmedTerm]);
      setNewLoanTerm('');
      setErrors((prev) => ({ ...prev, newLoanTerm: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, newLoanTerm: 'Loan term must be a positive number' }));
    }
  };

  const handleRemoveLoanTerm = (index) => {
    const updated = [...loanTerms];
    updated.splice(index, 1);
    setLoanTerms(updated);
  };

  const handleSave = () => {
    if (validate()) {
      const config = {
        minRate,
        maxRate,
        defaultRate,
        minCreditScore,
        documentTypes,
        loanTerms,
      };
      console.log('Configuration Saved:', config);
      alert('Configuration saved!');
    } else {
      alert('Please fix the errors in the form before saving.');
    }
  };

  return (

    <div className="lg:flex md:block font-inter">
  <div className="h-screen hidden lg:block fixed z-20">
    <DashboardSidebar />
  </div>
    <main className="flex-1 lg:ml-72">
      <DashboardHead />


    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-start">
      <h1 className="text-3xl font-bold text-black-600 mb-6">
        System Configuration
      </h1>

      <div className="w-full max-w-[90%] bg-white shadow rounded-lg p-6 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <FaCog className="text-2xl text-gray-700" />
          <h2 className="text-2xl font-semibold text-black-600">System Configuration</h2>
        </div>

        {/* Interest Rates */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Interest Rates</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rate</label>
              <input
                type="number"
                className={`border p-2 rounded-xl w-full bg-white bg-opacity-80 ${errors.minRate ? 'border-red-500' : ''}`}
                value={minRate}
                onChange={(e) => setMinRate(e.target.value)}
                onBlur={validate}
                min="0"
              />
              {errors.minRate && <p className="text-red-600 text-sm mt-1">{errors.minRate}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Rate</label>
              <input
                type="number"
                className={`border p-2 rounded-xl w-full bg-white bg-opacity-80 ${errors.maxRate ? 'border-red-500' : ''}`}
                value={maxRate}
                onChange={(e) => setMaxRate(e.target.value)}
                onBlur={validate}
                min="0"
              />
              {errors.maxRate && <p className="text-red-600 text-sm mt-1">{errors.maxRate}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Rate</label>
              <input
                type="number"
                className={`border p-2 rounded-xl w-full bg-white bg-opacity-80 ${errors.defaultRate ? 'border-red-500' : ''}`}
                value={defaultRate}
                onChange={(e) => setDefaultRate(e.target.value)}
                onBlur={validate}
                min="0"
              />
              {errors.defaultRate && <p className="text-red-600 text-sm mt-1">{errors.defaultRate}</p>}
            </div>
          </div>
        </div>

        {/* Credit Score */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Credit Score</h3>
          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Credit Score Required</label>
          <input
            type="number"
            className={`border p-2 rounded-xl w-full mb-1 bg-white bg-opacity-80 ${errors.minCreditScore ? 'border-red-500' : ''}`}
            value={minCreditScore}
            onChange={(e) => setMinCreditScore(e.target.value)}
            onBlur={validate}
            min="0"
          />
          {errors.minCreditScore && <p className="text-red-600 text-sm mt-1">{errors.minCreditScore}</p>}
          <p className="text-sm text-gray-500">
            Applications with credit scores below this threshold will be automatically rejected.
          </p>
        </div>

        {/* Document Types */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Document Types</h3>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Add new document type"
              className={`border p-2 rounded-xl w-full bg-white bg-opacity-80 ${errors.newDocument ? 'border-red-500' : ''}`}
              value={newDocument}
              onChange={(e) => {
                setNewDocument(e.target.value);
                if (e.target.value.trim() !== '') {
                  setErrors((prev) => ({ ...prev, newDocument: undefined }));
                }
              }}
              onBlur={() => {
                if (newDocument.trim() === '') {
                  setErrors((prev) => ({ ...prev, newDocument: 'Document type cannot be empty' }));
                }
              }}
            />
            <button
              onClick={handleAddDocument}
              className="ml-2 bg-white text-black px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
              disabled={newDocument.trim() === ''}
            >
              <FaPlus />
              Add
            </button>
          </div>
          {errors.newDocument && <p className="text-red-600 text-sm mt-1">{errors.newDocument}</p>}
          {documentTypes.map((doc, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="border p-2 rounded-xl w-full bg-white bg-opacity-80">{doc}</span>
              <button
                onClick={() => handleRemoveDocument(index)}
                className="ml-2 text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-100 transition"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* Loan Terms */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Available Loan Terms</h3>
          <div className="flex items-center mb-4">
            <input
              type="number"
              placeholder="Add loan term (months)"
              className={`border p-2 rounded-xl w-full bg-white bg-opacity-80 ${errors.newLoanTerm ? 'border-red-500' : ''}`}
              value={newLoanTerm}
              onChange={(e) => {
                setNewLoanTerm(e.target.value);
                if (!isNaN(e.target.value) && Number(e.target.value) > 0) {
                  setErrors((prev) => ({ ...prev, newLoanTerm: undefined }));
                }
              }}
              min="1"
              onBlur={() => {
                if (newLoanTerm !== '' && (isNaN(newLoanTerm) || Number(newLoanTerm) <= 0)) {
                  setErrors((prev) => ({ ...prev, newLoanTerm: 'Loan term must be a positive number' }));
                }
              }}
            />
            <button
              onClick={handleAddLoanTerm}
              className="ml-2 bg-white text-black px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
              disabled={newLoanTerm.trim() === '' || errors.newLoanTerm}
            >
              <FaPlus />
              Add
            </button>
          </div>
          {errors.newLoanTerm && <p className="text-red-600 text-sm mt-1">{errors.newLoanTerm}</p>}
          <div className="flex flex-wrap gap-2">
            {loanTerms.map((term, index) => (
              <div key={index} className="flex items-center bg-gray-100 rounded px-2 py-1">
                <span className="text-sm">{term} months</span>
                <button
                  onClick={() => handleRemoveLoanTerm(index)}
                  className="ml-1 text-black hover:text-gray-800 p-1 rounded hover:bg-gray-200 transition"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="text-left">
          <button
            onClick={handleSave}
            className={`bg-accent text-white px-6 py-2 rounded hover:bg-secondary transition flex items-center gap-2 ${
              Object.keys(errors).length > 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={Object.keys(errors).length > 0}
          >
            <FaSave className="text-white" />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
    </main>
  </div>
  );
};

export default LoanSystemConfig;
