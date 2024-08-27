import React, { useState, useEffect } from 'react';
import './step4.css';

const Step4 = ({ onNext, onBack, data }) => {
  const [idCardDetails, setIdCardDetails] = useState({
    bloodGroup: data?.bloodGroup || '',
    photo: data?.photo || '',
    issueDate: data?.issueDate || ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const inputs = document.querySelectorAll('.step4-input');
    inputs.forEach(input => {
      if (input.value) {
        input.classList.add('has-value');
      }
    });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!idCardDetails.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!idCardDetails.photo) newErrors.photo = 'Passport size photo is required';
    if (!idCardDetails.issueDate) newErrors.issueDate = 'Issue date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'photo') {
      setIdCardDetails({ ...idCardDetails, photo: files[0] });
    } else {
      setIdCardDetails({ ...idCardDetails, [name]: value });
    }

    if (event.target.value) {
      event.target.classList.add('has-value');
    } else {
      event.target.classList.remove('has-value');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onNext({
        ...idCardDetails,
        photo: idCardDetails.photo // pass the file, not just the name
      });
    }
  };

  return (
    <div className="step4-container">
      <form className="step4-form" onSubmit={handleSubmit}>
        <h2 className="step4-title">Step 4: Enter ID Card Details</h2>
        <div className="step4-field">
          <input
            type="text"
            id="bloodGroup"
            name="bloodGroup"
            className="step4-input"
            value={idCardDetails.bloodGroup}
            onChange={handleChange}
          />
          <label htmlFor="bloodGroup" className="step4-label">Blood Group:</label>
          {errors.bloodGroup && <p className="step4-error">{errors.bloodGroup}</p>}
        </div>

        <div className="step4-field">
          <input
            type="file"
            id="photo"
            name="photo"
            className="step4-input"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleChange}
          />
          <label htmlFor="photo" className="step5-label">Passport Size Photo (Image or PDF):</label>
          {errors.photo && <p className="step4-error">{errors.photo}</p>}
        </div>

        <div className="step4-field">
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            className="step4-input"
            value={idCardDetails.issueDate}
            onChange={handleChange}
          />
          <label htmlFor="issueDate" className="step5-label">Issue Date:</label>
          {errors.issueDate && <p className="step4-error">{errors.issueDate}</p>}
        </div>

        <div className="step4-button-group">
          <button type="button" className="step4-button" onClick={onBack}>Back</button>
          <button type="submit" className="step4-button">Finish</button>
        </div>
      </form>
    </div>
  );
};

export default Step4;
