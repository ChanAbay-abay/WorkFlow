import React, { useState } from "react";
import "./IndivTask.css";
import EditTask from "../EditTask/EditTask";

function IndivTask({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.isTaskComplete);

  const formatDate = (dateString) => {
    // Check if the date string is not blank
    if (dateString && dateString.trim() !== "") {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
    return ""; // Return an empty string if the date is blank
  };

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);

    setTimeout(() => {
      updateTask(
        task.taskID,
        task.taskName,
        task.taskDesc,
        task.taskDeadline,
        !isCompleted
      );
    }, 400);
  };

  const handleDelete = () => {
    // Call the deleteTask function with the task ID
    deleteTask(task.taskID);
  };

  return (
    <div className="it-wrapper">
      <div className="it-container">
        <input
          type="checkbox"
          className="it-checkbox"
          onChange={handleCheckboxChange}
          checked={isCompleted}
        />
        {isEditing ? (
          <EditTask
            task={task}
            onSave={(id, name, description, deadline) => {
              updateTask(id, name, description, deadline, task.completed);
              setIsEditing(false);
            }}
            onDelete={handleDelete}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="it-content" onClick={() => setIsEditing(true)}>
            <div className="it-task-details">
              <div className="it-name-desc">
                <h2 className={`it-name ${task.completed ? "completed" : ""}`}>
                  {task.taskName}
                </h2>
                <p className="it-desc">{task.taskDesc}</p>
              </div>
              <div className="it-deadline">
                <p>{formatDate(task.taskDeadline)}</p>
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
