import React from "react";
import { useState } from "react";
import "./AddTask.css";

function AddTask({ onAddTask, onCancel }) {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTaskName.trim() === "") {
      alert("Task name cannot be empty.");
      return;
    }
    onAddTask(newTaskName, newTaskDescription, newTaskDeadline);
    resetForm();
  };

  const resetForm = () => {
    setNewTaskName("");
    setNewTaskDescription("");
    setNewTaskDeadline("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="at-task-form">
        <div className="at-name-desc">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Enter new task name"
            className="at-taskname"
          />
          <input
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Enter task description"
            className="at-taskdesc"
          />
        </div>
        <div className="at-deadline-submit-btn">
          <input
            type="date"
            value={newTaskDeadline}
            onChange={(e) => setNewTaskDeadline(e.target.value)}
            className="at-deadline"
          />
          <div className="at-task-buttons">
            <button type="submit" className="at-check-btn">
              &#10003;
            </button>
            <button type="button" onClick={onCancel} className="at-cancel-btn">
              &#10005;
            </button>
          </div>
        </div>
      </form>
      <div className="at-bottom-divider"></div>
    </>
  );
}

export default AddTask;
