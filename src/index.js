import React from "react";
import ReactDOM from "react-dom/client"; // Use the correct import for React 18
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID; // Ensure this is set in your .env file

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
