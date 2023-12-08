import React from "react";
import "./Personal.css";
import userDefault from "../../Assets/ICONS/userDefault.jpg";
import NavBar from "../../Components/NavBar/NavBar";

function Personal() {
  const username = "username";
  return (
    <div className="ptl-container">
      <div className="ptl-nav">
        <NavBar></NavBar>
      </div>
      <div className="ptl-content">
        <div className="ptl-content-left"><h1>left</h1></div>
        <div className="ptl-content-right"><h1>right</h1></div>

      </div>
    </div>
  );
}

export default Personal;
