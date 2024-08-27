import React, { useState } from 'react';
import './step3.css';

const Step3 = ({ onNext, onBack, data }) => {
  const [salaryAccountDetails, setSalaryAccountDetails] = useState({
    bankName: data?.bankName || '',
    accountNumber: data?.accountNumber || '',
    ifscCode: data?.ifscCode || ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!salaryAccountDetails.bankName) newErrors.bankName = 'Bank name is required';
    if (!salaryAccountDetails.accountNumber || !/^\d{10,12}$/.test(salaryAccountDetails.accountNumber))
      newErrors.accountNumber = 'Valid account number is required';
    if (!salaryAccountDetails.ifscCode) newErrors.ifscCode = 'IFSC code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSalaryAccountDetails({ ...salaryAccountDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onNext(salaryAccountDetails);
    }
  };

  return (
    <div className="step3-container">

      <form className="step3-form" onSubmit={handleSubmit}>
      <h2 className="step3-title">Step 3: Enter Salary Account Details</h2>
        <div className="step3-input-container">
          <input
            type="text"
            id="bankName"
            name="bankName"
            className="step3-input"
            value={salaryAccountDetails.bankName}
            onChange={handleChange}
            placeholder=" " // Keeps placeholder blank for floating label functionality
          />
          <label htmlFor="bankName" className={`step3-label ${salaryAccountDetails.bankName && 'filled'}`}>
            Bank Name
          </label>
          {errors.bankName && <p className="step3-error">{errors.bankName}</p>}
        </div>

        <div className="step3-input-container">
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            className="step3-input"
            value={salaryAccountDetails.accountNumber}
            onChange={handleChange}
            placeholder=" " // Keeps placeholder blank for floating label functionality
          />
          <label htmlFor="accountNumber" className={`step3-label ${salaryAccountDetails.accountNumber && 'filled'}`}>
            Account Number
          </label>
          {errors.accountNumber && <p className="step3-error">{errors.accountNumber}</p>}
        </div>

        <div className="step3-input-container">
          <input
            type="text"
            id="ifscCode"
            name="ifscCode"
            className="step3-input"
            value={salaryAccountDetails.ifscCode}
            onChange={handleChange}
            placeholder=" " // Keeps placeholder blank for floating label functionality
          />
          <label htmlFor="ifscCode" className={`step3-label ${salaryAccountDetails.ifscCode && 'filled'}`}>
            IFSC Code
          </label>
          {errors.ifscCode && <p className="step3-error">{errors.ifscCode}</p>}
        </div>

        <div className="step3-button-group">
          <button type="button" className="step3-button" onClick={onBack}>Back</button>
          <button type="submit" className="step3-button">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Step3;
