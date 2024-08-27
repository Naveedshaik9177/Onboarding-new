import React, { useState } from 'react';
import './step2.css';

const Step2 = ({ onNext, onBack, data }) => {
  const [personalDetails, setPersonalDetails] = useState({
    name: data?.name || '',
    email: data?.email || '',
    phone: data?.phone || ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!personalDetails.name) newErrors.name = 'Name is required';
    if (!personalDetails.email || !/\S+@\S+\.\S+/.test(personalDetails.email))
      newErrors.email = 'Valid email is required';
    if (!personalDetails.phone || !/^\d{10}$/.test(personalDetails.phone))
      newErrors.phone = 'Valid phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPersonalDetails({ ...personalDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onNext(personalDetails);
    }
  };

  return (
    <div className="step2-container">
      {/* <div><h2 className="step2-title">Step 2: Enter Personal Details</h2></div> */}
      <form className="step2-form" onSubmit={handleSubmit}>
      <div><h2 className="step2-title">Step 2: Enter Personal Details</h2></div>
        <div className={`step2-input-container ${personalDetails.name ? 'filled' : ''}`}>
          <label htmlFor="name" className="step2-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="step2-input"
            value={personalDetails.name}
            onChange={handleChange}
          />
          {errors.name && <p className="step2-error">{errors.name}</p>}
        </div>

        <div className={`step2-input-container ${personalDetails.email ? 'filled' : ''}`}>
          <label htmlFor="email" className="step2-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="step2-input"
            value={personalDetails.email}
            onChange={handleChange}
          />
          {errors.email && <p className="step2-error">{errors.email}</p>}
        </div>

        <div className={`step2-input-container ${personalDetails.phone ? 'filled' : ''}`}>
          <label htmlFor="phone" className="step2-label">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="step2-input"
            value={personalDetails.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="step2-error">{errors.phone}</p>}
        </div>

        <div className="step2-button-group">
          <button type="button" className="step2-button" onClick={onBack}>Back</button>
          <button type="submit" className="step2-button">Next</button>
        </div>
      </form>
    </div>
  );
};

export default Step2;
