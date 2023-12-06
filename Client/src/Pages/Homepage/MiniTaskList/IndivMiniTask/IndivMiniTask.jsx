import React from "react";
import "./IndivMiniTask.css";

function IndivMiniTask({ task }) {
  return (
    <div className="indivminitask-container">
      <h1>{task.name}</h1>
    </div>
  );
}

export default IndivMiniTask;
