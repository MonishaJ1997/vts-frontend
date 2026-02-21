// <-- MUST have default export
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";
import Impact from "./Impact";
const About = () => {
  const [aboutImage, setAboutImage] = useState(null);
  const [mvData, setMvData] = useState([]);
  const [ecosystem, setEcosystem] = useState(null);
  const [cards, setCards] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [items, setItems] = useState([]);
  const [person, setPerson] = useState(null);






  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    // ================= ABOUT IMAGE =================
    axios.get(`${BASE_URL}/api/about-image/`)
      .then(res => {
        setAboutImage(res.data.image);
      })
      .catch(err => console.log(err));

    // ================= MISSION & VISION =================
    axios.get(`${BASE_URL}/api/mission-vision/`)
      .then(res => {
        setMvData(res.data);
      })
      .catch(err => console.log(err));

    // ================= ECOSYSTEM =================
    axios.get(`${BASE_URL}/api/ecosystem/`)
      .then(res => {
        setEcosystem(res.data);
      })
      .catch(err => console.log(err));

 axios.get(`${BASE_URL}/api/value-cards/`)
      .then(res => setCards(res.data))
      .catch(err => console.log(err));

axios.get(`${BASE_URL}/api/training-steps/`)
      .then(res => setSteps(res.data))
      .catch(err => console.log(err));

axios.get(`${BASE_URL}/api/who-can-join/`)
      .then(res => setItems(res.data))
      .catch(err => console.error(err));


 axios
      .get(`${BASE_URL}/api/career-person/`)
      .then((res) => {
        if (res.data.length > 0) setPerson(res.data[0]); // first person only
      })
      .catch((err) => console.log(err));




  }, []);
