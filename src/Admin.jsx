import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Admin = () => {
  const [id,setId]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:80/user/login", userData);

      if (response.data.token && response.data.role === "admin") {
        // Store token in local storage
        localStorage.setItem("authToken", response.data.token);
        console.log("Token stored successfully:", response.data.token);

        // Redirect to AdminDash page
        navigate("/admindash");
      } else {
        console.error("Login failed: Not an admin");
        alert("Invalid admin credentials");
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="l-back">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Admin Login</h3>
        
        <p>User? <Link to={'/'}>Click Here</Link></p>
        <input
          type="text"
          placeholder="admin id"
          className="form-input"
          required
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="email"
          placeholder="admin email"
          className="form-input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="form-input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="sbmt-btn">
          Login Here
        </button>
      </form>
    </div>
  );
};

export default Admin;
