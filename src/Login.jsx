import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link,useNavigate} from "react-router-dom";

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [pass, setPass] = useState("");
  const navigate=useNavigate()

  const handelSubmit = async (e) => {
    e.preventDefault();

    const userData =
      currState === "Sign up"
        ? {
            username: name,
            email: email,
            mobile: number,
            password: pass,
            role: "user", // Static role for sign-up
          }
        : {
            email: email,
            password: pass,
          };

    const url =
      currState === "Sign up"
        ? "http://localhost:80/user/signup"
        : "http://localhost:80/user/login";

    try {
      const response = await axios.post(url, userData);
      console.log("Response:", response.data);

      if (currState === "Login") {
        // Store token in local storage after login
        const token = response.data.token;
        const role=response.data.role;
        if (role==='admin') {
          localStorage.setItem("authToken", token);

          // Fetch user info after storing the token
          await fetchUserInfo(token);
          console.log("Token stored successfully:", token);
          navigate("/admindash")
        }else if(role==="user"){
          localStorage.setItem("authToken", token);
          await fetchUserInfo(token);
          console.log("Token stored successfully:", token);
          navigate("/userdash")
        }
         else {
          console.error("Token not found in the response");
        }
      }

      // Clear form fields after successful request
      if (currState === "Sign up") {
        setName("");
        setNumber("");
      }
      setEmail("");
      setPass("");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const fetchUserInfo = async (token) => {
    console.log("hi");
    
    const url = "http://localhost:80/user/getuser";
    try {
      const response = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("User info fetched:", response.data);
    } catch (error) {
      console.error("Error fetching user info with token:", error);
    }
  };

  return (
    <div className="l-back">
      <form className="login-form" onSubmit={handelSubmit}>
        <h3>User {currState}</h3>
        <p>
          Admin? <Link to="/admin">Click here</Link>
        </p>
        {currState === "Sign up" && (
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="form-input"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {currState === "Sign up" && (
          <input
            type="number"
            placeholder="Mobile Number"
            className="form-input"
            required
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          required
          value={pass}
          onChange={(event) => setPass(event.target.value)}
        />
        <button type="submit" className="sbmt-btn">
          {currState === "Sign up" ? "Create Account" : "Login Here"}
        </button>

        <div className="login-term">
          <input type="checkbox" required />
          <span>Agree to the terms of use & privacy policy</span>
        </div>

        <div className="login-forget">
          {currState === "Sign up" ? (
            <p className="login-toggle">
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          ) : (
            <div>
              <p className="login-toggle">
                Create an account{" "}
                <span onClick={() => setCurrState("Sign up")}>Click here</span>
              </p>
              <p className="login-toggle">
                Forgot Password? <span>Click here</span>
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
