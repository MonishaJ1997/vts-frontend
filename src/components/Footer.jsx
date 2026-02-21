import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Footer.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
const Footer = () => {
  const [logo, setLogo] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/footer-logo/")
      .then((res) => {
        setLogo(res.data.logo);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Logo + Address */}
        <div className="footer-col">
          {logo && (
            <img
              src={`http://127.0.0.1:8000${logo}`}
              alt="logo"
              className="footer-logo"
            />
          )}
          <h4>Address</h4>
          <p>
            SURANDAI BUS STAND BACKSIDE, SURANDAI <br />
            TENKASI-627 859
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Courses</p>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h4>Support</h4>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>

        {/* Network */}
        <div className="footer-col">
          <h4>Our Network</h4>
          <p>Vetri Technology Solution (VTS)</p>
          <p>Vetri IT System (VIS)</p>
          <p>Vetri Consultancy Services (VCS)</p>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Get In Touch</h4>
          <p>Call: +91 - 8438558527</p>
          <p>Email: vetritechnologysolution@gmail.com</p>

          <h4>Follow Us</h4>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;