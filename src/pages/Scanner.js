import React, { useState, useEffect } from "react";
import { extractSchedule } from "../utils/chatgpt"; // Import ChatGPT function
import * as pdfjs from "pdfjs-dist/legacy/build/pdf"; // Correct PDF.js import
import { GlobalWorkerOptions } from "pdfjs-dist";
import "pdfjs-dist/legacy/build/pdf.worker"; // Import worker
import "../styles/Scanner.css";

// Set worker source (Ensures PDF.js works in React)
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const Scanner = ({ file, setParsedTimetable, setIsProcessing }) => {
  const [popupText, setPopupText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  /** Extract text from PDF */
  const extractTextFromPDF = async (pdfData) => {
    try {
      const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
      let extractedText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map((item) => item.str).join(" ") + "\n";
      }

      console.log("📄 Extracted PDF Text:", extractedText);
      return extractedText;
    } catch (error) {
      console.error("❌ Error extracting text from PDF:", error);
      return null;
    }
  };

  /** Process the uploaded file */
  const processFile = async () => {
    if (!file) return;

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = async () => {
          const extractedText = await extractTextFromPDF(reader.result);
          if (extractedText) {
            await analyzeWithChatGPT(extractedText);
          } else {
            setPopupText("Failed to extract text from PDF.");
            setIsProcessing(false);
          }
        };
      } else {
        setPopupText("❌ Currently, only PDFs are supported.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("❌ Error processing file:", error);
      setPopupText("❌ Failed to process file.");
      setIsProcessing(false);
    }
  };

  /** Analyze extracted text with OpenAI */
  const analyzeWithChatGPT = async (text) => {
    try {
      const scheduleData = await extractSchedule(text);
      if (scheduleData && scheduleData.schedule) {
        setParsedTimetable(scheduleData.schedule);
        setPopupText(JSON.stringify(scheduleData.schedule, null, 2));
      } else {
        setPopupText("⚠️ Failed to extract schedule. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error analyzing with ChatGPT:", error);
      setPopupText("⚠️ ChatGPT analysis failed.");
      setErrorMessage(error.message);
    }
    setIsProcessing(false);
  };

  /** Watch for new files */
  useEffect(() => {
    if (file) {
      processFile();
    }
  }, [file]);

  return (
    <div>
      {popupText && (
        <>
          <div className="popup-overlay" onClick={() => setPopupText("")}></div>
          <div className="popup">
            <div className="popup-content">
              <h2>Extracted Schedule</h2>
              <pre>{popupText}</pre>
              {errorMessage && <p className="error-text">Error: {errorMessage}</p>}
              <button onClick={() => setPopupText("")}>Close</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Scanner;
