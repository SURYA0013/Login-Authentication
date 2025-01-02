import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserDash = () => {
    const [userData, setUserData] = useState([]);
    const [name,setName]=useState("")
    useEffect(() => {
      dataFetch();
      fetchUserInfo();
    }, []);
    
    const dataFetch = async () => {
      try {
        const response = await axios.get(
          "https://api.jsonbin.io/v3/b/677639e9e41b4d34e46eb401"
        );
       
        console.log(response.data);
        setUserData(response.data.record);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
   
    const fetchUserInfo = async () => {
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
          <h1>User Dashboard</h1>
          <img src="person.png" alt="" />
          <p>{name}</p>
        </div>
        <a href="#">Skills</a>
        <a href="#">Updates</a>
        <a href="#">About</a>
        <a href="#">Protocols</a>
        <a href="#">Settings</a>
      </div>
      {/* header */}
      <div className="right">
        <div className="header">
          <div>
            <h3 className="title">Welcome back, {name}!</h3>
            <p>{name} Take a look at your profile</p>
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
             <img src={user.image} alt="Profile Picture" />
             <h2>{user.skill}</h2>
             <div className="info">
               <p>Progress:{user.progress}%</p>
               <p>Experience:{user.experience}yr</p>
             </div>
             <div className="actions">
               <button className="update">Update</button>
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

export default UserDash;
