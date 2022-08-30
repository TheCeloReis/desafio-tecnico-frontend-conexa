import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDZAAO4xkQAqj7tYStK6O02DBvzoLFPZ58",
  authDomain: "conexa-saude.firebaseapp.com",
  projectId: "conexa-saude",
  storageBucket: "conexa-saude.appspot.com",
  messagingSenderId: "348988171909",
  appId: "1:348988171909:web:8a0b9051f059d59c586bec",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
