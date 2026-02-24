import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css";
import { FaCalendarAlt } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EnrollModal from "./EnrollModal";




const Home = () => {
  const BASE_URL = "https://vts-backend-wky4.onrender.com";
const navigate = useNavigate();

const [loading, setLoading] = useState(true);


  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [whyChoose, setWhyChoose] = useState(null);
  const [ecosystemed, setEcosystem] = useState(null)
  const [howSection, setHowSection] = useState(null);
  const [howSteps, setHowSteps] = useState([]);
  const [courses, setCourses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [centerIndex, setCenterIndex] = useState(1);
  const [men, setMen] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);
  const [successStories, setSuccessStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
//last carousel
const [modalOpen, setModalOpen] = useState(false);
const [currentIndex, setCurrentIndex] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);
const [progress, setProgress] = useState(0);
const [storyRoles, setStoryRoles] = useState([]);
const [currentImageIndex, setCurrentImageIndex] = useState(0);
// Open modal
 const [showModal, setShowModal] = useState(false);
const course = { title: "React Course" };
const openModal = (story) => {
  console.log("CLICKED:", story);

  // 🔥 Match ID
  const matched = storyRoles.find(item => item.id === story.id);

  console.log("MATCHED DATA:", matched);

  if (matched) {
    setSelectedStory(matched);
    setCurrentIndex(0);
    setModalOpen(true);
    setProgress(0);
    setIsPlaying(false);
  }
};
// Close modal
const closeModal = () => {
  setModalOpen(false);
  setIsPlaying(false);
};

const currentStory = successStories[currentIndex];






  // index of clicked story
  
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 5;



useEffect(() => {
  const savedData = sessionStorage.getItem("homeData");

  if (savedData) {
    const parsed = JSON.parse(savedData);
    setHero(parsed.hero);
    setAbout(parsed.about);
    setWhyChoose(parsed.whyChoose);
    setHowSection(parsed.howSection);
    setCourses(parsed.courses);
    setProjects(parsed.projects);
    setSuccessStories(parsed.successStories);
    setStoryRoles(parsed.storyRoles);
    return;
  }

  // API calls
  Promise.all([
    axios.get(`${BASE_URL}/website-content/`),
    axios.get(`${BASE_URL}/about-content/`),
    axios.get(`${BASE_URL}/why-choose-us/`),
    axios.get(`${BASE_URL}/api/how-it-works/`),
    axios.get(`${BASE_URL}/api/featured-courses/`),
    axios.get(`${BASE_URL}/api/student-projects/`),
    axios.get(`${BASE_URL}/api/success-stories/`),
    axios.get(`${BASE_URL}/api/storyrole/`)
  ])
    .then(([hero, about, why, how, courses, projects, stories, roles]) => {
      setHero(hero.data);
      setAbout(about.data);
      setWhyChoose(why.data);
      setHowSection(how.data.section);
      setCourses(courses.data);
      setProjects(projects.data);
      setSuccessStories(stories.data);
      setStoryRoles(roles.data);

      sessionStorage.setItem("homeData", JSON.stringify({
        hero: hero.data,
        about: about.data,
        whyChoose: why.data,
        howSection: how.data.section,
        courses: courses.data,
        projects: projects.data,
        successStories: stories.data,
        storyRoles: roles.data
      }));
    })
    .catch(err => console.log(err));

}, []);









useEffect(() => {
  if (!modalOpen || !selectedStory?.images?.length) return;

  const interval = setInterval(() => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;

      if (nextIndex >= selectedStory.images.length) {
        return 0;
      }

      return nextIndex;
    });
  }, 2000);

  return () => clearInterval(interval);
}, [modalOpen, selectedStory]);

useEffect(() => {
  if (!modalOpen || !isPlaying) return;

  setProgress(0);

  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) return 0;
      return prev + 1;
    });
  }, 100); // 10 sec total

  return () => clearInterval(interval);
}, [modalOpen,isPlaying]);
const getCurrentImageIndex = () => {
  if (!selectedStory?.images?.length) return 0;

  if (progress <= 40) return 0;      // 0–30%
  if (progress <= 80) return 1;      // 30–60%
  return 1;                          // 60–100%
};

