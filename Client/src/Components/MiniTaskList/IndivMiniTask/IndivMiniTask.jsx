import React, { useState } from "react";
import "./IndivMiniTask.css";
import EditTaskForm from "../EditTaskForm/EditTaskForm";

function IndivMiniTask({ task, updateTask, onRemoveTask }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleCheckboxChange = () => {
    const newCompletedStatus = !task.completed;

    updateTask(
      task.id,
      task.name,
      task.description,
      task.deadline,
      newCompletedStatus
    );

    if (newCompletedStatus) {
      setTimeout(() => onRemoveTask(task.id), 400); //ms for animation
    }
  };

  return (
    <div className="imt-wrapper">
      <div className="imt-container">
        <input
          type="checkbox"
          className="imt-checkbox"
          onChange={handleCheckboxChange}
          checked={task.completed}
        />
        {isEditing ? (
          <EditTaskForm
            task={task}
            onSave={updateTask}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="imt-content" onClick={() => setIsEditing(true)}>
            <div className="imt-task-details">
              <div className="imt-name-desc">
                <h2 className={`imt-name ${task.completed ? "completed" : ""}`}>
                  {task.name}
                </h2>
                <p className="imt-desc">{task.description}</p>
              </div>
              <div className="imt-deadline">
                <p>{task.deadline}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="imt-bottom-divider"></div>
    </div>
  );
}

export default IndivMiniTask;
