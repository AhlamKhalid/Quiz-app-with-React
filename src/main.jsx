import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// strict mode doc:
// https://stackoverflow.com/a/61897567
// https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
