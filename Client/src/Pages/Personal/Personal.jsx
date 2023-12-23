import React, { useState, useEffect } from "react";
import "./Personal.css";
import userDefault from "../../Assets/ICONS/userDefault.jpg";
import NavBar from "../../Components/NavBar/NavBar";
import TaskList from "../../Components/TaskList/TaskList";
import TLPieChart from "../../Components/TLPieChart/TLPieChart";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Personal() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLeftPanelExpanded, setIsLeftPanelExpanded] = useState(true);
  const [showPieChart, setShowPieChart] = useState(true);

  const toggleLeftPanel = () => {
    if (!isLeftPanelExpanded) {
      setIsLeftPanelExpanded(true);
      setTimeout(() => setShowPieChart(true), 400);
    } else {
      setShowPieChart(false);
      setIsLeftPanelExpanded(false);
    }
  };

  const handleLogout = () => {
    // Your logout logic here, e.g., remove token from local storage
    localStorage.removeItem("token");

    // Redirect to the "/" page
    window.location.href = "/";
  };

  const fetchUserData = () => {
    const caughtToken = localStorage.getItem("token");
    const token = jwtDecode(caughtToken);

    axios
      .get(`http://localhost:3000/api/tasks/all?userID=${token.user.id}`)
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="ptl-container">
      <div className="ptl-nav">
        <NavBar handleLogout={handleLogout} />
      </div>
      <div className="ptl-content">
        <div
          className={`ptl-content-left ${
            isLeftPanelExpanded
              ? "ptl-content-left-expanded"
              : "ptl-content-left-shrunk"
          }`}
        >
          <div className="ptl-left-pfp-con">
            <img src={userDefault} alt="" className="ptl-left-pfp" />
          </div>
          <div className="ptl-left-piechart-con">
            {isLeftPanelExpanded && (
              <h2 className="ptl-piechart-title">Completion Chart</h2>
            )}
            {showPieChart && <TLPieChart tasks={tasks} />}
          </div>
          <button onClick={toggleLeftPanel} className="toggle-panel-btn">
            {isLeftPanelExpanded ? "←" : "→"}
          </button>
        </div>
        <div
          className={`ptl-content-right ${
            isLeftPanelExpanded
              ? "ptl-content-right-expanded"
              : "ptl-content-right-shrunk"
          }`}
        >
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
}

export default Personal;
