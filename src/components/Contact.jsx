import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Contact.css";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaMapMarkerAlt
} from "react-icons/fa";

const Contact = () => {
  const [map, setMap] = useState("");
  const [images, setImages] = useState([]);
  const BASE_URL = "http://127.0.0.1:8000";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const courses = [
    "Python Full Stack Development",
    "Java Full Stack Development",
    "MERN Stack",
    "UI/UX Design",
  ];

  // ✅ FETCH MAP
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/contact-map/`)
      .then((res) => setMap(res.data.map_image))
      .catch((err) => console.log(err));
  }, []);

  // ✅ FETCH LEARNING IMAGES
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/learning-environment/`)
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));
  }, []);

  // ✅ VALIDATION
  const validate = () => {
    let err = {};

    if (!form.name.trim()) err.name = "Full name is required";
    if (!form.email.match(/^\S+@\S+\.\S+$/))
      err.email = "Enter valid email";
    if (!form.phone.match(/^[6-9]\d{9}$/))
      err.phone = "Enter valid mobile";
    if (!form.course) err.course = "Select a course";
    if (!form.message.trim())
      err.message = "Message is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ✅ SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        course: "",
        message: "",
      });
    }
  };

  return (
    <>
      {/* ================= ENQUIRY ================= */}
      <div className="enquiry-section">
        <div className="left">
          <h2>Get in Touch with our Experts</h2>
          <p>Have questions? We're here to help you start your learning journey</p>
          <button className="consult-btn">Free Consultation</button>
        </div>

 <form className="form-card" onSubmit={handleSubmit}>
  <h5>Enquiry Form</h5>

  <div className="form-grid">
    {/* Row 1: Name + Email */}
    <div className="form-field">
      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <span className="error">{errors.name}</span>
    </div>

    <div className="form-field">
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <span className="error">{errors.email}</span>
    </div>

    {/* Row 2: Phone + Course */}
    <div className="form-field">
      <input
        type="tel"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <span className="error">{errors.phone}</span>
    </div>

    <div className="form-field">
      <select
        value={form.course}
        onChange={(e) => setForm({ ...form, course: e.target.value })}
      >
        <option value="">Select Course</option>
        {courses.map((c, i) => (
          <option key={i}>{c}</option>
        ))}
      </select>
      <span className="error">{errors.course}</span>
    </div>

    {/* Row 3: Message full width */}
    <div className="form-field full-width">
      <textarea
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <span className="error">{errors.message}</span>
    </div>
  </div>

  <button type="submit" className="submit-btn">
    Submit
  </button>
</form>
      </div>

      {/* ================= CONTACT ================= */}
      <div className="contact-section">
        <div className="contact-left">
          <h2>We are here for You</h2>

          <div className="card">
            <FaEnvelope className="icons" />
            <h4>Email Us</h4>
            <p>vetritechnologysolutions@gmail.com</p>
          </div>

          <div className="card">
            <FaPhoneAlt className="icons" />
            <h4>Call Us</h4>
            <p>8438558527</p>
            <p>8438164827</p>
          </div>

          <div className="card">
            <FaClock className="icons" />
            <h4>Office hours</h4>
            <p>Mon - Sat : 10.00AM - 5.00PM</p>
            <p>Sunday closed</p>
          </div>
        </div>

        <div className="contact-right">
          {map && (
            <img
              src={`${BASE_URL}${map}`}
              alt="map"
            />
          )}
        </div>
      </div>

      {/* ================= BRANCH ================= */}
      <div className="branch-section">
        <h4 className="center">Visit Our Branch</h4>

        <div className="branch-grid">
          {[
            {
              title: "Surandai - April’s Complex",
              desc: "April's complex,Bus stand Backside, Surandai - 627859",
            },
            {
              title: "Surandai - Shanthi Complex",
              desc: "Shanthi Complex,Surandai Old Market,Near Bus Stand, Surandai - 627859",
            },
            {
              title: "Tirunelveli",
              desc: "Behind Side,Near Bus Stop,Chella samy teacher complex,Surandai,Tirunelveli",
            },
            {
              title: "Nagercoil",
              desc: "",
            },
          ].map((b, i) => (
            <div className="branch-card" key={i}>
              <div className="branch-icon">
                <FaMapMarkerAlt />
              </div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= LEARNING ================= */}
      <div className="learning-section">
        <div className="learning-header">
          <h3>Our Learning Environment</h3>
          <button className="view-btn">View all →</button>
        </div>

        <div className="learning-grid">
          {images.map((item) => (
            <div key={item.id} className="learning-card">
              <img
                src={`${BASE_URL}${item.image}`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

{/*faq*/}
{/* ================= FAQ SECTION ================= */}
<div className="faq-section">
  <h2 className="faq-title">Frequently Asked Questions</h2>

  <div className="faq-card">
    <h4>What are the course timings?</h4>
    <p>
      We offer flexible timings including weekday evenings (6–9 PM) and
      weekend batches (10 AM – 5 PM).
    </p>
  </div>

  <div className="faq-card">
    <h4>Do you offer placement assistance?</h4>
    <p>
      Yes! VCS provides comprehensive placement support including resume
      building, interview preparation, and job referrals.
    </p>
  </div>

  <div className="faq-card">
    <h4>What is the batch size?</h4>
    <p>
      We maintain small batch sizes of 15–20 students to ensure personalized
      attention and effective learning.
    </p>
  </div>
</div>




    </>
  );
};

export default Contact;