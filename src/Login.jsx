import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  return (
    <div className="l-back">
      <form className="login-form">
        <h3>User {currState}</h3>
        <p>Admin?<Link to="/admin">click here</Link></p>
        <input
          type="text"
          placeholder="username"
          className="form-input"
          required
        />
        {
            currState=='Sign up'?(
                <>
            <input
                type="email"
                placeholder="email"
                className="form-input"
                required
              />
              <input
                type="number"
                placeholder="number"
                className="form-input"
                required
              />
               </>):null
        }
        <input
          type="password"
          placeholder="password"
          className="form-input"
          required
        />
        <button type="submit" className="sbmt-btn">
          {currState == "Sign up" ? "Create Account" : "Login Here"}
        </button>
        <div className="login-term">
          <input type="checkbox" required />
          <span>Agree to the terms of use & privacy policy</span>
        </div>
        <div className="login-forget">
          {currState == "Sign up" ? (
            <p className="login-toggle">
              Already have an account?
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          ) : (
            <div>
              <p className="login-toggle">
                Create an account{" "}
                <span onClick={() => setCurrState("Sign up")}>Click here</span>
              </p>
              <p className="login-toggle">
                Forgot Password ? <span>Click here</span>
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
