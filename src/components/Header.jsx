import "./Header.css";
import { FaEnvelope, FaPhoneAlt, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import EnrollModal from "./EnrollModal";


// adjust path if it's in another folder
const Header = () => {
  const BASE_URL = "http://127.0.0.1:8000";
  const [logo, setLogo] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [query, setQuery] = useState(""); // Search state
  const navigate = useNavigate();
 const [showModal, setShowModal] = useState(false);
  // ================= Announcement Animation =================
  const fullText = "India’s First IT Training Institute with 100% placement 👍";
  const words = fullText.split(" ");
  const [displayedWords, setDisplayedWords] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);
const course = { title: "React Course" };
  useEffect(() => {
    // Fetch logo
    axios
      .get(`${BASE_URL}/logo/`)
      .then((res) => setLogo(res.data.logo))
      .catch((err) => console.error("Error fetching logo:", err));

    // Announcement word-by-word loop animation
    const interval = setInterval(() => {
      setDisplayedWords(words.slice(0, wordIndex + 1));

      if (wordIndex < words.length - 1) {
        setWordIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setWordIndex(0);
          setDisplayedWords([]);
        }, 1000);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [wordIndex]);

  // ================= Handle Search =================
  const handleSearch = (e) => {
  e.preventDefault();
  if (!query.trim()) return;

  const lowerQuery = query.trim().toLowerCase();

  // Define keyword lists for each page
  const coursesKeywords = ["course", "courses", "python", "react", "full stack", "java", "node", "web development","software","backend","ui/ux","data science","frontend course"];
  const aboutKeywords = ["about", "about us", "who we are"];
  const contactKeywords = ["contact", "contact us", "reach"];

  // Check which page the query matches
  if (coursesKeywords.some((kw) => lowerQuery.includes(kw))) {
    navigate("/courses");
  } else if (aboutKeywords.some((kw) => lowerQuery.includes(kw))) {
    navigate("/about");
  } else if (contactKeywords.some((kw) => lowerQuery.includes(kw))) {
    navigate("/contact");
  } else if (lowerQuery.includes("home")) {
    navigate("/");
  } else {
    alert(`No page found for "${query}"`);
  }

  setQuery(""); // clear input
  if (menuOpen) setMenuOpen(false); // close mobile menu on mobile
};
  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-left">
          Welcome to <span>VETRI TECHNOLOGY SOLUTIONS</span>
        </div>
        <div className="top-right">
          <FaEnvelope className="icon red" /> vetritechnologysolution@gmail.com
          <FaPhoneAlt className="icon red phone-icon" /> 8435858527
        </div>
      </div>

      {/* Announcement */}
      <div className="announcement">
        {displayedWords.join(" ")}
        <span className="cursor">|</span>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-left">
            <div className="logo">
              {logo && <img src={`${BASE_URL}${logo}`} alt="Company Logo" />}
            </div>

            {/* ===== Search Box ===== */}
            <form className="search-box" onSubmit={handleSearch}>
              <FaSearch className="search-icon" onClick={handleSearch} />
              <input
                type="text"
                placeholder="Search here"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>

          {/* Hamburger Toggle *
          <div className="menu-toggler" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

          {/* Nav Links *

      
          <div className={`nav-right ${menuOpen ? "active" : ""}`}>
            <ul className="nav-links">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/courses"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <button className="enroll-btn">Enroll Now</button>
          </div>*/}

<div className="menu-toggler" onClick={() => setMenuOpen(!menuOpen)}>
  {menuOpen ? <FaTimes /> : <FaBars />}
</div>

<div className={`nav-right ${menuOpen ? "active" : ""}`}>
  <ul className="nav-links">
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/courses">Courses</NavLink></li>
    <li><NavLink to="/about">About Us</NavLink></li>
    <li><NavLink to="/contact">Contact Us</NavLink></li>
  </ul>
  <button className="enroll-btns" onClick={() => setShowModal(true)}>
              Enroll Now
            </button>
</div>




        </div>
      </nav>
  


 {/* ENROLL MODAL */}
      {showModal && (
        <EnrollModal
          courseTitle={course.title}
          onClose={() => setShowModal(false)}
        />
      )}

     
     </>


  );
};







export default Header;