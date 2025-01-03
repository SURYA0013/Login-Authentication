import React, { useEffect, useState } from "react";
import "./AdminDash.css";
import axios from "axios";
import { Link } from "react-router-dom";
const AdminDash = () => {
  const [userData, setUserData] = useState([]);
  const[name,setName]=useState("")
  useEffect(() => {
    dataFetch();
    fetchAdminInfo();
  }, []);
  const dataFetch = async () => {
    try {
      const response = await axios.get(
        "https://api.jsonbin.io/v3/b/67750dc7e41b4d34e46e44e1"
      );
      console.log(response.data);
      setUserData(response.data.record.profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };
  const fetchAdminInfo = async () => {
    const token=localStorage.getItem('authToken');      
    console.log("mytoken-:"+token);
    const url = "http://localhost:80/user/getuser";
    try {
      const response = await axios.get(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("User info fetched:", response.data);
      setName(response.data.username);
      console.log(name);
    } catch (error) {
      console.error("Error fetching user info with token:", error);
    }
  };
  return (
    <div className="admin">
      <div className="sidebar">
        <div className="profile">
          <h1>Admin Dashboard</h1>
          <img src="person.png" alt="" />
          <p>{name}</p>
        </div>
        <Link to>Profiles</Link>
        <a href="#">updates</a>
        <a href="#">about</a>
        <a href="#">Protocols</a>
        <a href="#">Settings</a>
      </div>
      {/* header */}
      <div className="right">
        <div className="header">
          <div>
            <h3 className="title">Welcome back, {name}!</h3>
            <p>{name} Take a look at candidate profiles</p>
          </div>
          <div className="search">
            <input type="text" placeholder="search candidate..." />
            <img src="search.png" alt="" />
          </div>
        </div>
        {/* candidate profiles */}
        <div className="content">
          {userData.map((user) => (
             <div className="profile-card" key={user.id}>
             <img src={user.profileImage} alt="Profile Picture" />
             <h2>{user.name}</h2>
             <div className="info">
               <p>{user.email}</p>
               <p>{user.phoneNumber}</p>
             </div>
             <div className="actions">
               <button className="update" >Update</button>
               <button className="delete">Delete</button>
             </div>
           </div>
          )
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminDash;
