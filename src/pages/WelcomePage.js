import React, { useEffect, useState } from "react";
import "../styles/WelcomePage.css";

// THIS PAGE IS THE LOADING PAGE

function WelcomePage({ onAnimationComplete }) {
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideUp(true);
      setTimeout(() => {
        onAnimationComplete();
      }, 1000);
    }, 4500);

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <div className={`welcome-page ${slideUp ? "slide-up" : ""}`}>
      <div className="content">
        {/* Wrap logo and text in a flex container */}
        <div className="logo-text-container">
          <div className="logo">
            <img src="/images/Syncable.png" alt="Logo" />
          </div>
          <div className="typing">
            <span className="letter"></span>
            <span className="typing-text">yncable</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
