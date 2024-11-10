// Importing required libraries 
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Creating the root element where the React app will be rendered
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Rendering the App component inside the root element using StrictMode for highlighting potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
