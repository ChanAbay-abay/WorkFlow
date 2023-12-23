import React, { useState } from "react";
import "./EditTask.css";

function EditTask({ task, onSave, onDelete, onCancel }) {
  const [editedName, setEditedName] = useState(task.taskName || "");
  const [editedDescription, setEditedDescription] = useState(
    task.taskDesc || ""
  );
  const [editedDeadline, setEditedDeadline] = useState(task.taskDeadline || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedName.trim() === "") {
      alert("Task name cannot be empty.");
      return;
    }
    onSave(
      task.taskID, // Pass the task ID to identify the task
      editedName.trim(),
      editedDescription,
      editedDeadline
    );
  };

  return (
    <div className="et-edit-task-form">
      <div className="et-edit-name-desc">
        <input
          type="text"
          value={editedName}
          placeholder="Task Name"
          onChange={(e) => setEditedName(e.target.value)}
          className="et-edit-taskname"
        />
        <input
          value={editedDescription}
          placeholder="Task Description"
          onChange={(e) => setEditedDescription(e.target.value)}
          className="et-edit-taskdesc"
        />
      </div>
      <div className="et-edit-date-buttons">
        <input
          type="date"
          value={editedDeadline}
          placeholder="Task Deadline"
          onChange={(e) => setEditedDeadline(e.target.value)}
          className="et-edit-deadline"
        />
        <div className="mtl-edit-btn-container">
          <button onClick={handleSubmit} className="et-edit-check-btn">
            &#10003;
          </button>
          <button onClick={onCancel} className="et-edit-cancel-btn">
            &#10005;
          </button>
          <button
            onClick={() => onDelete(task.taskID)}
            className="et-edit-cancel-btn"
          >
            DEL
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
