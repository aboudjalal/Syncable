import React, { useState } from "react";
import "../styles/FileSelection.css";

// THIS COMPONENT HANDLES THE FILE SELECTION AND DRAG AND DROP

const FileSelection = ({ setUploadedFile }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

  return (
    <div
      className={`landing-drop-circle ${dragActive ? "drag-active" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragActive && <div className="drag-overlay">Drop files here</div>}
      <div className="content">
        <p>Drop Timetable Here.</p>
        <p className="pdf-text">(pdf, jpeg, or png)</p>
        <p>or</p>
        <label htmlFor="fileInput" className="select-file">
          Select File
        </label>
      </div>
      <input id="fileInput" type="file" style={{ display: "none" }} onChange={handleFileSelect} />
    </div>
  );
};

export default FileSelection;
