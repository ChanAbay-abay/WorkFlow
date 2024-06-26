import React, { useState } from "react";
import "./EditTaskForm.css";

function EditTaskForm({ task, onSave, onCancel, onDelete }) {
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

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className="mtl-edit-task-form">
      <div className="mtl-edit-name-desc">
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="mtl-edit-taskname"
        />
        <input
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="mtl-edit-taskdesc"
        />
      </div>
      <div className="mtl-edit-date-buttons">
        <input
          type="date"
          value={editedDeadline}
          onChange={(e) => setEditedDeadline(e.target.value)}
          className="mtl-edit-deadline"
        />
        <div className="mtl-edit-btn-container">
          {/* TO BE FIXED WITH BACKEND */}
          <button onClick={handleSubmit} className="mtl-edit-check-btn">
            {/* &#10003; */}
            SAVE
          </button>
          <button onClick={onCancel} className="mtl-edit-cancel-btn">
            &#10005;
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="mtl-edit-cancel-btn"
          >
            DEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskForm;
