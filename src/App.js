import React, { useState } from "react";
import WelcomePage from "./pages/WelcomePage";
import LandingPage from "./pages/LandingPage";
import "./App.css";

function App() {
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  return (
    <div className="app">
      <div className={`welcome-container ${welcomeComplete ? "slide-up" : ""}`}>
        <WelcomePage onAnimationComplete={() => setWelcomeComplete(true)} />
      </div>
      <LandingPage />
    </div>
  );
}

export default App;

