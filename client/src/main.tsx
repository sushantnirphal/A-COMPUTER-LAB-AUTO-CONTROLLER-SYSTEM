import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./samples/node-api";
import "./index.css";

import StudentContext from "../Context/StudentContext";
import FacultyContext from "../Context/FacultyContex";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StudentContext>
    <FacultyContext>
      <App />
    </FacultyContext>
  </StudentContext>
);

postMessage({ payload: "removeLoading" }, "*");
