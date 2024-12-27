import React from "react";
import "../styles/FileSelection.css";


const FileSelection = ({ setUploadedFile, setDragActive }) => {
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
      className="landing-drop-circle"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div>
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
