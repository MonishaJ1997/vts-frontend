import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EnrollModal from "./EnrollModal";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const BASE_URL = "http://127.0.0.1:8000";

  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/courses/${id}/`)
      .then((res) => setCourse(res.data))
      .catch((err) => setError(err));
  }, [id]);

  if (error) return <p>Error loading course.</p>;
  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-details">

      {/* TOP SECTION */}
      <div className="top-section">

        {/* LEFT CONTENT */}
        <div className="left-content">
          <h3 className="course-title-main">{course.title}</h3>
          <p className="subtitle">
            Build complete web applications from 
            frontend to backend using Python.
             
            Become a job ready fullstack developer.
          </p>
{/*
          <div className="info-boxes">
            <div className="info-card"><span>₹ 30,000</span><p>Course Fee</p></div>
            <div className="info-card"><span>6 Months</span><p>Duration</p></div>
            <div className="info-card"><span>Yes</span><p>Certification</p></div>
            <div className="info-card"><span>Online & Offline</span><p>Mode</p></div>
          </div>*/}



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
            <button className="enroll-btns" onClick={() => setShowModal(true)}>
              Enroll Now
            </button>

           {/* <button className="download-btn">Download Brochure</button>*/}
<a
  href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  target="_blank"
  rel="noopener noreferrer"
  download
  className="download-btn"
>
  Download Brochure
</a>

          </div>
        </div>

        {/* RIGHT VIDEO IMAGE 
        <div className="right-video">
          {course.video_thumbnail ? (
            <img src={course.video_thumbnail} alt={course.title} />
          ) : (
            <p>No video thumbnail uploaded</p>
          )}
        </div>*/}



 <div className="right-video">
  <div className="video-card">

    <img
      src={course.video_thumbnail}
      alt={course.title}
      className="video-thumb"
    />

    {/* CENTER TRANSPARENT BOX */}
    <div className="video-overlay-box">
      <div className="play-circle">▶</div>
    </div>

  </div>

  {/* Bottom controls */}
  <div className="video-controls">
    <span className="play-btn">▶</span>
    <div className="progress-bar"></div>
    <span className="duration">2m</span>
  </div>










</div>
      </div>
<div className="border"></div>
  
      {/* COURSE OVERVIEW */}
      <div className="section-block">
        <h5>Course Overview</h5>
        <p>
          This course trains you to develop modern, dynamic, and database-driven web applications.
          You will learn both frontend design and backend development using Python technologies
          used in real IT companies. Perfect for students who want to become software developers,
          web developers, or backend engineers.
        </p>
      </div>

      {/* TECHNOLOGIES */}
      <div className="section-block">
        <h5>Tools & Technologies Covered</h5>
        <div className="tech-grid">
          {course.technologies?.length > 0 ? (
            course.technologies.map((tech) => (
              <div key={tech.id} className="tech-card">
                {tech.icon && <img src={tech.icon} alt={tech.name} />}
                <p>{tech.name}</p>
              </div>
            ))
          ) : (
            <p>No technologies added yet.</p>
          )}
        </div>
      </div>

      {/* WHAT YOU WILL LEARN */}
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

      {/* ENROLL MODAL */}
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
