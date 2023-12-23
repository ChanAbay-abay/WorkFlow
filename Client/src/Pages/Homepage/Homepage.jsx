import React, { useEffect, useState } from "react";
import userDefault from "../../Assets/ICONS/userDefault.jpg";
import "./Homepage.css";
import JoinOrCreateTeam from "../../Components/JoinOrCreateTeam/JoinCreateTeam";
import TaskReport from "../../Components/TaskReport/TaskReport";
import HomePageCalendar from "../../Components/HomePageCalendar/HomePageCalendar";
import NavBar from "../../Components/NavBar/NavBar";
import { jwtDecode } from "jwt-decode";
import TaskList from "../../Components/TaskList/TaskList";

function Homepage() {
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleLogout = () => {
    // Your logout logic here, e.g., remove token from local storage
    localStorage.removeItem("token");

    // Redirect to the "/" page
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchData = async () => {
      const caughtToken = localStorage.getItem("token");
      const token = jwtDecode(caughtToken);

      try {
        // Fetch user data
        const response = await fetch(
          `http://localhost:3000/api/users/${token.user.id}`
        );

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);

          // Fetch tasks data
          const tasksResponse = await fetch(
            `http://localhost:3000/api/tasks/all?userID=${token.user.id}`
          );
          if (tasksResponse.ok) {
            const tasksData = await tasksResponse.json();
            setTasks(tasksData);
          } else {
            console.error("Error fetching tasks data");
          }
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="homepage-container">
      <div className="navcont">
        <NavBar handleLogout={handleLogout} />
      </div>
      <div className="homepage-content">
        <div className="homepage-top">
          <div className="homepage-greet">
            <img src={userDefault} alt="" className="homepage-greet-avatar" />
            {/* <h1>Hello {username},</h1> */}
            <h1>Hello {userData && userData.userName},</h1>
          </div>
          <div className="homepage-join-create">
            <JoinOrCreateTeam />
          </div>
        </div>

        <div className="homepage-bottom">
          <div className="homepage-miniTaskList">
            {/* <MiniTaskList /> */}
            <TaskList tasks={tasks} setTasks={setTasks} />
          </div>

          <div className="report-calendar-container">
            <div className="homepage-taskreport">
              <TaskReport></TaskReport>
            </div>

            <div className="homepage-calendar">
              <HomePageCalendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
