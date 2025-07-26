import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to fetch subjects after successful login
  const getSubjects = async () => {
    if (username) {  
      try {
        const response = await axios.post("http://localhost:4000/getsubjects", { username });
        if (response.data.status === "success") {
          localStorage.setItem("subjects", JSON.stringify({ subject: response.data.ff }));
        } else {
          alert("Failed to fetch subjects.");
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username, password };

    try {
      const res = await axios.post("http://localhost:4000/login", data, {
        withCredentials: true,
      });

      if (res.data.status === "success") {
        // Store session and user data in localStorage
        localStorage.setItem("user_session", "user_token");
        localStorage.setItem("i", JSON.stringify({ i: res.data.id }));
        localStorage.setItem("roleslogin", JSON.stringify({ role: res.data.role }));
        localStorage.setItem("emailz", JSON.stringify({ email: res.data.email }));
        alert(res.data.id);

        // Fetch subjects after successful login
        getSubjects();

        // Redirect based on role
        if (res.data.role === "tutor") {
          navigate("/tutormain");
        } else if (res.data.role === "tutee") {
          navigate("/tuteemain");
        }
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error("Error during login", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="main">
      <div>
        <a href="/">My Website</a>
      </div>
      <div className="left-content">
        <h1>Welcome to Tutee-Tutor</h1>
        <p>Your journey to personalized learning begins here. Join now and connect with expert tutors!</p>
      </div>
      <div className="form-container">
        <h3 className="login">Login</h3>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="email"
            placeholder="Enter your email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="form-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="form-button" type="submit">Submit</button>
          <p className="form-text">
            Don’t have an account? <a className="form-link" href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
