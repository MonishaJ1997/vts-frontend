import React, { useState, useEffect } from "react";
import "./EnrollModal.css";
import PaymentStep from "./PaymentStep";
const EnrollModal = ({ courseTitle, onClose }) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    course: courseTitle || "",
    mode: "",
    message: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleConfirm = () => {
    alert("Form Submitted Successfully!");
    setStep(3);
  };

  /* LABEL MAP FOR CONFIRM STEP */
  const labels = {
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone Number",
    email: "Email Address",
    gender: "Gender",
    dob: "Date of Birth",
    address: "Address",
    city: "City",
    state: "State",
    pincode: "Pincode",
    course: "Course",
    mode: "Mode",
  };

  return (
    <div className="enroll-overlay">
      <div className="enroll-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        {/* STEP HEADER */}
        <div className="step-header">
          <div className={`step-pill ${step > 1 ? "completed" : step === 1 ? "active" : ""}`}>
            Enter Details
          </div>
          <div className={`step-pill ${step > 2 ? "completed" : step === 2 ? "active" : ""}`}>
            Confirm Details
          </div>
          <div className={`step-pill ${step === 3 ? "active" : ""}`}>
            Payment
          </div>
        </div>

        {/* STEP 1 – FORM */}
        {step === 1 && (
          <>
            <h3 className="modal-title">Enter Correct Details</h3>

            <div className="modal-body">
              <div className="form-grid">

                <div className="form-group">
                  <label>First Name <span>*</span></label>
                  <input name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Phone Number <span>*</span></label>
                  <input name="phone" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Email Address <span>*</span></label>
                  <input name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Gender <span>*</span></label>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Please Select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Date of Birth <span>*</span></label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Address <span>*</span></label>
                  <input name="address" value={formData.address} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>City <span>*</span></label>
                  <input name="city" value={formData.city} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>State <span>*</span></label>
                  <input name="state" value={formData.state} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Pincode <span>*</span></label>
                  <input name="pincode" value={formData.pincode} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label>Select Course <span>*</span></label>
                  <select name="course" value={formData.course} onChange={handleChange}>
                    <option value="">Please Select</option>
                    <option>Python Full Stack Development</option>
                    <option>Java Full Stack Development</option>
                    <option>UI/UX Designing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Available Mode <span>*</span></label>
                  <select name="mode" value={formData.mode} onChange={handleChange}>
                    <option value="">Please Select</option>
                    <option>Offline</option>
                    <option>Online</option>
                  </select>
                </div>

                <div className="form-group full">
                  <label>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} />
                </div>

              </div>

              <button className="submit-btn" onClick={handleNext}>Submit</button>
            </div>
          </>
        )}

        {/* STEP 2 – CONFIRM */}
        {step === 2 && (
          <div className="step-content confirm-details">
            <h3 className="confirm-title">Please Confirm Your Details</h3>

            <div className="confirm-box">
              <div className="confirm-grid">
                {Object.keys(labels).map((key) => (
                  <div key={key} className="confirm-row">
                    <span className="confirm-label">{labels[key]}</span>
                    <span className="confirm-colon">:</span>
                    <span className="confirm-value">{formData[key] || "-"}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="confirm-buttons">
              <button className="back-btn" onClick={handleBack}>Back to Edit</button>
              <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        )}

        {/* STEP 3 – PAYMENT */}
        {step === 3 && <PaymentStep />}

      </div>
    </div>
  );
};

export default EnrollModal;