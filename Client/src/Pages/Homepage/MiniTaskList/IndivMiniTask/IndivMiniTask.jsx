import React, { useState, useEffect } from "react";
import "./IndivMiniTask.css";

function IndivMiniTask({ task, updateTask, onRemoveTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDeadline, setEditedDeadline] = useState(task.deadline);
  const [isCompleted, setIsCompleted] = useState(task.completed);
  let checkboxTimeout;

  const handleCheckboxChange = () => {
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);

    clearTimeout(checkboxTimeout);
    checkboxTimeout = setTimeout(() => {
      if (newCompletedStatus) {
        onRemoveTask(task.id);
      } else {
        updateTask(
          task.id,
          task.name,
          task.description,
          task.deadline,
          newCompletedStatus
        );
      }
    }, 500);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setEditedDeadline(e.target.value);
  };

  const saveChanges = () => {
    updateTask(
      task.id,
      editedName,
      editedDescription,
      editedDeadline,
      isCompleted
    );
    setIsEditing(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(checkboxTimeout);
    };
  }, []);

  return (
    <div className="imt-wrapper">
      <div className="imt-container">
        <input
          type="checkbox"
          className="imt-checkbox"
          onChange={handleCheckboxChange}
          checked={isCompleted}
        />
        {isEditing ? (
          <div>
            <input type="text" value={editedName} onChange={handleNameChange} />
            <textarea
              value={editedDescription}
              onChange={handleDescriptionChange}
            />
            <input
              type="date"
              value={editedDeadline}
              onChange={handleDeadlineChange}
            />
            <button onClick={saveChanges}>Save</button>
          </div>
        ) : (
          <div className="imt-content" onClick={() => setIsEditing(true)}>
            <div className="imt-name-deadline">
              <h2 className={`imt-name ${isCompleted ? "completed" : ""}`}>
                {task.name}
              </h2>
              <div className="imt-deadline">
                <p>{editedDeadline}</p>
              </div>
            </div>
            <p className="imt-desc">{task.description}</p>
          </div>
        )}
      </div>
      <div className="imt-bottom-divider"></div>
    </div>
  );
}

export default IndivMiniTask;
