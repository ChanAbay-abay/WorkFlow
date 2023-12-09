import React, { useState } from "react";
import "./TeamOne.css";
import userDefault from "../../../Assets/ICONS/userDefault.jpg";
import NavBar from "../../../Components/NavBar/NavBar";
import TaskList from "../../../Components/TaskList/TaskList";
import TLPieChart from "../../../Components/TLPieChart/TLPieChart";
import hasbulla from "../../../Assets/hasbulla.jpg";

function TeamOne() {
  const username = "Username";
  const [isLeftPanelExpanded, setIsLeftPanelExpanded] = useState(true);
  const [showPieChart, setShowPieChart] = useState(true);

  // State for team members
  const [members, setMembers] = useState([
    { name: "Pass", id: 1 },
    { name: "Me", id: 2 },
    { name: "Please", id: 3 },
    // Add more members as needed
  ]);

  const toggleLeftPanel = () => {
    if (!isLeftPanelExpanded) {
      setIsLeftPanelExpanded(true);
      setTimeout(() => setShowPieChart(true), 400);
    } else {
      setShowPieChart(false);
      setIsLeftPanelExpanded(false);
    }
  };

  return (
    <div className="ptl-container">
      <div className="ptl-nav">
        <NavBar />
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
            <img src={hasbulla} alt="" className="ptl-left-pfp" />
          </div>
          <div className="ptl-left-piechart-con">
            {isLeftPanelExpanded && (
              <h2 className="ptl-piechart-title">Completion Chart</h2>
            )}
            {showPieChart && <TLPieChart />}
          </div>
          {/* Member list section */}
          {isLeftPanelExpanded && (
            <div className="ptl-left-member-list">
              <h3>Team Members</h3>
              <ul>
                {members.map((member) => (
                  <li key={member.id}>{member.name}</li>
                ))}
              </ul>
            </div>
          )}
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
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default TeamOne;
