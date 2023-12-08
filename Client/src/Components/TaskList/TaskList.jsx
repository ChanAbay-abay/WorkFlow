import React from "react";
import "./TaskList.css";
import { useState, useEffect } from "react";
import IndivTask from "./IndivTask/IndivTask";
import AddTask from "./AddTask/AddTask";

function TaskList() {
  const username = "Username";
  const [tasks, setTasks] = useState([
    {
      name: "Task 1",
      description: "Description 1",
      deadline: "2023-12-07",
      completed: false,
      id: 1,
    },
    {
      name: "Task 2",
      description: "Description 2",
      deadline: "2023-12-08",
      completed: false,
      id: 2,
    },
    {
      name: "Task 3",
      description: "Description 3",
      deadline: "2023-12-09",
      completed: false,
      id: 3,
    },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);

  const addTask = (name, description, deadline) => {
    const newTask = {
      name,
      description,
      deadline,
      completed: false,
      id: Date.now(),
    };
    setTasks([...tasks, newTask]);
    setShowAddTask(false);
  };

  const updateTask = (
    taskId,
    newName,
    newDescription,
    newDeadline,
    newCompleted
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
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

  const toggleShowCompleted = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  const toggleSortByDate = () => {
    setSortByDate(!sortByDate);
  };

  const filteredTasks = showCompletedTasks
    ? tasks.filter((task) => task.completed)
    : tasks.filter((task) => !task.completed);

  let displayedTasks = [...tasks];
  if (showCompletedTasks) {
    displayedTasks = displayedTasks.filter((task) => task.completed);
  } else {
    displayedTasks = displayedTasks.filter((task) => !task.completed);
  }
  if (sortByDate) {
    displayedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }

  return (
    <div className="tl-container">
      <div className="tl-topbar">
        <h2 className="tl-title">Personal Tasks</h2>
        <div className="tl-filters">
          <label>
            Completed Tasks
            <input
              type="checkbox"
              checked={showCompletedTasks}
              onChange={toggleShowCompleted}
            />
          </label>
          {/* New checkbox for sorting by date */}
          <label>
            Sort by Date
            <input
              type="checkbox"
              checked={sortByDate}
              onChange={toggleSortByDate}
            />
          </label>
        </div>
      </div>
      <div className="tl-content">
        {displayedTasks.map((task) => (
          <IndivTask key={task.id} task={task} updateTask={updateTask} />
        ))}
        {showAddTask && (
          <AddTask onAddTask={addTask} onCancel={() => setShowAddTask(false)} />
        )}
        {!showCompletedTasks && (
          <div className="tl-button-div">
            <button
              onClick={() => setShowAddTask(true)}
              className="tl-show-add-form-btn"
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

export default TaskList;
