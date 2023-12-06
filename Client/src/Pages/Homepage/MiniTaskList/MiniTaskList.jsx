import React from "react";
import "./MiniTaskList.css";
import IndivMiniTask from "./IndivMiniTask/IndivMiniTask";

function MiniTaskList({ miniTasks }) {
  return (
    <div className="mtl-container">
      <h2 className="mtl-title">Personal Tasks</h2>
      <div className="mtl-content">
        {miniTasks && Array.isArray(miniTasks) ? (
          miniTasks.map((task, index) => (
            <IndivMiniTask key={index} task={task} />
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
}

export default MiniTaskList;

// refer to webdev2 to do list activity
