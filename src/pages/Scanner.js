import React from "react";
import Tesseract from "tesseract.js";
import "../styles/Scanner.css";


const Scanner = ({ file, setExtractedText, setParsedTimetable, setIsProcessing }) => {
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
        setIsProcessing(false);
      })
      .catch((error) => {
        console.error("Error reading image:", error);
        setExtractedText("Failed to extract text from the image.");
        setParsedTimetable([]);
        setIsProcessing(false);
      });
  };

  React.useEffect(() => {
    if (file) {
      processImage();
    }
  }, [file]);

  return null;
};

export default Scanner;
