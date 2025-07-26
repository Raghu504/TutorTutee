import React from 'react';
import './Tutorcss.css';
import axios from "axios";
import tutor from '../images/3784896.jpg';
import { useNavigate } from "react-router-dom";
import logoImage from '../images/logo.png'; 
import Footer from "./footer.jsx";

function HeaderV2() {
  const navigate = useNavigate();
  const cardData = [
    {
      title: "Expert Tutors",
      description: "Learn from certified tutors with years of experience.",
    },
    {
      title: "Personalized Learning",
      description: "Tailored lessons to meet your unique learning needs.",
    },
    {
      title: "Flexible Scheduling",
      description: "Book sessions at your convenience.",
    },
  ];
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/logout", {}, { withCredentials: true });
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err);
      alert("Failed to log out. Please try again.");
    }
  };

  const handleClick = () => {
    navigate("/tutormain");
  };

  return (
    <div>
      <header className="header-v2">
        <div className="container">
          <div className="logo-v2" onClick={handleClick} style={{ cursor: "pointer" }}>
            <img src={logoImage} alt="Logo" className="logo-image-v2" />
          </div>
          <div className="nav-v2">
            <div className="nav-item-v2">
              <a href="/yourdata" className="nav-link-v2">Your Data</a>
            </div>
            <div className="nav-v2">
              <a href="/addlecture" className='nav-link-v2'>Add Lecture</a>
            </div>
            <div className="nav-v2">
              <a href="/editlecture" className='nav-link-v2'>Edit Lecture</a>
            </div>
            <div className="nav-item-v2">
              <a href="/contactus" className="nav-link-v2">Contact Us</a>
            </div>
            <div className="nav-item-v2">
              <a href="/tutorprofile" className="nav-link-v2">Profile</a>
            </div>
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      <div className="imag">
              <img src={tutor} alt="tutortuteeimage" />
              <div className="over">
                <h1>Welcome to Tutee-Tutor</h1>
                <p>Connecting students with expert tutors for personalized learning experiences.</p>
                <div className="card-container">
                      {cardData.map((card, index) => (
                        <div key={index} className="card">
                          <h3>{card.title}</h3>
                          <p>{card.description}</p>
                        </div>
                      ))}
                    </div>
                </div>
                </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default HeaderV2;
