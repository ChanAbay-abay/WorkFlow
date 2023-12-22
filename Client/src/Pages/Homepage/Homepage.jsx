import React, { useEffect } from "react";
import userDefault from "../../Assets/ICONS/userDefault.jpg";
import "./Homepage.css";
import JoinOrCreateTeam from "../../Components/JoinOrCreateTeam/JoinCreateTeam";
import MiniTaskList from "../../Components/MiniTaskList/MiniTaskList";
import TaskReport from "../../Components/TaskReport/TaskReport";
import HomePageCalendar from "../../Components/HomePageCalendar/HomePageCalendar";
import NavBar from "../../Components/NavBar/NavBar";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

function Homepage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const caughtToken = localStorage.getItem("token");
    const token = jwtDecode(caughtToken);

    // console.log(caughtToken, token);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${token.user.id}`
        );

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          console.log(userData);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="homepage-container">
      <div className="navcont">
        <NavBar></NavBar>
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
            <MiniTaskList />
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
      </div>
    </div>
  );
}

export default Homepage;
