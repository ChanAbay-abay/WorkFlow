import React from "react";
import "./Personal.css";
import userDefault from "../../Assets/ICONS/userDefault.jpg";
import NavBar from "../../Components/NavBar/NavBar";
import TaskList from "../../Components/TaskList/TaskList";
import TLPieChart from "../../Components/TLPieChart/TLPieChart";
import { useState } from "react";

function Personal() {
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
            <img src={userDefault} alt="" className="ptl-left-pfp" />
          </div>
          <div className="ptl-left-piechart-con">
            {isLeftPanelExpanded && (
              <h2 className="ptl-piechart-title">Completion Chart</h2>
            )}
            {showPieChart && <TLPieChart />}
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
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default Personal;
