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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  /* ================= LABELS ================= */
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
    message: "Message",
  };

  /* ================= VALIDATION ================= */
const validateField = (name, value) => {
  switch (name) {
    case "firstName":
    case "lastName":
      return /^[A-Za-z ]+$/.test(value) || "Only alphabets allowed";

    case "phone":
      return /^[6-9][0-9]{9}$/.test(value) || "Phone must start with 6-9 and be 10 digits";

    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Invalid email";

    case "pincode":
      return /^[0-9]{6}$/.test(value) || "Pincode must be 6 digits";

    case "course":
    case "mode":
    case "gender":
      return value !== "" || "Please select an option";

    case "dob": {
  if (!value) return "Date of birth is required";

  const selectedDate = new Date(value);
  const today = new Date();

  if (selectedDate > today) {
    return "DOB cannot be in the future";
  }

  return true;
}
    default:
      return value.trim() !== "" || "This field is required";
  }
};
  /* ================= HANDLE CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const validation = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: validation === true ? "" : validation,
    }));
  };

  /* ================= REQUIRED ================= */

  const requiredFields = [
    "firstName",
    "phone",
    "email",
    "gender",
    "dob",
    "address",
    "city",
    "state",
    "pincode",
    "course",
    "mode",
  ];

  /* ================= NEXT ================= */

  const handleNext = () => {
    let newErrors = {};

    requiredFields.forEach((field) => {
      const validation = validateField(field, formData[field] || "");
      if (validation !== true) {
        newErrors[field] = validation;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Please fix the errors before submitting");
      return;
    }

    setStep(2);
  };

  const handleBack = () => setStep(1);

  const handleConfirm = () => {
    alert("Form Submitted Successfully!");
    setStep(3);
  };

  return (
    <div className="enroll-overlay">
      <div className="enroll-modal">

        <button className="close-btn" onClick={onClose}>×</button>

        {/* STEP HEADER */}
        <div className="step-header">
          <div className={`step-pill ${step === 1 ? "active" : step > 1 ? "completed" : ""}`}>
            Enter Details
          </div>
          <div className={`step-pill ${step === 2 ? "active" : step > 2 ? "completed" : ""}`}>
            Confirm Details
          </div>
          <div className={`step-pill ${step === 3 ? "active" : ""}`}>
            Payment
          </div>
        </div>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>
            <h3 className="modal-title">Enter Correct Details</h3>

            <div className="modal-body">
              <div className="form-grid">

                {/* FIRST NAME */}
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onKeyPress={(e) => {
                      if (!/[A-Za-z ]/.test(e.key)) e.preventDefault();
                    }}
                  />
                  <span className="error">{errors.firstName}</span>
                </div>

                {/* LAST NAME */}
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onKeyPress={(e) => {
                      if (!/[A-Za-z ]/.test(e.key)) e.preventDefault();
                    }}
                  />
                  <span className="error">{errors.lastName}</span>
                </div>

                {/* PHONE */}
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    maxLength={10}
                    onChange={handleChange}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                  />
                  <span className="error">{errors.phone}</span>
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.email}</span>
                </div>

                {/* GENDER */}
                <div className="form-group">
                  <label>Gender *</label>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <span className="error">{errors.gender}</span>
                </div>

                {/* DOB */}
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
  type="date"
  name="dob"
  value={formData.dob}
  onChange={handleChange}
  max={new Date(new Date().setFullYear(new Date().getFullYear() - 10))
    .toISOString()
    .split("T")[0]} // ✅ user must be at least 10 years old
/>
                  <span className="error">{errors.dob}</span>
                </div>

                {/* ADDRESS */}
                <div className="form-group">
                  <label>Address *</label>
                  <input name="address" value={formData.address} onChange={handleChange} />
                  <span className="error">{errors.address}</span>
                </div>

                {/* CITY */}
                <div className="form-group">
                  <label>City *</label>
                  <input name="city" value={formData.city} onChange={handleChange} />
                  <span className="error">{errors.city}</span>
                </div>

                {/* STATE */}
                <div className="form-group">
                  <label>State *</label>
                  <input name="state" value={formData.state} onChange={handleChange} />
                  <span className="error">{errors.state}</span>
                </div>

                {/* PINCODE */}
                <div className="form-group">
                  <label>Pincode *</label>
                  <input
                    name="pincode"
                    value={formData.pincode}
                    maxLength={6}
                    onChange={handleChange}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) e.preventDefault();
                    }}
                  />
                  <span className="error">{errors.pincode}</span>
                </div>

                {/* COURSE */}
                <div className="form-group">
                  <label>Course *</label>
                  <select name="course" value={formData.course} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Python Full Stack Development</option>
                    <option>Java Full Stack Development</option>
                    <option>UI/UX Designing</option>
                  </select>
                  <span className="error">{errors.course}</span>
                </div>

                {/* MODE */}
                <div className="form-group">
                  <label>Mode *</label>
                  <select name="mode" value={formData.mode} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Offline</option>
                    <option>Online</option>
                  </select>
                  <span className="error">{errors.mode}</span>
                </div>

                {/* MESSAGE */}
                <div className="form-group full">
                  <label>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} />
                </div>

              </div>

              <button className="submits-btn" onClick={handleNext}>
                Submit
              </button>
            </div>
          </>
        )}

        {/* ================= STEP 2 ================= */}
 {step === 2 && (
  <div className="step-content confirm-details">
    <h3 className="confirm-title">Please Confirm Your Details</h3>

    <div className="confirm-wrapper">

      {/* LEFT GRID */}
      <div className="confirm-grid">
        <div className="row-item"><span>First Name</span><span>:</span><span>{formData.firstName}</span></div>
        <div className="row-item"><span>Last Name</span><span>:</span><span>{formData.lastName}</span></div>
        <div className="row-item"><span>Phone No</span><span>:</span><span>{formData.phone}</span></div>
        <div className="row-item"><span>Email Id</span><span>:</span><span>{formData.email}</span></div>
        <div className="row-item"><span>Gender</span><span>:</span><span>{formData.gender}</span></div>
        <div className="row-item"><span>Date of Birth</span><span>:</span><span>{formData.dob}</span></div>
      </div>

      {/* RIGHT GRID */}
      <div className="confirm-grid">
        <div className="row-item"><span>Address</span><span>:</span><span>{formData.address}</span></div>
        <div className="row-item"><span>City</span><span>:</span><span>{formData.city}</span></div>
        <div className="row-item"><span>State</span><span>:</span><span>{formData.state}</span></div>
        <div className="row-item"><span>Pincode</span><span>:</span><span>{formData.pincode}</span></div>
        <div className="row-item"><span>Course Name</span><span>:</span><span>{formData.course}</span></div>
        <div className="row-item"><span>Mode</span><span>:</span><span>{formData.mode}</span></div>
      </div>

    </div>

    <div className="confirm-buttons">
      <button className="back-btn" onClick={handleBack}>Back to Edit</button>
      <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
    </div>
  </div>
)}

        {/* ================= STEP 3 ================= */}
        {step === 3 && <PaymentStep formData={formData} onClose={onClose}  />}

      </div>
    </div>
  );
};

export default EnrollModal;
