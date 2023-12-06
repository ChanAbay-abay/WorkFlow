import React, { useState } from "react";
import "./Login.css";
import WorkFlowEmblem from "../../Assets/WorkFlowEmblem.png";
import WorkFlowText from "../../Assets/WorkFlowText.png";
import { Link } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: email,
          userPassword: password,
        }),
      });

      if (response.ok) {
        // Successfully logged in
        console.log("User logged in successfully");
        window.location.href = "/homepage";
        // Redirect or perform other actions as needed
      } else {
        // Handle login failure, e.g., display an error message
        console.error("Error logging in:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="center-area">
      <div className="left">
        <div className="log-sign">
          <h1 className="log">Log In</h1>
        </div>

        <div className="form">
          <h2>Email</h2>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h2>Password</h2>
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="bottom">
          <div className="b-left">
            <p>forgot password?</p>
          </div>
          <div className="b-right">
            <button onClick={handleLogin}>Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
