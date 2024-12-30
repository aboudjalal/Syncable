import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import "../styles/Scanner.css";

const Scanner = ({ file, setExtractedText, setParsedTimetable, setIsProcessing }) => {
  const [popupText, setPopupText] = useState("");

  const parseTimetable = (rawText) => {
    const timetable = [];
    const rows = rawText.split("\n");
    const timePattern = /\d{1,2}:\d{2}\s*-\s*\d{1,2}:\d{2}/;
    const coursePattern = /[A-Z]{2,}\s\d{4}\.\d*/;

    rows.forEach((row) => {
      const timeMatch = row.match(timePattern);
      const courseMatch = row.match(coursePattern);

      if (timeMatch && courseMatch) {
        timetable.push({
          time: timeMatch[0].trim(),
          course: courseMatch[0].trim(),
          details: row.replace(timeMatch[0], "").replace(courseMatch[0], "").trim(),
        });
      }
    });

    return timetable;
  };

  const processImage = () => {
    setIsProcessing(true);

    Tesseract.recognize(file, "eng")
      .then(({ data: { text } }) => {
        setExtractedText(text);
        const structuredData = parseTimetable(text);
        setParsedTimetable(structuredData);
        setPopupText(text); // Set text for the popup
        setIsProcessing(false);
      })
      .catch((error) => {
        console.error("Error reading image:", error);
        setExtractedText("Failed to extract text from the image.");
        setParsedTimetable([]);
        setPopupText("Failed to extract text from the image."); // Set error text for the popup
        setIsProcessing(false);
      });
  };

  useEffect(() => {
    if (file) {
      processImage();
    }
  }, [file]);

  return (
    <div>
      {popupText && (
        <>
          <div className="popup-overlay" onClick={() => setPopupText("")}></div>
          <div className="popup">
            <div className="popup-content">
              <h2>Extracted Text</h2>
              <pre>{popupText}</pre>
              <button onClick={() => setPopupText("")}>Close</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
  
};

export default Scanner;
