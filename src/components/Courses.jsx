import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Courses.css";
import { useNavigate } from "react-router-dom"; 
import EnrollModal from "./EnrollModal";
const Courses = () => {

  const BASE_URL = "https://vts-backend-wky4.onrender.com";

  const [courses, setCourses] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
const [showModal, setShowModal] = useState(false);
const course = { title: "React Course" };
  const navigate = useNavigate(); // ✅ Initialize navigate here

  const categories = [
    "All",
    "Development",
    "Design",
    "Data",
    "Emerging Tech",
  ];

  useEffect(() => {
    let url = `${BASE_URL}/api/courses/`;

    if (activeCategory !== "All") {
      url += `?category=${activeCategory}`;
    }

    axios.get(url)
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));

  }, [activeCategory]);

  return (
    <section className="featured-wrapper container py-5">

      {/* Header */}
      {/* Header */}
<div className="featured-header mb-4">
  <div className="featured-heading">
    <h2 className="featured-title">Explore Courses by Career Path</h2>
    
  </div>

  <button className="consult-btn" onClick={() => navigate("/contact")}
  >Free Consultation</button>
</div>

      {/* Category Filter */}
      <div className="filter-tabs mb-4">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active-tab" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Cards */}
      <div className="row g-4">
        {courses.map((course) => (
          <div className="col-lg-4 col-md-6 col-12" key={course.id}>
            <div className="course-card">

              <img
                src={course.image}
                className="course-image"
                alt={course.title}
              />

              <div className="course-body">
                <h5 className="course-title">{course.title}</h5>

                <div className="course-meta">
                  <div className="meta-row">
                    <FaCalendarAlt className="meta-icon" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="meta-row">
                    <MdSchool className="meta-icon" />
                    <span>{course.level}</span>
                  </div>
                </div>

                <p className="course-desc">{course.description}</p>

                <div className="course-buttons">
                  <button
                    className="btn-outline-custom"
                    onClick={() => navigate(`/course/${course.id}`)} // ✅ Works now
                  >
                    View Details
                  </button>
                  <button className="btn-primary-custom"
                  onClick={() => setShowModal(true)}>
                    Enroll Now
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
 {/* ENROLL MODAL */}
      {showModal && (
        <EnrollModal
          courseTitle={course.title}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
};

export default Courses;
