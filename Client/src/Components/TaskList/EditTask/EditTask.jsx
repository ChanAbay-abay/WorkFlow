import React from "react";
import { useState } from "react";
import "./EditTask.css";

function EditTask({ task, onSave, onCancel, onDelete }) {
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDeadline, setEditedDeadline] = useState(task.deadline);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if editedName is empty
    if (editedName.trim() === "") {
      alert("Task name cannot be empty.");
      return;
    }
    onSave(task.id, editedName.trim(), editedDescription, editedDeadline);
  };

  return (
    <div className="et-edit-task-form">
      <div className="et-edit-name-desc">
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="et-edit-taskname"
        />
        <input
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="et-edit-taskdesc"
        />
      </div>
      <div className="et-edit-date-buttons">
        <input
          type="date"
          value={editedDeadline}
          onChange={(e) => setEditedDeadline(e.target.value)}
          className="et-edit-deadline"
        />
        <div className="mtl-edit-btn-container">
          {/* TO BE FIXED WITH BACKEND */}
          <button onClick={handleSubmit} className="et-edit-check-btn">
            &#10003;
          </button>
          <button onClick={onCancel} className="et-edit-cancel-btn">
            &#10005;
          </button>
          <button onClick={onDelete} className="et-edit-cancel-btn">
            DEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
