import React, { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import SignIn from "./SignIn";
import Scanner from "./Scanner";
import FileSelection from "./FileSelection";
import "../styles/LandingPage.css";

function LandingPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [parsedTimetable, setParsedTimetable] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [user, setUser] = useState(null);
  const [instructionPopupOpen, setInstructionPopupOpen] = useState(true);
  const [popupSlide, setPopupSlide] = useState(0);

  const toggleInstructionPopup = () => {
    setInstructionPopupOpen(!instructionPopupOpen);
    setPopupSlide(0); // Reset slide index
  };

  const nextInstructionSlide = () => {
    setPopupSlide((prev) => prev + 1);
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  const responseGoogle = (response) => {
    console.log(response);
  }

  const responseError = error => {
    console.log(error);
  }


  return (
    <div className="landing-page">
      {/* Google Sign-In */}
      {!user && (
  <div className="google-signin-button">
    <GoogleLogin
    clientId="504368072713-nk756200d5di97f74ditmi9ejdmimv5i.apps.googleusercontent.com"
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  resposeType="code"
  accessType="offline"
  scope='openid email profile https://www.googleapis.com/auth/calendar'
    />
  </div>
)}


      {user && (
        <div className="user-info">
          <img src={user.picture} alt={user.name} className="user-picture" />
          <p>Welcome, {user.name}</p>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      )}

      {/* Welcome Section */}
      <div className="landing-content">
        <h1 className="landing-welcome-text">
          <span>Welcome to </span>
          <img
            src="/images/Syncable.png"
            alt="Syncable Logo"
            className="landing-inline-logo"
          />
          {" yncable"}.
        </h1>
        <FileSelection setUploadedFile={setUploadedFile} setDragActive={setDragActive} />
      </div>

      {/* Scanner */}
      {uploadedFile && (
        <Scanner
          file={uploadedFile}
          setExtractedText={setExtractedText}
          setParsedTimetable={setParsedTimetable}
          setIsProcessing={setIsProcessing}
        />
      )}

      {isProcessing && <p>Processing your file...</p>}
      {parsedTimetable.length > 0 && (
        <ul>
          {parsedTimetable.map((entry, index) => (
            <li key={index}>
              {entry.time} - {entry.course} ({entry.details})
            </li>
          ))}
        </ul>
      )}

      {/* Question Mark Button */}
      <button className="landing-question-mark" onClick={toggleInstructionPopup}>
        ?
      </button>

      {/* Popup */}
      {instructionPopupOpen && (
        <div className={`landing-popup ${instructionPopupOpen ? "open" : ""}`}>
          <div className="landing-popup-content">
            {popupSlide === 0 ? (
              <>
                <h2 className="popup-title">Updating your calendar just got easier.</h2>
                <ul className="popup-list">
                  <li>
                    <span role="img" aria-label="upload">
                      📤
                    </span>{" "}
                    Upload your timetable.
                  </li>
                  <li>
                    <span role="img" aria-label="scan">
                      🧾
                    </span>{" "}
                    We’ll scan and extract your schedule.
                  </li>
                  <li>
                    <span role="img" aria-label="sync">
                      📅
                    </span>{" "}
                    Sync it seamlessly with Google Calendar (and soon, Apple & Notion).
                  </li>
                </ul>
                <p className="popup-tip">Sit back and relax – we'll handle the rest!</p>
                <button onClick={nextInstructionSlide} className="popup-button">
                  How it works <span role="img" aria-label="arrow">➡️</span>
                </button>
              </>
            ) : (
              <>
                <h2 className="popup-title">How It Works</h2>
                <ol className="popup-steps">
                  <li>
                    <span role="img" aria-label="drag">🖱️</span> Drag and drop or upload your timetable image.
                  </li>
                  <li>
                    <span role="img" aria-label="extract">🔍</span> Syncable scans and extracts all your class details.
                  </li>
                  <li>
                    <span role="img" aria-label="edit">✏️</span> Edit and confirm any information.
                  </li>
                  <li>
                    <span role="img" aria-label="done">🎉</span> Your classes are instantly added to your calendar!
                  </li>
                </ol>
                <p className="popup-tip">Have fun scheduling!</p>
                <button onClick={toggleInstructionPopup} className="popup-button">
                  Let’s go!
                </button>
              </>
            )}

            <div className="popup-dots">
              <span className={`dot ${popupSlide === 1 ? "active" : ""}`}></span>
              <span className={`dot ${popupSlide === 0 ? "active" : ""}`}></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
