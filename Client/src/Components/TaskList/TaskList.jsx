import React, { useState, useEffect } from "react";
import "./TaskList.css";
import IndivTask from "./IndivTask/IndivTask";
import AddTask from "./AddTask/AddTask";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function TaskList({ tasks = [], setTasks }) {
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);

  const addTask = (name, description, deadline, task) => {
    const caughtToken = localStorage.getItem("token");
    const token = jwtDecode(caughtToken);

    axios.defaults.headers.post["Content-Type"] = "application/json";

    axios
      .post("http://localhost:3000/api/tasks/create", {
        taskName: name,
        taskDesc: description,
        taskDeadline: deadline,
        task: task,
        userID: token.user.id,
      })
      .then((response) => setTasks([...tasks, response.data]))
      .catch((error) => console.error("Error adding task:", error));
    setShowAddTask(false);
  };

  const updateTask = (
    taskId,
    newName,
    newDescription,
    newDeadline,
    newCompleted
  ) => {
    axios
      .put(`http://localhost:3000/api/tasks/${taskId}`, {
        taskName: newName,
        taskDesc: newDescription,
        taskDeadline: newDeadline,
        isTaskComplete: newCompleted,
      })
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.taskID === taskId
            ? {
                ...task,
                taskName: newName,
                taskDesc: newDescription,
                taskDeadline: newDeadline,
                isTaskComplete: newCompleted,
              }
            : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${taskId}`)
      .then(() =>
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.taskID !== taskId)
        )
      )
      .catch((error) => console.error("Error deleting task:", error));
  };

  const toggleShowCompleted = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  const toggleSortByDate = () => {
    setSortByDate(!sortByDate);
  };

  useEffect(() => {
    setLoading(false); // Set loading to false when tasks are received
  }, [tasks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredTasks = showCompletedTasks
    ? tasks.filter((task) => task.isTaskComplete)
    : tasks.filter((task) => !task.isTaskComplete);

  let displayedTasks = tasks;

  if (showCompletedTasks) {
    displayedTasks = displayedTasks.filter((task) => task.isTaskComplete);
  } else {
    displayedTasks = displayedTasks.filter((task) => !task.isTaskComplete);
  }

  if (sortByDate) {
    displayedTasks.sort(
      (a, b) => new Date(a.taskDeadline) - new Date(b.taskDeadline)
    );
  }

  return (
    <div className="tl-container">
      <div className="tl-topbar">
        <h2 className="tl-title">Task List</h2>
        <div className="tl-filters">
          <label>
            Completed Tasks
            <input
              type="checkbox"
              checked={showCompletedTasks}
              onChange={toggleShowCompleted}
            />
          </label>
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
        {Array.isArray(tasks) &&
          displayedTasks.map((task) => (
            <IndivTask
              key={task.taskID}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        {showAddTask && (
          <AddTask
            key={tasks.taskID}
            task={tasks}
            onAddTask={addTask}
            onCancel={() => setShowAddTask(false)}
          />
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
