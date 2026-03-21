import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EnrollModal from "./EnrollModal";
import html2pdf from "html2pdf.js";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const BASE_URL = "https://vts-backend-wky4.onrender.com";

  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/courses/${id}/`)
      .then((res) => setCourse(res.data))
      .catch((err) => setError(err));
  }, [id]);

  // ✅ BROCHURE DOWNLOAD (STRING METHOD)
  const downloadBrochure = () => {
    const brochureHtml = `
      <div style="width:800px; padding:25px; font-family:Arial; background:#fff; color:#000;">
        
        <h1 style="text-align:center; color:#6621BA;">
          ${course?.title || "Course Title"}
        </h1>

        <p style="text-align:center; font-size:14px;">
          Professional Course Brochure
        </p>

        <hr/>

        <h3>Course Overview</h3>
        <p>
          This course trains you to develop modern, dynamic, and database-driven web applications.
          Learn frontend and backend using Python technologies used in real IT companies.
          Become a job-ready full stack developer.
        </p>

        <hr/>

        <h3>Course Details</h3>
        <p><strong>Fee:</strong> ₹30,000</p>
        <p><strong>Duration:</strong> 6 Months</p>
        <p><strong>Certification:</strong> Yes</p>
        <p><strong>Mode:</strong> Online & Offline</p>

        <hr/>

        <h3>Technologies Covered</h3>
        <ul>
          ${
            course?.technologies
              ?.map((tech) => `<li>${tech.name}</li>`)
              .join("") ||
            `<li>Python</li><li>Django</li><li>React</li><li>MySQL</li>`
          }
        </ul>

        <hr/>

        <h3>What You Will Learn</h3>
        <ul>
          <li>Build dynamic websites using Django</li>
          <li>Create REST APIs</li>
          <li>Connect frontend with backend</li>
          <li>Work with real database</li>
          <li>Deploy project to server</li>
          <li>Authentication & Admin panel</li>
        </ul>

        <hr/>

        <p style="text-align:center;">
          Thank you for choosing VTS Academy!
        </p>

      </div>
    `;

    const opt = {
      margin: 0.3,
      filename: `${course?.title || "Course"}_Brochure.pdf`,
      html2canvas: { scale: 3 },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().from(brochureHtml).set(opt).save();
  };

  if (error) return <p>Error loading course.</p>;
  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-details">

      {/* TOP SECTION */}
      <div className="top-section">

        {/* LEFT */}
        <div className="left-content">
          <h3 className="course-title-main">{course.title}</h3>

          <p className="subtitle">
            Build complete web applications from frontend to backend using Python.
            Become a job ready fullstack developer.
          </p>

          <div className="info-boxes">
            <div className="info-card">
              <span className="icon">₹</span>
              <div>
                <p className="label">Course Fee</p>
                <h6 className="no">₹ 30,000</h6>
              </div>
            </div>

            <div className="info-card">
              <span className="icon">⏱</span>
              <div>
                <p className="label">Duration</p>
                <h6>6 Months</h6>
              </div>
            </div>

            <div className="info-card">
              <span className="icon">🎓</span>
              <div>
                <p className="label">Certification</p>
                <h6>Yes</h6>
              </div>
            </div>

            <div className="info-card">
              <span className="icon">☀</span>
              <div>
                <p className="label">Mode</p>
                <h6>Online & Offline</h6>
              </div>
            </div>
          </div>

          <div className="buttons">
            <button
              className="enroll-btns"
              onClick={() => setShowModal(true)}
            >
              Enroll Now
            </button>

            <button className="download-btn" onClick={downloadBrochure}>
              Download Brochure
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right-video">
          <div className="video-card">
            <img
              src="/video_image.png"
              alt={course.title}
              className="video-thumb"
            />

            <div className="video-overlay-box">
              <div className="play-circle">▶</div>
            </div>
          </div>

          <div className="video-controls">
            <span className="play-btn">▶</span>
            <div className="progress-bar"></div>
            <span className="duration">2m</span>
          </div>
        </div>
      </div>

      <div className="border"></div>

      {/* OVERVIEW */}
      <div className="section-block">
        <h5>Course Overview</h5>
        <p>
          This course trains you to develop modern, dynamic, and database-driven
          web applications using real-world tools and technologies.
        </p>
      </div>

      {/* TOOLS */}
      <div className="tools-section">
        <h2>Tools & Technologies Covered</h2>

        <div className="tools-container">
          <div className="tool-card">
            <img src="/python1.png" alt="Python" />
            <p>Python</p>
          </div>

          <div className="tool-card">
            <img src="/django.png" alt="Django" />
            <p>Django</p>
          </div>

          <div className="tool-card">
            <img src="/react.png" alt="React" />
            <p>React</p>
          </div>

          <div className="tool-card">
            <img src="/mysql.png" alt="MySQL" />
            <p>My SQL</p>
          </div>

          <div className="tool-card">
            <img src="/api.png" alt="API" />
            <p>APIs</p>
          </div>
        </div>
      </div>

      {/* LEARNING */}
      <div className="section-block">
        <h5>What You Will Learn</h5>
        <ul className="learn-list">
          <li>Build dynamic websites using Django</li>
          <li>Create REST APIs</li>
          <li>Connect frontend with backend</li>
          <li>Work with real database</li>
          <li>Deploy project to server</li>
          <li>Authentication & Admin panel</li>
        </ul>
      </div>

      {/* MODAL */}
      {showModal && (
        <EnrollModal
          courseTitle={course.title}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
};

export default CourseDetails;
