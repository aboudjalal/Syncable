import React, { useEffect, useState } from "react";
import "../styles/WelcomePage.css";

function WelcomePage({ onAnimationComplete }) {
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    // Trigger slide-up animation and notify parent after animation ends
    const timer = setTimeout(() => {
      setSlideUp(true); // Start slide-up animation
      setTimeout(() => {
        onAnimationComplete(); // Notify parent to render landing page
      }, 1000); // Match the duration of the slide-up animation
    }, 4500); // Wait for typing animation to finish

    return () => clearTimeout(timer); // Cleanup timeout
  }, [onAnimationComplete]);

  return (
    <div className={`welcome-page ${slideUp ? "slide-up" : ""}`}>
      <div className="content">
        <div className="logo">
          <img src="/images/Syncable.png" alt="Logo" />
        </div>
        <div className="typing">
          {/* <span>y</span> */}
          <span className="typing-text">yncable </span>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
