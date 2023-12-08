import React from "react";
import "./Personal.css";
import userDefault from "../../Assets/ICONS/userDefault.jpg";
import NavBar from "../../Components/NavBar/NavBar";

function Personal() {
  const username = "username";
  return (
    // <div className="ptl-container">
    //   <div className="ptl-nav">
    //     <NavBar></NavBar>
    //   </div>
    //   <div className="ptl-content">
    //     <div className="ptl-top">
    //       <h1>top</h1>
    //     </div>
    //     <div className="ptl-bottom">
    //       <h1>bottom</h1>
    //     </div>
    //   </div>
    // </div>

    <div className="ptl-container">
      <div className="ptl-nav">
        <NavBar></NavBar>
      </div>
      <div className="ptl-content">
        <h1>test</h1>
      </div>
    </div>
  );
}

export default Personal;
