import React from "react";
import "./IndivMiniTask.css";

function IndivMiniTask({ task }) {
  return (
    <>
      <div className="imt-container">
        <input type="checkbox" className="imt-checkbox" />
        <h2 className="imt-name">{task.name}</h2>
      </div>
      <div className="imt-bottom-divider"></div>
    </>
  );
}

export default IndivMiniTask;
