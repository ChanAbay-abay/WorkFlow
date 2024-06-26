import React, { useState } from "react";
import "./nav.css";
import WorkFlowEmblem from "../../Assets/WorkFlowEmblem.png";
import WorkFlowText from "../../Assets/WorkFlowText.png";
import { Link } from "react-router-dom";
import userWhite from "../../Assets/ICONS/userWhite.png";
import groupWhite from "../../Assets/ICONS/groupWhite.png";
import hasbulla from "../../Assets/hasbulla.jpg";

function NavBar({ handleLogout }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="nav-container">
        {/* logo (already links to homepage) */}
        <Link to="/homepage">
          <div className="nav-logo-container">
            <img className="nav-logo" src={WorkFlowEmblem} alt="" />
            <img className="nav-logo" src={WorkFlowText} alt="" />
          </div>
        </Link>

        <div className="list-button-sep">
          <div className="nav-list">
            {/* personal */}
            {/* NEEDS TO LINK TO PERSONAL TASKS */}
            <Link to="/personal">
              <div className="nav-list-box">
                <img src={userWhite} alt="" className="nav-list-icon" />
                <h2 className="nav-personal">Personal</h2>
              </div>
            </Link>

            {/* teams | is a dropdown menu of all teams the user is in*/}
            <div
              className="nav-list-box"
              onClick={toggleDropdown}
              onMouseEnter={stopPropagation}
            >
              <img src={groupWhite} alt="" className="nav-list-icon" />
              <h2>Teams</h2>
              {isDropdownOpen && (
                <div className="dropdown-content" onClick={stopPropagation}>
                  <div className="nav-team-list">
                    <div className="nav-each-team">
                      <Link to="/teamone">
                        <img src={hasbulla} alt="" className="nav-teamImage" />
                        <h3>Hasbullas</h3>
                      </Link>
                    </div>
                    {/* <div className="nav-each-team">
                    <Link to={{}}>
                      <img src={hasbulla} alt="" className="nav-teamImage" />
                      <h3>team2</h3>
                    </Link>
                  </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            className="nav-list-box nav-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
