import React, { useState, useEffect } from "react";
import axios from "axios";
import logoImage from '../images/logo.png'; 
import './addlec.css';  
import { useNavigate } from "react-router-dom";

function AddLecture() {
  const [dateTime, setDateTime] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [number, setNumber] = useState("");
  const [usrname, setUsrname] = useState("");
  const [status, setStatus] = useState("Add Lecture");
  const [sub, setSUB] = useState([]);
  const navigate=useNavigate();
  
  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };

  useEffect(() => {
    const dd = JSON.parse(localStorage.getItem("subjects"));
    if (dd && dd.subject) { 
      const sg = dd.subject;
      setSUB(sg);
      alert(sg); 
    }
  }, []);

  const addLecture = async (e) => {
    e.preventDefault();
    try {
      setStatus("Adding...");  // Update status to indicate the process is running
      const response = await axios.post("http://localhost:4000/addlecture", {
        usrname,
        email,
        subject,
        number,
        dateTime,
      });

      if (response.data.status === "success") {
        setStatus("Added successfully");
        alert("Lecture added successfully!");
      } else {
        setStatus("Add Lecture"); // Reset status on failure
        alert("Failed to add lecture.");
      }
    } catch (err) {
      console.error("Error adding lecture:", err);
      setStatus("Add Lecture"); // Reset status on error
    }
  };
  const handleClick = () => {
    navigate("/tutormain");
  };
  return (
    <div>
      <div className="logo-v2" onClick={handleClick} style={{ cursor: "pointer" }}>
              <img src={logoImage} alt="Logo" className="logo-image-v2" />
          </div>
    <div className="add-lecture-container">
      <h2>Add a New Lecture</h2>
      <form onSubmit={addLecture}>
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={usrname}
            onChange={(e) => setUsrname(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <select
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="">Select a subject</option>
            {sub.map((subjectItem, index) => (
              <option key={index} value={subjectItem}>
                {subjectItem}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="number"
            placeholder="Enter your number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="appointment">Select Date and Time:</label>
          <input
            type="datetime-local"
            id="appointment"
            value={dateTime}
            onChange={handleDateTimeChange}
            required
          />
        </div>

        <div>
          <input type="submit" value={status} />
        </div>
      </form>
    </div>
    </div>
  );
}

export default AddLecture;
