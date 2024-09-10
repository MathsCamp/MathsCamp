import React, { Suspense } from "react"; // Import Suspense from React
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Parse from "parse";
import i18n from "./translation/i18n";

Parse.serverURL = "https://parseapi.back4app.com/";
Parse.initialize(
  "DuIYzArtIdG1IAUOtcbKjcpI3uMmnTAHpBfiapav",
  "XJTdoT6eJgRvDWi7nWBCP20eP6vZ8Zghspq5qJuS"
);

ReactDOM.render(
  <React.StrictMode>
    {/* Add Suspense around the App component */}
    <Suspense fallback={<div>Loading translations...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
