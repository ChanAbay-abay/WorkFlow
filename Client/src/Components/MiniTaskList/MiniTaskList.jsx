import React, { useState } from "react";
import "./MiniTaskList.css";
import IndivMiniTask from "./IndivMiniTask/IndivMiniTask";
import AddTaskForm from "./AddTaskForm/AddTaskForm";

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
  const [showAddTask, setShowAddTask] = useState(false);

  const addTask = (name, description, deadline) => {
    const newTask = { name, description, deadline, id: Date.now() };
    setTasks([...tasks, newTask]);
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

  const handleCancel = () => {
    setShowAddTask(false);
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
          <AddTaskForm onAddTask={addTask} onCancel={handleCancel} />
        ) : (
          <div className="mtl-button-div">
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
