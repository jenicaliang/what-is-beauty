// StarsContainer.jsx
import React, { useState } from "react";
import StarsSection from "./StarsSection";
import "./StarsContainer.css";

export default function StarsContainer() {
  const [showStars, setShowStars] = useState(false);

  return (
    <div className="stars-frame">
      {/* Button */}
      {!showStars && (
        <div className="stars-button">
                <p>—like twinkling stars.</p>
          <button
            className="show-stars-button"
            onClick={() => setShowStars(true)}
          >
            Click to illuminate the night
          </button>
        </div>
      )}

      {/* Stars fade in */}
      <div className={`stars-fade-wrapper ${showStars ? "fade-in" : ""}`}>
        {showStars && <StarsSection />}
      </div>
    </div>
  );
}
