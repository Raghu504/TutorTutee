import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditLecture.css";
import logoImage from "../images/logo.png";


function EditLecture() {
  const [tutoremail, setTutoremail] = useState("");
  const [lecturedata, setLecturedata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ee = JSON.parse(localStorage.getItem("emailz"));
    const email = ee?.email;

    if (email) {
      setTutoremail(email);

      const fetchLectureData = async () => {
        try {
          const response = await axios.post("http://localhost:4000/editlecture", {
            tutoremail: email,
          });
          if (response.data.status === "success") {
            setLecturedata(response.data.kk);
          } else {
            setLecturedata([]);
          }
        } catch (err) {
          alert(`Error fetching data: ${err.message}`);
        }
      };

      fetchLectureData();
    }
  }, []);

  const deleteLecture = async (id) => {
    try {
      const dl = await axios.delete(`http://localhost:4000/deletelecture/${id}`);
      if (dl.data.status === "success") {
        alert("Lecture deleted successfully!");
        setLecturedata(lecturedata.filter((item) => item.id !== id));
      } else {
        alert("Unable to delete lecture.");
      }
    } catch (err) {
      alert(`Error deleting lecture: ${err.message}`);
    }
  };
  const handleClick = () => {
    navigate("/tutormain");
  };
  return (
    <div>
      <div className="logo-container" onClick={handleClick}>
              <img src={logoImage} alt="Logo" className="logo-image" />
            </div>
    <div className="edit-lecture-container">
      <h2 className="edit-lecture-header">Edit Lecture</h2>
      {lecturedata.length > 0 ? (
        <ul className="lecture-list">
          {lecturedata.map((lecture) => (
            <li className="lecture-item" key={lecture.id}>
              <p className="lecture-details">
                {lecture.subject} 
              </p>
              <br></br>
              <p className="lecture-details">
              {lecture.lecturedatetime}
              </p>
              
              <div>
                <a className="edit-link" href={`/editlecturedata/${lecture.id}`}>
                  Edit lecture
                </a>
                <button className="delete-button" onClick={() => deleteLecture(lecture.id)}>
                  Delete Lecture
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-lectures-message">No lectures available.</p>
      )}
    </div>
    </div>
  );
}

export default EditLecture;
