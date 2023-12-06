import React, { useState, useEffect } from "react";
import "./IndivMiniTask.css";

function IndivMiniTask({ task, updateTask, onRemoveTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);
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
        updateTask(task.id, task.name, task.description, newCompletedStatus);
      }
    }, 500); // Adjust this timeout duration to match your animation duration
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const saveChanges = () => {
    updateTask(task.id, editedName, editedDescription, isCompleted);
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
            <button onClick={saveChanges}>Save</button>
          </div>
        ) : (
          <div onClick={() => setIsEditing(true)}>
            <h2 className={`imt-name ${isCompleted ? "completed" : ""}`}>
              {task.name}
            </h2>
            <p>{task.description}</p>
          </div>
        )}
      </div>
      <div className="imt-bottom-divider"></div>
    </div>
  );
}

export default IndivMiniTask;
