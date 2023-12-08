import React, { useState } from "react";
import "./joincreate.css";

function JoinOrCreateTeam() {
  const [currentView, setCurrentView] = useState("join");

  const switchToJoin = () => {
    setCurrentView("join");
  };

  const switchToCreate = () => {
    setCurrentView("create");
  };

  return (
    <div className="jc-container">
      <div className="join-or-create">
        <h1
          onClick={switchToJoin}
          className={`join-team ${currentView === "join" ? "active" : ""}`}
        >
          Join A Team
        </h1>
        <div className="jc-divider"></div>
        <h1
          onClick={switchToCreate}
          className={`create-team ${currentView === "create" ? "active" : ""}`}
        >
          Create A Team
        </h1>
      </div>
      <div className="jc-team-content-box">
        {currentView === "join" ? (
          <div className="jc-dependsOnClick">
            <input
              type="jc-team-link"
              placeholder="Enter Team Join Link"
              className="jc-input-field"
            />
            <button className="jc-button">Join</button>
          </div>
        ) : (
          <div className="jc-dependsOnClick">
            <input
              type="jc-team-name"
              placeholder="Enter Team Name"
              className="jc-input-field"
            />
            <button className="jc-button">Create</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default JoinOrCreateTeam;
