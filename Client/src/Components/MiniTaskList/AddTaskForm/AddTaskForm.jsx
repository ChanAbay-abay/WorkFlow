import React, { useState } from "react";
import "./AddTaskForm.css";

function AddTaskForm({ onAddTask, onCancel }) {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTaskName.trim() === "") {
      alert("Task name cannot be empty.");
      return;
    }
    if(!newTaskDescription || !newTaskDeadline || !newTaskName){
      alert("Please fillup all required fields.");
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
      <form onSubmit={handleSubmit} className="mtl-add-task-form">
        <div className="mtl-add-name-desc">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Enter new task name"
            className="mtl-add-taskname"
          />
          <input
            type="text"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Enter task description"
            className="mtl-add-taskdesc"
          />
        </div>
        <div className="mtl-add-deadline-submit-btn">
          <input
            type="date"
            value={newTaskDeadline}
            onChange={(e) => setNewTaskDeadline(e.target.value)}
            className="mtl-add-deadline"
          />
          <div className="mtl-add-task-buttons">
            <button type="submit" className="mtl-add-check-btn">
              &#10003;
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="mtl-add-cancel-btn"
            >
              &#10005;
            </button>
          </div>
        </div>
      </form>
      <div className="imt-bottom-divider"></div>
    </>
  );
}

export default AddTaskForm;
