import React from "react";
import "./Impact.css";

const Impact = () => {
  const impactData = [
    { value: "8+", label: "Years of Excellence" },
    { value: "5000+", label: "Students Trained" },
    { value: "85%", label: "Placement Rate" },
    { value: "4.8/5", label: "Student Satisfaction" },
  ];

  return (
    <section className="impact-section">
      <h2 className="impact-heading">Our Impact</h2>
      <div className="impact-container">
        {impactData.map((item, index) => (
          <div key={index} className="impact-card">
            <h3 className="impact-value">{item.value}</h3>
            <p className="impact-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Impact;