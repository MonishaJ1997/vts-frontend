import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SuccessStories.css";

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/success-stories/")
      .then(res => setStories(res.data))
      .catch(err => console.log(err));
  }, []);

  const visibleStories = stories.slice(startIndex, startIndex + 5);

  const handleClick = (index) => {
    const actualIndex = startIndex + index;

    // Move Right
    if (index === 4 && startIndex + 5 < stories.length) {
      setStartIndex(startIndex + 3);
    }

    // Move Left
    if (index === 0 && startIndex !== 0) {
      setStartIndex(startIndex - 3);
    }
  };

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container">
        <h2 className="fw-bold mb-2">Stories from Our Successful Learners</h2>
        <p className="text-muted mb-4">
          Real stories from real students who transformed their careers
        </p>

        <div className="d-flex justify-content-between overflow-hidden">
          {visibleStories.map((story, index) => (
            <div
              key={story.id}
              className="story-card position-relative"
              onClick={() => handleClick(index)}
            >
              <img
                src={story.image}
                alt={story.name}
                className="img-fluid rounded"
              />

              <div className="overlay">
                <h5>{story.name}</h5>
                <p>{story.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
