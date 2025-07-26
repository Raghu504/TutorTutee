import React, { useState, useEffect } from "react";
import axios from "axios";
import "./bookinf.css";
import { useNavigate } from "react-router-dom";
import logoImage from "../images/logooo.jpg"
function Bookinfo() {
  const [tutormail, setTutormail] = useState(""); 
  const [tutordata, setTutordata] = useState([]);
  const [tuteeemail, setTuteeemail] = useState("");
  const [bookStatus, setBookstatus] = useState("Book the lecturer");
const navigate=useNavigate();
  useEffect(() => {
    const a = JSON.parse(localStorage.getItem("ids"));
    const tutoremailintuteemain = a?.id;
    setTutormail(tutoremailintuteemain);  
    alert(tutormail);
  }, []);
alert(tutormail)
  useEffect(() => {
    alert("ok")
    if (tutormail) {
      const fetchTutorData = async () => {
        try {
          alert("kk")
          const response = await axios.post("http://localhost:4000/getTutordata", { tutormail });
          if (response.data.status === "success") {
            setTutordata(response.data.tutordata);
          } else {
            setTutordata([]);
          }
        } catch (err) {
          console.error("Error fetching tutor data:", err);
        }
      };
      fetchTutorData();
    }
  }, [tutormail]);

  useEffect(() => {
    const hh = JSON.parse(localStorage.getItem("emailz"));
    if (hh?.email) {
      setTuteeemail(hh.email);
    }
  }, []);

  const booklecturer = async () => {
    try {
      const creatingTablett = await axios.post("http://localhost:4000/createttTable", {
        tuteeemail,
        tutoremail: tutormail,
      });

      if (creatingTablett.data.status === "success") {
        alert("Lecture booked successfully!");
        setBookstatus("Booked");
      } else {
        alert("Failed to book the lecture.");
      }
    } catch (err) {
      alert(`Error booking lecture: ${err.message}`);
    }
  };
  const handleClick = () => {
    navigate("/tuteemain");
  };
  return (
    <div className="container1">
      <div className="logo-v2" onClick={handleClick}>
          <img src={logoImage} alt="Logo" className="yourdata-logo-image" />
      </div>
  <h2>Book Lecturer</h2>
  <div className="cards-grid">
    {tutordata.length > 0 ? (
      <ul>
        {tutordata.map((item, index) => (
          <li key={index} className="card-item">
            <h3>{item.fn} {item.lna}</h3>
            <p>{item.phnum}</p>
            <p>{item.email}</p>
            <p>{item.subjects}</p>
            <p>{item.quali}</p>
            <p>{item.teachcategory}</p>
            <button onClick={booklecturer}>{bookStatus}</button>
          </li>
        ))}
      </ul>
    ) : (
      <p className="no-results">No results found.</p>
    )}
  </div>
</div>

  );
}

export default Bookinfo;
