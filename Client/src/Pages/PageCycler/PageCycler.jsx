import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import "./PageCycler.css";
import Homepage from "../Homepage/Homepage.jsx";
import Personal from "../Personal/Personal";

function PageCycler() {
  return (
    <div className="pagecycler-main-container">
      <div className="nav">
        <NavBar />
      </div>
      <div className="pagecycler-content">
        {/* <h1>pagecycler</h1> */}
        {/* <Homepage></Homepage> */}
        <Personal></Personal>
      </div>
    </div>
  );
}

export default PageCycler;
