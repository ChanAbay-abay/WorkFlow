import React from "react";
import "./IndivTask.css";
import EditTask from "../EditTask/EditTask";
import { useState } from "react";

function IndivTask({ task, updateTask, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);

    setTimeout(() => {
      updateTask(
        task.id,
        task.name,
        task.description,
        task.deadline,
        !isCompleted
      );
    }, 400);
  };

  const deleteTask = () => {
    onDelete(task.id);
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
            onCancel={() => setIsEditing(false)}
            onDelete={deleteTask} // Pass the delete function to EditTask
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
