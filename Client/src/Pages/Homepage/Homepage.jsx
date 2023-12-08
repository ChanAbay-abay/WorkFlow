import React from "react";
import userDefault from "../../Assets/ICONS/userDefault.jpg";
import "./Homepage.css";
import JoinOrCreateTeam from "../../Components/JoinOrCreateTeam/JoinCreateTeam";
import MiniTaskList from "../../Components/MiniTaskList/MiniTaskList";
import TaskReport from "../../Components/TaskReport/TaskReport";
import HomePageCalendar from "../../Components/HomePageCalendar/HomePageCalendar";
import NavBar from "../../Components/NavBar/NavBar";
import { useState } from "react";

function Homepage() {
  const username = "user_name";

  return (
    <div className="homepage-container">
      <div className="navcont">
        <NavBar></NavBar>
      </div>
      <div className="homepage-content">
        <div className="homepage-top">
          <div className="homepage-greet">
            <img src={userDefault} alt="" className="homepage-greet-avatar" />
            <h1>Hello {username},</h1>
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
