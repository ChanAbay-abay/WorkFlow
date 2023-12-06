import React from "react";
import "./App.css";
import WorkFlowEmblem from "./Assets/WorkFlowEmblem.png";
import WorkFlowText from "./Assets/WorkFlowText.png";
import { Link } from "react-router-dom";
import LogIn from "./Pages/LogIn/Login";
import SignUp from "./Pages/SignUp/SignUp";
import { useState } from "react";

function App() {
  const [currentView, setCurrentView] = useState("login");

  const switchToLogin = () => {
    setCurrentView("login");
  };

  const switchToSignUp = () => {
    setCurrentView("signup");
  };

  return (
    <div className="center-area">
      <div className="left">
        {currentView === "login" && <LogIn />}
        {currentView === "signup" && <SignUp />}
      </div>

      <div className="right">
        <div className="logos">
          <img src={WorkFlowEmblem} alt="" className="logo" />
          <img src={WorkFlowText} alt="" className="logo" />
        </div>
        <div className="r-middle">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam,
            aliquid!
          </p>
        </div>
        <div className="r-bottom">
          <p>
            {currentView === "login" ? (
              <>
                <p>Need an account?</p>
                <span onClick={switchToSignUp} className="link">
                  Sign Up
                </span>
              </>
            ) : (
              <>
                <p>Already have an account? </p>
                <span onClick={switchToLogin} className="link">
                  Log In
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
