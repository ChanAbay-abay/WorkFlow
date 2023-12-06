import React, { useState } from "react";
import "./MiniTaskList.css";
import IndivMiniTask from "./IndivMiniTask/IndivMiniTask";

function MiniTaskList() {
  const [tasks, setTasks] = useState([
    { name: "Task 1", description: "Description 1", id: 1 },
    { name: "Task 2", description: "Description 2", id: 2 },
    { name: "Task 3", description: "Description 3", id: 3 },
  ]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const addTask = (event) => {
    event.preventDefault();
    if (!newTaskName) return;
    const newTask = {
      name: newTaskName,
      description: newTaskDescription,
      id: Date.now(),
    };
    setTasks([...tasks, newTask]);
    setNewTaskName("");
    setNewTaskDescription("");
    setShowAddTask(false);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTask = (taskId, newName, newDescription, newCompleted) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              name: newName,
              description: newDescription,
              completed: newCompleted,
            }
          : task
      )
    );
  };

  return (
    <div className="mtl-container">
      <h2 className="mtl-title">Personal Tasks</h2>
      <div className="mtl-content">
        {tasks.map((task) => (
          <IndivMiniTask
            key={task.id}
            task={task}
            updateTask={updateTask}
            onRemoveTask={removeTask}
          />
        ))}
        {showAddTask ? (
          <form onSubmit={addTask} className="mtl-add-task-form">
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Enter new task name"
            />
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Enter task description"
            />
            <button type="submit">Add Task</button>
          </form>
        ) : (
          <button
            onClick={() => setShowAddTask(true)}
            className="mtl-show-add-form-btn"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default MiniTaskList;