const nextSlide = () => {
  setCurrentIndex((prev) => {
    if (prev === successStories.length - 1) {
      setIsPlaying(false); // stop at last
      return prev;
    }
    return prev + 1;
  });
};

  // ================== FETCH DATA ==================
  useEffect(() => {
    axios.get(`${BASE_URL}/website-content/`)
      .then(res => setHero(res.data))
      .catch(err => console.log("Hero Error:", err));

    axios.get(`${BASE_URL}/about-content/`)
      .then(res => setAbout(res.data))
      .catch(err => console.log("About Error:", err));

    axios.get(`${BASE_URL}/why-choose-us/`)
      .then(res => setWhyChoose(res.data))
      .catch(err => console.log("Why Choose Error:", err));
     axios.get(`${BASE_URL}/api/ecosystemed/`)
      .then(res => {
        setEcosystem(res.data);
      })
      .catch(err => console.log(err));
    axios.get(`${BASE_URL}/api/how-it-works/`)
      .then(res => {
        setHowSection(res.data.section);
        setHowSteps(res.data.steps || []);
      })
      .catch(err => console.log("How It Works Error:", err));

    axios.get(`${BASE_URL}/api/featured-courses/`)
      .then(res => setCourses(res.data || []))
      .catch(err => console.log("Featured Courses Error:", err));

    axios.get(`${BASE_URL}/api/student-projects/`)
      .then(res => setProjects(res.data || []))
      .catch(err => console.log("Student Projects Error:", err));

    axios.get(`${BASE_URL}/api/success-stories/`)
      .then(res => {
        console.log("Success Stories Data:", res.data);
        setSuccessStories(res.data || []);
      })
      .catch(err => console.log("Success Stories Error:", err));


axios
      .get(`${BASE_URL}/api/career-men/`)
      .then((res) => {
        if (res.data.length > 0) setMen(res.data[0]); // first person only
      })
      .catch((err) => console.log(err));

axios.get(`${BASE_URL}/api/storyrole/`)
    .then(res => {
      console.log("DATA:", res.data);
      setStoryRoles(res.data);
    })
    .catch(err => console.log(err));

  }, []);

  // ================== PROJECT CAROUSEL LOGIC ==================
  const getIndex = (offset) => {
    if (projects.length === 0) return 0;
    return (centerIndex + offset + projects.length) % projects.length;
  };

  const moveLeft = () => {
    setCenterIndex(prev => (prev - 1 + projects.length) % projects.length);
  };

  const moveRight = () => {
    setCenterIndex(prev => (prev + 1) % projects.length);
  };

  // ================== SUCCESS STORIES LOGIC ==================
{/* const handleClick = (indexInView) => {
    if (indexInView === visibleCount - 1 && startIndex + visibleCount < successStories.length) {
      setStartIndex(startIndex + 3);
    }
    if (indexInView === 0 && startIndex > 0) {
      setStartIndex(startIndex - 3);
    }
  };

  const visibleStories = successStories.slice(startIndex, startIndex + visibleCount);*/}



// ================== SUCCESS STORIES LOGIC ==================
const handleClick = (indexInView) => {
  if (
    indexInView === visibleCount - 1 &&
    startIndex + visibleCount < successStories.length
  ) {
    setStartIndex(startIndex + 3);
  }

  if (indexInView === 0 && startIndex > 0) {
    setStartIndex(startIndex - 3);
  }
};

const visibleStories = successStories.slice(
  startIndex,
  startIndex + visibleCount
);




  // ================== LOADING SAFETY ==================
