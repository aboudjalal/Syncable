// import React, { useEffect } from "react";
// import { gapi } from "gapi-script";
// import "../styles/SignIn.css";


// // THIS PAGE HANDLES THE GOOGLE SIGN-IN

// const SignIn = ({ CLIENT_ID, SCOPES, setUser }) => {
//   useEffect(() => {
//     const initializeGoogleButton = () => {
//       if (window.google && window.google.accounts) {
//         window.google.accounts.id.initialize({
//           client_id: CLIENT_ID,
//           callback: handleCredentialResponse,
//         });
//         window.google.accounts.id.renderButton(
//           document.getElementById("googleSignInDiv"),
//           { theme: "outline", size: "large" }
//         );
//       } else {
//         setTimeout(initializeGoogleButton, 100);
//       }
//     };

//     const initializeGoogleClient = async () => {
//       try {
//         await gapi.load("client:auth2", async () => {
//           await gapi.auth2.init({
//             clientId: CLIENT_ID,
//             scope: SCOPES,
//           });
//         });
//       } catch (error) {
//         console.error("Error initializing Google API:", error);
//       }
//     };

//     const handleCredentialResponse = (response) => {
//       const decodedToken = JSON.parse(atob(response.credential.split(".")[1]));
//       setUser({
//         name: decodedToken.name,
//         email: decodedToken.email,
//         picture: decodedToken.picture,
//       });
//     };

//     initializeGoogleButton();
//     initializeGoogleClient();
//   }, [CLIENT_ID, SCOPES, setUser]);

//   return <div id="googleSignInDiv"></div>;
// };

// export default SignIn;
