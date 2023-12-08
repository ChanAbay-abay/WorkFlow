import React from "react";
import "./IndivTask.css";
import EditTask from "../EditTask/EditTask";
import { useState } from "react";

function IndivTask({ task, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.completed); // Local state to mirror completed status
  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted); // Update local state immediately for visual feedback

    // Delay the global state update until after the animation
    setTimeout(() => {
      updateTask(
        task.id,
        task.name,
        task.description,
        task.deadline,
        !isCompleted // Use the local state value here
      );
    }, 400);
  };

  return (
    <div className="it-wrapper">
      <div className="it-container">
        <input
          type="checkbox"
          className="it-checkbox"
          onChange={handleCheckboxChange}
          checked={isCompleted} // Use local state for checkbox status
        />
        {isEditing ? (
          <EditTask
            task={task}
            onSave={(id, name, description, deadline) => {
              updateTask(id, name, description, deadline, task.completed);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="it-content" onClick={() => setIsEditing(true)}>
            <div className="it-task-details">
              <div className="it-name-desc">
                <h2 className={`it-name ${task.completed ? "completed" : ""}`}>
                  {task.name}
                </h2>
                <p className="it-desc">{task.description}</p>
              </div>
              <div className="it-deadline">
                <p>{task.deadline}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="it-bottom-divider"></div>
    </div>
  );
}

export default IndivTask;
