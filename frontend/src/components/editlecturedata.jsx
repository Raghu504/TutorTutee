import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logoImage from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import "./EditLecturedata.css";

function Editlecturedata() {
  const { id } = useParams();
  const [dateTime, setDateTime] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [number, setNumber] = useState("");
  const [usrname, setUsrname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        const response = await axios.post("http://localhost:4000/editlecturedata", { id });
        if (response.data.status === "success") {
          const lecture = response.data.lecturedata;
          setUsrname(lecture[0].usrname);
          setEmail(lecture[0].tutoremail);
          setSubject(lecture[0].subject);
          setNumber(lecture[0].phnumber);
          setDateTime(lecture[0].lecturedatetime);
        } else {
          alert("Failed to retrieve lecture data.");
        }
      } catch (err) {
        alert(`Error fetching data: ${err.message}`);
      }
    };

    fetchLectureData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:4000/updatelecturedata", {
        id,
        usrname,
        email,
        subject,
        number,
        dateTime,
      });

      if (response.data.status === "success") {
        alert("Lecture data updated successfully!");
        navigate("/editlecture");
      } else {
        alert("Failed to update lecture data.");
      }
    } catch (err) {
      alert(`Error updating data: ${err.message}`);
    }
  };

  const handleClick = () => {
    navigate("/tutormain");
  };

  return (
    <div className="edit-lecture-form-container">
      <div className="logo-container" onClick={handleClick}>
        <img src={logoImage} alt="Logo" className="logo-image" />
      </div>
      <h2 className="edit-lecture-title">Edit Lecture Data</h2>
      <form onSubmit={handleSubmit} className="edit-lecture-form">
        <label className="input-label">Username</label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter username"
          value={usrname}
          onChange={(e) => setUsrname(e.target.value)}
        />
        <label className="input-label">Email</label>
        <input
          type="email"
          className="input-field"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="input-label">Subject</label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <label className="input-label">Phone Number</label>
        <input
          type="number"
          className="input-field"
          placeholder="Enter Phone number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <div className="date-time-picker">
          <label className="input-label">Select Date and Time:</label>
          <input
            type="datetime-local"
            className="input-field"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>
        <input type="submit" value="Submit" className="submit-button" />
      </form>
    </div>
  );
}

export default Editlecturedata;
