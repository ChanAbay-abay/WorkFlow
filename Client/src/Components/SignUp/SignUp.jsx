import React, { useState } from "react";
import WorkFlowEmblem from "../../Assets/WorkFlowEmblem.png";
import WorkFlowText from "../../Assets/WorkFlowText.png";
import SignUpCSS from "./SignUp.module.css";
import { Link } from "react-router-dom";

function SignUp({ setCurrentView }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  const handleSignUp = async () => {
    if (!email || !username || !password || !confirmPassword) {
      console.error("Please fill in all the fields");
      return;
    }

    // Additional validation, e.g., checking if passwords match
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          userEmail: email,
          userPassword: password,
          // confirmPassword: confirmPassword,
        }),
      });

      if (response.ok) {
        // User successfully signed up
        // You may want to redirect to another page or show a success message
        console.log("User signed up successfully");
        setIsSignUpSuccessful(true);
        setCurrentView("login");
      } else {
        // Handle errors, e.g., display an error message
        console.error("Error signing up:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <div className="center-area">
        <div className="left">
          <div className="log-sign">
            <h1 className="log">Sign Up</h1>
          </div>

          <div className={SignUpCSS.form}>
            <h2>Email</h2>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              name="email" // Added name attribute
              onChange={(e) => setEmail(e.target.value)}
            />
            <h2>Username</h2>
            <input
              type="text" // Changed type to 'text'
              placeholder="Username"
              className="input-field"
              name="username" // Added name attribute
              onChange={(e) => setUsername(e.target.value)}
            />
            <h2>Password</h2>
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              name="password" // Added name attribute
              onChange={(e) => setPassword(e.target.value)}
            />
            <h2>Confirm Password</h2>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input-field"
              name="confirmPassword" // Added name attribute
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="bottom">
            <div className="b-right">
              {/* <Link to="/"> */}
              <button onClick={handleSignUp}>Sign Up</button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignUp;
