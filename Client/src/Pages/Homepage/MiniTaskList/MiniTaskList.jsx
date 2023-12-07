import React, { useState } from "react";
import "./MiniTaskList.css";
import IndivMiniTask from "./IndivMiniTask/IndivMiniTask";

function MiniTaskList() {
  const [tasks, setTasks] = useState([
    {
      name: "Task 1",
      description: "Description 1",
      deadline: "2023-12-07",
      id: 1,
    },
    {
      name: "Task 2",
      description: "Description 2",
      deadline: "2023-12-08",
      id: 2,
    },
    {
      name: "Task 3",
      description: "Description 3",
      deadline: "2023-12-09",
      id: 3,
    },
  ]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);

  const addTask = (event) => {
    event.preventDefault();
    const newTask = {
      name: newTaskName,
      description: newTaskDescription,
      deadline: newTaskDeadline,
      id: Date.now(),
    };
    setTasks([...tasks, newTask]);
    setNewTaskName("");
    setNewTaskDescription("");
    setNewTaskDeadline("");
    setShowAddTask(false);
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTask = (
    taskId,
    newName,
    newDescription,
    newDeadline,
    newCompleted
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              name: newName,
              description: newDescription,
              deadline: newDeadline,
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
              className="mtl-add-task-taskname"
            />
            <input
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Enter task description"
              className="mtl-add-task-taskdesc"
            />
            <input
              type="date"
              value={newTaskDeadline}
              onChange={(e) => setNewTaskDeadline(e.target.value)}
              className="mtl-add-task-deadline"
            />
            <button type="submit">Add Task</button>
          </form>
        ) : (
          <div className="mtl-addtask">
            <button
              onClick={() => setShowAddTask(true)}
              className="mtl-show-add-form-btn"
              title="Add Task"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MiniTaskList;
