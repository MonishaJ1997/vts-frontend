import React from "react";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-wrapper">
        <h1 className="privacy-title">Privacy Policy</h1>

        <p className="privacy-text">
          Your privacy is important to us. This Privacy Policy explains how we collect,
          use, and protect your information when you use our website and services.
        </p>

        <h2>1. Information We Collect</h2>
        <p className="privacy-text">
          We may collect personal information such as your name, email address,
          phone number, and other details when you fill forms or interact with our services.
        </p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To provide and improve our services</li>
          <li>To respond to your inquiries</li>
          <li>To send important updates</li>
          <li>To improve user experience</li>
        </ul>

        <h2>3. Data Protection</h2>
        <p className="privacy-text">
          We implement security measures to protect your personal data from unauthorized
          access, misuse, or disclosure.
        </p>

        <h2>4. Cookies</h2>
        <p className="privacy-text">
          We use cookies to enhance your browsing experience and analyze website traffic.
        </p>

        <h2>5. Third-Party Services</h2>
        <p className="privacy-text">
          We may use third-party services for analytics and functionality. These services
          have their own privacy policies.
        </p>

        <h2>6. Your Rights</h2>
        <p className="privacy-text">
          You have the right to access, update, or delete your personal information by
          contacting us.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p className="privacy-text">
          We may update this Privacy Policy from time to time. Please review it periodically.
        </p>

        <h2>8. Contact Us</h2>
        <p className="privacy-text">
          If you have any questions about this Privacy Policy, contact us through our website.
        </p>
      </div>
    </div>
  );
};

export default Privacy;