// currentStep state is already defined
useEffect(() => {
  if (steps.length === 0) return;

  const timer = setInterval(() => {
    setCurrentStep(prev => (prev + 1) % steps.length); // loop continuously
  }, 1000); // 1s per step

  return () => clearInterval(timer);
}, [steps]);


  const mission = mvData.find(item => item.type === "mission");
  const vision = mvData.find(item => item.type === "vision");

  return (
    <section className="about-container">
      <div className="about-content">

        {/* ================= ABOUT SECTION ================= */}
        <h2>About VTS</h2>

        <p className="subtitle">
          Empowering the next generation of IT Professionals with foundational knowledge and industry-ready skills
        </p>

        <div className="about-flex">

          <div className="about-text">
            <h3>Our Story</h3>
            <p>
              VTS was founded with a simple observation — many learners struggle
              to enter the IT industry not due to lack of talent, but because
              they lack practical exposure, confidence, and guided direction.
            </p>
            <p>
              We built Vetri Technology Solutions to bridge this gap through
              structured training, real-time collaboration, and a strong learning ecosystem.
            </p>
          </div>

          <div className="about-image">
            {aboutImage && (
              <img
                src={
                  aboutImage.startsWith("http")
                    ? aboutImage
                    : `${BASE_URL}${aboutImage}`
                }
                alt="About VTS"
              />
            )}
          </div>

        </div>


        {/* ================= MISSION & VISION ================= */}
        <div className="mv-section">
          <div className="mv-wrapper">

            {/* Mission */}
            <div className="mv-outer">
              <div className="mv-card">
                
               {mission && ( <img src={mission.icon} alt="Mission" className="mv-icon" /> )}
                <h3>Mission</h3>
                <p>
                  To provide IT training that helps learners develop technical skills,
                  confidence, and readiness for real-world career opportunities.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="mv-outer">
              <div className="mv-card">
                {vision && ( <img src={vision.icon} alt="Vision" className="mv-icon" /> )}
                <h3>Vision</h3>
                <p>
                  To create a learning platform that supports students and beginners
                  in building strong IT knowledge and growing towards successful
                  professional careers.
                </p>
              </div>
            </div>

          </div>
        </div>


        {/* ================= ECOSYSTEM SECTION ================= */}
        {ecosystem && (
          <div className="eco-section">

            {/* LEFT IMAGE */}
            <div className="eco-left">
              <img
                src={`${BASE_URL}${ecosystem.left_image}`}
                alt="Ecosystem Character"
              />
            </div>

            {/* CENTER CIRCLE */}
            <div className="eco-center">
              <div className="eco-circle">
                <h2>{ecosystem.center_text}</h2>
              </div>
            </div>

            {/* RIGHT CARDS */}
            <div className="eco-right">
              {ecosystem.items.map((item, index) => (
                <div className="eco-card" key={index}>

                  <img
                    src={`${BASE_URL}${item.logo}`}
                    alt={item.name}
                  />

                  <div className="eco-card-content">
                    <h3>{item.name}</h3>
                    
                    <p><span className="eco-tick">✔</span> {item.point1}</p>
<p><span className="eco-tick">✔</span> {item.point2}</p>

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




{/* ================= VALUE DRIVEN SECTION ================= */}
        <div className="value-section">

          <h3 className="value-heading">
            Our Value-Driven Training Approach
          </h3>

          <div className="value-container">

            <div className="value-card">
              <p>
                At VTS, we believe quality education should be accessible without
                compromise. Our programs are thoughtfully structured to support
                learners from diverse backgrounds, including those with career gaps.
                We focus on skills, growth, and readiness — not on past timelines.
              </p>
            </div>

            <div className="value-card">
              <p>
                Our training fees remain affordable because we operate as part of
                a strong ecosystem, not as a standalone institute. We never
                compromise on quality, mentorship, or learning outcomes.
              </p>
            </div>

          </div>

        </div>

          


   {/* ================= VALUE CARDS ================= */}
        <div className="values-section">
          <h3 className="values-heading">How we Shape Your Skills</h3>
          <div className="values-container">
            {cards.map(card => (
              <div key={card.id} className="values-card">
               <img
  src={`${BASE_URL}${card.icon}`}
  alt={card.title}
  className="card-icon"
/>
                <h3>{card.title}</h3>
                <ul>
  {card.bullets.points.map((bullet, index) => (
    <li key={index}>{bullet}</li>
  ))}
</ul>
                <div className="card-bottom-tray"></div>
              </div>
            ))}
          </div>
        </div>
    

{/*training*/}

{/* ================= TRAINING JOURNEY ================= *






<div className="training-journey-container">
  <h3>{steps.length > 0 && steps[0].journey_name}</h3>

  {/* Top row: 1 → 2 → 3 *
  <div className="training-row">
    {steps.slice(0, 3).map((step, index) => {
      const isVisible = currentStep >= index;
      return (
        <React.Fragment key={step.id}>
          <div className={`step ${isVisible ? "visible" : ""}`}>
            <img src={`${BASE_URL}${step.image}`} alt={step.title} />
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>

          {index < 2 && (
            <div className={`arrow arrow-right ${isVisible ? "visible" : ""}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>

  {/* Center vertical arrow (BETWEEN 3 & 5) *
  <div className={`arrow-vertical-wrapper ${currentStep >= 2 ? "visible" : ""}`}>
    <div className="arrow-down"></div>
  </div>

  {/* Bottom row: 4 ← 5 ← 6 *
  <div className="training-row reverse-row">
    {steps.slice(3, 6).map((step, i) => {
      const index = i + 3;
      const isVisible = currentStep >= index;
      return (
        <React.Fragment key={step.id}>
          <div className={`step ${isVisible ? "visible" : ""}`}>
            <img src={`${BASE_URL}${step.image}`} alt={step.title} />
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>

          {i < 2 && (
            <div className={`arrow arrow-left ${isVisible ? "visible" : ""}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
</div>
*/}






<div className="training-journey-container">
  <h4>{steps.length > 0 && steps[0]["journey_name"]}</h4>
  {/* ================= TOP ROW (1 → 2 → 3) ================= */}
  <div className="top-row-wrapper">
    <div className="training-row">
      {steps.slice(0, 3).map((step, index) => {
        const isVisible = currentStep >= index;
        return (
          <React.Fragment key={step.id}>
            <div className={`step ${isVisible ? "visible" : ""}`}>
              <img src={`${BASE_URL}${step.image}`} alt={step.title} />
              <h6>{step.title}</h6>
              <p>{step.description}</p>
            </div>

            {index < 2 && (
              <div className={`arrow arrow-right ${isVisible ? "visible" : ""}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>

    {/* ⬇️ Vertical arrow exactly under STEP 3 */}
    <div className={`arrow-down step3-arrow ${currentStep >= 2 ? "visible" : ""}`} />
  </div>

  {/* ================= BOTTOM ROW (4 ← 5 ← 6) ================= */}
  <div className="training-row reverse-row">
    {steps.slice(3, 6).map((step, i) => {
      const index = i + 3;
      const isVisible = currentStep >= index;
      return (
        <React.Fragment key={step.id}>
          <div className={`step ${isVisible ? "visible" : ""}`}>
            <img src={`${BASE_URL}${step.image}`} alt={step.title} />
            <h6>{step.title}</h6>
            <p>{step.description}</p>
          </div>

          {i < 2 && (
            <div className={`arrow arrow-left ${isVisible ? "visible" : ""}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
</div>


{/*who can join*

 <div className="who-can-join">
      <h2>Who Can Join</h2>
      <div className="who-can-join-container">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className={`hex-wrapper ${item.color}`}
          >
            <div className="hex">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="hex-name">{item.name}</div>
          </div>
        ))}
      </div>
    </div>*/}




    <div className="who-can-join">
  <h2>Who Can Join</h2>

  <div className="who-grid">
    {items.map((item) => (
      <div key={item.id} className={`join-item ${item.color}`}>
        
       {/* <div className="hex">
          <div className="hex-inner">
            <img src={item.image} alt={item.name} />
          </div>
        </div>

        <div className="pill">
          <span>{item.name}</span>
          <div className="pill-cap"></div>
        </div>

      </div>*/}


<div className={`join-item ${item.color}`}>
  <div className="hex">
    <div className="hex-inner">
      <img src={item.image} />
    </div>
  </div>

  <div className="pill">
    <span>{item.name}</span>
  </div>
</div>

</div>

    ))}
  </div>
</div>





<Impact />
  


<div className="career-card">
      <div className="career-card-left">
{person && (
  <img
    src={person.image}
    alt={person.name || "Career Person"}
  />
)}
      </div>
      <div className="career-card-right">
  <h2>Ready to Start Your Career</h2>
  <div className="p-btn-wrapper">
    <p>
      Direct placement support and interview opportunities at our
      integrated IT startup ecosystem. Start your career with confidence!
    </p>
    <button>Get Free Consultation Now</button>
  </div>
</div>
    </div>
  






</div>

    </section>
  );
};





export default About;


  
