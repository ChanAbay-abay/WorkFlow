import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./Components/LogIn/Login";
import SignUp from "./Components/SignUp/SignUp";
import Personal from "./Pages/Personal/Personal";
import PageCycler from "./Pages/PageCycler/PageCycler";
import Homepage from "./Pages/Homepage/Homepage";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,

  <div>
    <Router>
      <Routes>
        {/* path is what goes into URL */}
        {/* component is what renders */}

        <Route path="/" Component={App}></Route>
        <Route path="/login" Component={LogIn}></Route>
        <Route path="/signup" Component={SignUp}></Route>
        <Route path="/homepage" Component={Homepage}></Route>
        <Route path="/personal" Component={Personal}></Route>
      </Routes>
    </Router>
  </div>
);
