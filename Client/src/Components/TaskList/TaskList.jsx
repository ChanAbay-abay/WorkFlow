import React, { useState, useEffect } from "react";
import "./TaskList.css";
import IndivTask from "./IndivTask/IndivTask";
import AddTask from "./AddTask/AddTask";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false); // Uncomment this line
  // const [sortByDate, setSortByDate] = useState(false);

  useEffect(() => {
    const caughtToken = localStorage.getItem("token");
    const token = jwtDecode(caughtToken);

    console.log("Decoded Token:", token);

    // Fetch tasks from the backend when the component mounts
    axios
      .get(`http://localhost:3000/api/tasks/all?userID=${token.user.id}`)
      .then((response) => {
        setTasks(response.data);
        console.log("res.data:", response.data);
        console.log("tasks:", response.tasks);
        console.log("res:", response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, []);

  const addTask = (name, description, deadline) => {
    axios.defaults.headers.post["Content-Type"] = "application/json";

    axios
      .post("http://localhost:3000/api/tasks/create", {
        taskName: name,
        taskDesc: description,
        taskDeadline: deadline,
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
    // Uncomment this function
    setShowCompletedTasks(!showCompletedTasks);
  };

  // const toggleSortByDate = () => {
  //   setSortByDate(!sortByDate);
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  // const filteredTasks = showCompletedTasks
  //   ? tasks.filter((task) => task.isTaskComplete)
  //   : tasks.filter((task) => !task.isTaskComplete);

  // let displayedTasks = tasks;

  // if (showCompletedTasks) {
  //   displayedTasks = displayedTasks.filter((task) => task.isTaskComplete);
  // } else {
  //   displayedTasks = displayedTasks.filter((task) => !task.isTaskComplete);
  // }
  // if (sortByDate) {
  //   displayedTasks.sort(
  //     (a, b) => new Date(a.taskDeadline) - new Date(b.taskDeadline)
  //   );
  // }

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
          {/* <label>
            Sort by Date
            <input
              type="checkbox"
              checked={sortByDate}
              onChange={toggleSortByDate}
            />
          </label> */}
        </div>
      </div>
      <div className="tl-content">
        {Array.isArray(tasks) &&
          tasks.map((task) => (
            <IndivTask
              key={task.taskID}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
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
