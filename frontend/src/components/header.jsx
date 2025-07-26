import React from "react";
import "./Header.css";
import tuteetutor from "../images/tt.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./footer.jsx";

function Header() {
  const navigate = useNavigate();

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

  // Sample data to display in cards
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

  return (
    <div>
      <header className="header">
        <nav className="nav">
          <ul className="nav-links">
            <li className="nav-item">
              <a href="/" className="nav-link">
                MyWebsite
              </a>
            </li>
            <li className="nav-item">
              <a href="/aboutus" className="nav-link">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a href="/programs" className="nav-link">
                Programs
              </a>
            </li>
            <li className="nav-item">
              <a href="/contactus" className="nav-link">
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link">
                Login/Signup
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="image-container">
        <img src={tuteetutor} alt="tutortuteeimage" />
        <div className="overlay">
          <h1>Welcome to Tutee-Tutor</h1>
          <p>Connecting students with expert tutors for personalized learning experiences.</p>

          {/* Card Container */}
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

      <Footer />
    </div>
  );
}

export default Header;