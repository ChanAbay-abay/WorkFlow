import React from "react";
import "./MiniTaskList.css";
import IndivMiniTask from "./IndivMiniTask/IndivMiniTask";

function MiniTaskList({ miniTasks }) {
  return (
    <div className="minitasklist-container">
      <h2 className="minitask-list-title">Personal Tasks</h2>
      <div className="minitask-list-content">
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
