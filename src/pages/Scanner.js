import PropTypes from "prop-types";

// Existing imports...
import React, { useState, useEffect } from "react";
import { extractSchedule } from "../utils/chatgpt";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import { GlobalWorkerOptions } from "pdfjs-dist";
import "pdfjs-dist/legacy/build/pdf.worker";
import "../styles/Scanner.css";

// Set worker source
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const Scanner = ({ file, setIsProcessing }) => {
  const [chatGPTResponse, setChatGPTResponse] = useState("");
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
      return extractedText;
    } catch (error) {
      console.error("❌ Error extracting text from PDF:", error);
      return null;
    }
  };

  /** Process the uploaded file and analyze with ChatGPT */
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
            setErrorMessage("Failed to extract text from PDF.");
            setIsProcessing(false);
          }
        };
      } else {
        setErrorMessage("❌ Only PDF files are supported.");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("❌ Error processing file:", error);
      setErrorMessage("❌ Failed to process file.");
      setIsProcessing(false);
    }
  };

  /** Analyze text with ChatGPT using the provided prompt */
  const analyzeWithChatGPT = async (text) => {
    try {
      const prompt = "Give me what time each class in this timetable is.";
      const scheduleData = await extractSchedule(`${prompt} ${text}`);
      if (scheduleData) {
        setChatGPTResponse(scheduleData);
      } else {
        setErrorMessage("⚠️ ChatGPT analysis returned no data.");
      }
    } catch (error) {
      console.error("❌ Error analyzing with ChatGPT:", error);
      setErrorMessage("⚠️ ChatGPT analysis failed.");
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
      {chatGPTResponse && (
        <div className="popup">
          <div className="popup-content">
            <h2>ChatGPT Response</h2>
            <pre>{JSON.stringify(chatGPTResponse, null, 2)}</pre>
            <button onClick={() => setChatGPTResponse("")}>Close</button>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

// ✅ PropTypes validation
Scanner.propTypes = {
  file: PropTypes.object.isRequired,
  setIsProcessing: PropTypes.func.isRequired,
};

export default Scanner;
