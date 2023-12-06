import React from "react";
import userDefault from "../../Assets/ICONS/userDefault.jpg";
import "./Homepage.css";
import JoinOrCreateTeam from "./JoinOrCreateTeam/JoinCreateTeam";
import MiniTaskList from "./miniTaskList/MiniTaskList";
import TaskReport from "./TaskReport/TaskReport";
import HomePageCalendar from "./HomePageCalendar/HomePageCalendar";
import { useState } from "react";

function Homepage() {
  const username = "user_name";

  // WHILE WAITING FOR BACKEND
  const [tasks, setTasks] = useState([
    { name: "Task 1" },
    { name: "Task 2" },
    { name: "Do ToDoList Activity from Sir Patrick" },
  ]);

  // WHILE WAITING FOR BACKEND
  const addTask = () => {
    const newTask = { name: `New Task ${tasks.length + 1}` };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="homepage-container">
      {/* <h1>homepage</h1> */}

      <div className="homepage-greet">
        <img src={userDefault} alt="" className="homepage-greet-avatar" />
        <h1>Hello {username},</h1>
      </div>

      <div className="homepage-join-create">
        <JoinOrCreateTeam />
      </div>

      <div className="homepage-miniTaskList">
        <MiniTaskList miniTasks={tasks} />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="report-calendar-container">
        <div className="homepage-taskreport">
          <TaskReport />
        </div>

        <div className="homepage-calendar">
          <HomePageCalendar />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
