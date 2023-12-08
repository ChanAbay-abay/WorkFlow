import React, { useState } from "react";
import "./EditTaskForm.css";
import { UpdateTask } from "../../../api/request";

function EditTaskForm({ task, onSave, onCancel }) {
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
    console.log(task)
    if(!editedDescription || !editedDeadline || !editedName){
      alert("Please do not leave blank space.");
      return;
    }
    const updatedName = editedName || task.name;
    const updatedDesc = editedDescription || task.description;
    const updatedDeadline = editedDeadline || task.deadline;
    console.log(updatedName)
    console.log(updatedDesc)
    console.log(updatedDeadline)
    const updatedInfo = {
      taskName: updatedName,
      taskDesc: updatedDesc,
      taskDeadline: updatedDeadline,
      taskID: task.id
    }
    onSave(updatedInfo);
    onCancel(false)
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
          <button type="submit" onClick={handleSubmit} className="mtl-edit-check-btn">
            &#10003;
          </button>
          <button type="button" onClick={onCancel} className="mtl-edit-cancel-btn">
            &#10005;
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskForm;
