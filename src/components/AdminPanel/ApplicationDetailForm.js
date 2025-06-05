import React, { useState } from "react";

const ApplicationDetailForm = () => {
  const [dob, setDob] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [ssn, setSsn] = useState("");
  const [confirmSsn, setConfirmSsn] = useState("");
  const [amountNeeded, setAmountNeeded] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [homeAddress2, setHomeAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [homeowner, setHomeowner] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [authorizeCredit, setAuthorizeCredit] = useState(false);

  const [errors, setErrors] = useState({});

  const states = [
    "",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const validate = () => {
    const newErrors = {};

    if (!dob) newErrors.dob = "Date of Birth is required.";
    if (!monthlyIncome) newErrors.monthlyIncome = "Monthly income is required.";
    else if (isNaN(monthlyIncome)) newErrors.monthlyIncome = "Monthly income must be a number.";

    if (!ssn) newErrors.ssn = "SSN is required.";
    else if (!/^\d{9}$/.test(ssn)) newErrors.ssn = "SSN must be exactly 9 digits.";

    if (!confirmSsn) newErrors.confirmSsn = "Please confirm SSN.";
    else if (ssn !== confirmSsn) newErrors.confirmSsn = "SSN and Confirm SSN must match.";

    if (!amountNeeded) newErrors.amountNeeded = "Amount needed is required.";
    else if (isNaN(amountNeeded)) newErrors.amountNeeded = "Amount needed must be a number.";

    if (!homeAddress) newErrors.homeAddress = "Home address is required.";

    if (!zipCode) newErrors.zipCode = "Zip code is required.";
    else if (!/^\d{5,6}$/.test(zipCode)) newErrors.zipCode = "Zip code must be 5 or 6 digits.";

    if (!city) newErrors.city = "City is required.";
    if (!state) newErrors.state = "State is required.";
    if (!homeowner) newErrors.homeowner = "Please select homeowner status.";

    if (!agreeTerms) newErrors.agreeTerms = "You must agree to the terms.";
    if (!authorizeCredit) newErrors.authorizeCredit = "You must authorize credit report.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        <div className="flex-1">
          <label htmlFor="dob" className="block mb-1 font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.dob ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="monthlyIncome" className="block mb-1 font-medium">
            Monthly Gross Income
          </label>
          <input
            type="text"
            id="monthlyIncome"
            placeholder="Enter amount"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.monthlyIncome ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.monthlyIncome && (
            <p className="text-red-500 text-sm">{errors.monthlyIncome}</p>
          )}
        </div>
      </div>

      <p className="mb-6 italic text-sm text-gray-700">
        You may include alimony, child support, or separate maintenance income if you wish to have it
        considered.
      </p>

      
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        <div className="flex-1">
          <label htmlFor="ssn" className="block mb-1 font-medium">
            SSN
          </label>
          <input
            type="text"
            id="ssn"
            placeholder="Social Security Number"
            value={ssn}
            onChange={(e) => setSsn(e.target.value)}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.ssn ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.ssn && <p className="text-red-500 text-sm">{errors.ssn}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="confirmSsn" className="block mb-1 font-medium">
            Confirm SSN
          </label>
          <input
            type="text"
            id="confirmSsn"
            placeholder="Confirm Social Security Number"
            value={confirmSsn}
            onChange={(e) => setConfirmSsn(e.target.value)}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.confirmSsn ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.confirmSsn && <p className="text-red-500 text-sm">{errors.confirmSsn}</p>}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        <div className="flex-1">
          <label htmlFor="amountNeeded" className="block mb-1 font-medium">
            How much do you need?
          </label>
          <input
            type="text"
            id="amountNeeded"
            placeholder="Amount needed"
            value={amountNeeded}
            onChange={(e) => setAmountNeeded(e.target.value)}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.amountNeeded ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.amountNeeded && <p className="text-red-500 text-sm">{errors.amountNeeded}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="homeAddress" className="block mb-1 font-medium">
            Home Address
          </label>
          <input
            type="text"
            id="homeAddress"
            placeholder="Street address"
            value={homeAddress}
            onChange={(e) => setHomeAddress(e.target.value)}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.homeAddress ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.homeAddress && <p className="text-red-500 text-sm">{errors.homeAddress}</p>}
        </div>
      </div>

     
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        <div className="flex-1">
          <label htmlFor="homeAddress2" className="block mb-1 font-medium">
            Home Address 2
          </label>
          <input
            type="text"
            id="homeAddress2"
            placeholder="Apt, suite, etc. (optional)"
            value={homeAddress2}
            onChange={(e) => setHomeAddress2(e.target.value)}
            className="w-full border-b border-gray-400 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="zipCode" className="block mb-1 font-medium">
            Zip Code
          </label>
          <input
            type="text"
            id="zipCode"
            placeholder="Zip code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.zipCode ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
        <div className="flex-1">
          <label htmlFor="city" className="block mb-1 font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.city ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div className="flex-1">
          <label htmlFor="state" className="block mb-1 font-medium">
            State
          </label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={`w-full border-b py-2 focus:outline-none ${
              errors.state ? "border-red-500" : "border-gray-400 focus:border-blue-600"
            }`}
          >
            {states.map((st) => (
              <option key={st} value={st}>
                {st || "Select State"}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6 w-full">
        <h3 className="font-semibold">Are you a homeowner?</h3>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="homeowner"
            value="yes"
            checked={homeowner === "yes"}
            onChange={() => setHomeowner("yes")}
            className="cursor-pointer accent-blue-600"
          />
          Yes
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="homeowner"
            value="no"
            checked={homeowner === "no"}
            onChange={() => setHomeowner("no")}
            className="cursor-pointer accent-blue-600"
          />
          No
        </label>
      </div>
      {errors.homeowner && <p className="text-red-500 text-sm mb-6">{errors.homeowner}</p>}

     
      <p className="font-bold mb-4 w-full">
        Anti-money laundering and counter-terrorism financing laws require that we collect and verify
        identifying information if you proceed in using NewCo.
      </p>

      
      <div className="mb-4 w-full">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
            className={`cursor-pointer accent-blue-600 ${
              errors.agreeTerms ? "border-red-500" : ""
            }`}
          />
          <span>
            By checking the box and submitting my application I agree to NewCo{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              Terms and Authorization
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600"
            >
              Privacy Policy and Notices
            </a>
          </span>
        </label>
        {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms}</p>}
      </div>

      
      <div className="mb-6 w-full">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={authorizeCredit}
            onChange={() => setAuthorizeCredit(!authorizeCredit)}
            className={`cursor-pointer accent-blue-600 ${
              errors.authorizeCredit ? "border-red-500" : ""
            }`}
          />
          <span>I authorize credit report pull</span>
        </label>
        {errors.authorizeCredit && <p className="text-red-500 text-sm">{errors.authorizeCredit}</p>}
      </div>

      <div className="flex justify-between w-full flex-wrap gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition flex-grow md:flex-grow-0"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-[#029aaa] text-white px-6 py-2 rounded hover:bg-[#01c4d5] transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ApplicationDetailForm;