if (!hero || !about || !whyChoose || !howSection) {
  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      <h2>Loading.......</h2>
     
    </div>
  );
}

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${BASE_URL}/media/hero/hero.png)` }}
      >
        <div className="overlay"></div>
        <div className="hero-content">
          <div className="text-box">
            <h1>{hero.title}</h1>
            <p>{hero.description}</p>
          </div>
          <div className="hero-buttons">
             <button
        className="primary-btn"
        onClick={() => navigate("/courses")}
      >
        View Training Program
      </button>
            <button className="secondary-btn"
             onClick={() => navigate("/contact")}>Free Consultation</button>
          </div>
        </div>
      </section>

      {/* ================= STATS BOX ================= */}
      <div className="stats-box">
        <div>
          <h3>8+</h3>
          <p>Years of Excellence</p>
        </div>
        <div>
          <h3>5000+</h3>
          <p>Students Trained</p>
        </div>
        <div>
          <h3>85%</h3>
          <p>Placement Rate</p>
        </div>
        <div>
          <h3>4.8/5</h3>
          <p>Student Satisfaction</p>
        </div>
      </div>

      {/* ================= ABOUT SECTION ================= */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-image-wrapper">
            <img src={about.about_image} alt="About" className="about-image" />
            <div className="overlay-card">
              <h3>Established in {about.established_year}</h3>
              <p>{about.established_description}</p>
            </div>
          </div>
          <div className="about-content">
            <h4>{about.title}</h4>
            <p>{about.description}</p>
            <button className="learn-btn"
           onClick={() => navigate("/about")} >Learn More</button>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= *
      <section className="why-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 text-center mb-4 mb-md-0">
              {whyChoose.left_image && (
                <img src={whyChoose.left_image} alt="Why Choose Us" className="img-fluid rounded" />
              )}
            </div>
            <div className="col-md-8">
              <h2 className="mb-4">{whyChoose.heading || "Why Choose Us"}</h2>
              {whyChoose.items?.map((item, index) => (
                <div className="d-flex align-items-center mb-3 why-card" key={index}>
                  <div className="icon me-3">
                    <img src={item.icon_url} alt={item.title} className="img-fluid" />
                  </div>
                  <div className="content">
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-0">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>




          {/* ================= ECOSYSTEM SECTION ================= */}
        {ecosystemed && (
          <div className="ecos-section">

            {/* LEFT IMAGE */}
            <div className="ecos-left">
              <img
                src={`${BASE_URL}${ecosystemed.left_image}`}
                alt="Ecosystem Character"
              />
            </div>

            {/* CENTER CIRCLE */}
            <div className="ecos-center">
              <div className="ecos-circle">
                <h2>{ecosystemed.center_text}</h2>
              </div>
            </div>

            {/* RIGHT CARDS */}
            <div className="ecos-right">
              {ecosystemed.items.map((item, index) => (
                <div className="ecos-card" key={index}>

                  <img
                    src={`${BASE_URL}${item.logo}`}
                    alt={item.name}
                  />

                  <div className="ecos-card-content">
                    <h3>{item.name}</h3>
                    
                    <p><span className="eco-tick">✔</span> {item.point1}</p>


                  </div>

                  {item.site_link && (
                    <a
                      href={item.site_link}
                      target="_blank"
                      rel="noreferrer"
                      className="eco-link"
                    >
                      Site ↗
                    </a>
                  )}

                </div>
               ))}
        </div>
      </div>
    )}









      {/* ================= HOW IT WORKS ========= */}
      <section className="how-wrapper container py-5">
        <h2 className="main-title">{howSection.title}</h2>
        <p className="sub-title">{howSection.subtitle}</p>
        <div className="flow-path"></div>
        {howSection.student_image && (
          <img src={howSection.student_image} alt="Student" className="student-img" />
        )}
        <div className="row g-4 mt-4">
          {howSteps.map((step) => (
            <div className="col-xl-3 col-lg-6 col-md-6 col-12" key={step.id}>
              <div className="step-card" style={{ background: step.card_bg_color }}>
                {step.icon_image && <img src={step.icon_image} alt={step.title} className="step-icon" />}
                <div className="step-number">{step.step_number}</div>
                <h5>{step.title}</h5>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>










      {/* ================= FEATURED COURSES ================= */}
      <section className="featured-wrapper container py-5">
        <h2 className="featured-title">Featured Courses</h2>
        <p className="featured-sub">
          Choose from our most popular industry-aligned programs
        </p>
        <div className="row g-4 mt-4">
          {courses.map(course => (
            <div className="col-lg-4 col-md-6 col-12" key={course.id}>
              <div className="course-card">
                <img src={course.image} className="course-image" alt={course.title} />
                <div className="course-body">
                  <h4 className="course-title">{course.title}</h4>
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
                    <button className="btn-outline-custom"
                  onClick={() => navigate(`/course/${course.id}`)}  >View Details</button>
                    <button className="btn-primary-custom"
                    onClick={() => setShowModal(true)}>Enroll Now</button>
                  </div>

                </div>
               
              </div>
              
            </div>
      
          ))}

           {/* ENROLL MODAL */}
      {showModal && (
        <EnrollModal
          courseTitle={course.title}
          onClose={() => setShowModal(false)}
        />
      )}
        </div>
      </section>

    


       <div className="button-container">
  <button className="btn-outline-custom"
  onClick={() => navigate("/courses")}
  >View Details</button>
</div>

      {/* ================= STUDENT PROJECTS ================= */}
     
    
 

{/*carousel*/}
{projects.length >= 3 && (
  <section className="projects-section">
    <h2 className="projects-title">Students Success Projects</h2>
    <p className="projects-sub">
      See what our students have built and achieved
    </p>

    <div className="fixed-carousel">

      {/* LEFT CARD */}
      <div
        className="carousel-card left"
        onClick={() =>
          setCenterIndex(
            (centerIndex - 1 + projects.length) % projects.length
          )
        }
      >
        <img
          src={`${BASE_URL}${
            projects[(centerIndex - 1 + projects.length) % projects.length]
              .image
          }`}
          alt=""
        />
        <div className="project-info">
          <h5>
            {
              projects[
                (centerIndex - 1 + projects.length) % projects.length
              ].title
            }
          </h5>
          <span className="student-role">
            {
              projects[
                (centerIndex - 1 + projects.length) % projects.length
              ].category
            }
          </span>
          <p className="student-name">
            {
              projects[
                (centerIndex - 1 + projects.length) % projects.length
              ].student_name
            }
          </p>
        </div>
      </div>

      {/* CENTER CARD */}
      <div className="carousel-card center">
        <img
          src={`${BASE_URL}${projects[centerIndex].image}`}
          alt=""
        />
        <div className="project-info">
          <div className="top-row">
          <h5>{projects[centerIndex].title}</h5>
          <span className="student-role">
            {projects[centerIndex].category}
          </span>
          <p className="student-name">
            {projects[centerIndex].student_name}
          </p>
          </div>
        </div>
      </div>

      {/* RIGHT CARD */}
      <div
        className="carousel-card right"
        onClick={() =>
          setCenterIndex(
            (centerIndex + 1) % projects.length
          )
        }
      >
        <img
          src={`${BASE_URL}${
            projects[(centerIndex + 1) % projects.length].image
          }`}
          alt=""
        />
        <div className="project-info">
          <h5>
            {projects[(centerIndex + 1) % projects.length].title}
          </h5>
          <span className="student-role">
            {projects[(centerIndex + 1) % projects.length].category}
          </span>
          <p className="student-name">
            {projects[(centerIndex + 1) % projects.length].student_name}
          </p>
        </div>
      </div>

    </div>
    <button className="showcase-btn"onClick={() => navigate("/about")}> View Showcase</button>
  </section>
)
}




      {/* ================= SUCCESS STORIES ================= 
      {successStories.length > 0 && (
        <section className="container py-5">
          <h2 className="mb-2">Stories from Our Successful Learners</h2>
          <p className="text-muted">
            Real stories from real students who transformed their careers
          </p>
          <div className="success-slider d-flex gap-3 mt-4">
            {visibleStories.map((story, index) => (
              <div
                key={story.id}
                className="success-card position-relative"
                onClick={() => handleClick(index)}
                style={{ cursor: "pointer", flex: "0 0 18%" }}
              >
                <img src={story.image} alt={story.name} className="img-fluid rounded" />
                <div className="success-overlay p-2 text-center">
                  <h6 className="mb-1">{story.name}</h6>
                  <p className="mb-0 small">{story.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}*/}


{/* ================= SUCCESS STORIES ================= */}
{successStories.length > 0 && (
  <section className="container py-5 success-section">
    <h4 className="mb-2 fw-semibold">Stories from Our Successful Learners</h4>
    <p className="text">
      Real stories from real students who transformed their careers
    </p>

    <div className="success-slider-wrapper">
      <div
        className="success-slider"
        style={{
          transform: `translateX(-${startIndex * 260}px)`,
        }}
      >
        {successStories.map((story, index) => (
          <div
            key={story.id}
            className="success-card"
            onClick={() => handleClick(index - startIndex)}
          >
            <img src={story.image} alt={story.name} />

            {/* ▶ Video Icon */}
<div
  className="play-icon"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("CLICK WORKING"); // debug
    openModal(story,index);
  }}
>
  ▶
</div>
            {/* Overlay */}    
            <div className="success-overlay">
              <h6>{story.name}</h6>
              <p>{story.role}</p>
            </div>
          </div>
  ))}
            </div>
          </div>

      
      




        
    
           
     </section>
)}



{modalOpen && (
  <div className="modal-overlay">
    <div className="modal-box">
      
      {/* Close */}
      <span className="close-btn" onClick={closeModal}>✕</span>
 {selectedStory.images?.length > 0 ? (
        <img
          src={selectedStory.images[currentIndex]?.image}
          alt="story"
          style={{ width: "100%" }}
        />
      ) : (
        <p>No images available</p>
      )}

      {/* Image *
 <img
  src={selectedStory?.image}
  alt={selectedStory?.name}
  onError={(e) => {
    console.log("IMAGE ERROR:", selectedStory?.image);
    e.target.style.display = "none";
  }}
/>*/}

      {/* Bottom Controls */}
      <div className="modal-controls">
        <button
          className="play-btn"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  </div>
)}




<div className="careers-card">
      <div className="careers-card-left">
{men && (
  <img
    src={men.image}
    alt={men.name || "Career Men"}
  />
)}
      </div>
      <div className="careers-card-right">
  <h2>Start your Learning Journey today !</h2>
  <div className="p-btns-wrapper">
    <p>
      Get expert guidance,structured training,and 
      real-world skills that prepare you for career success.
    </p>
    <button onClick={() => navigate("/contact")}>Get Free Consultation </button>
  </div>
</div>
    </div>


    </>
  );
};

export default Home;
