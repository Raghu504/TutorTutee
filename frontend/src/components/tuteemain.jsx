import React, { useState, useEffect } from 'react';
import './HeaderV2.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from './footer';
import tuteeimage from "../images/teacher_5.jpg";
import logoImage from "../images/logooo.jpg"
function TuteeMain(props) {

  const navigate = useNavigate();
  const [sub, setSub] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [email, setEmail] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [b, setB] = useState(1);

  useEffect(() => {
    setEmail(props.email);
  }, [props.email]);

  const yy=JSON.parse(localStorage.getItem("rnstudying"));
  const dd=yy?.rns;
  const searchSubject = async () => {
    try {
      alert(sub);
      const da = await axios.post("http://localhost:4000/getSearchSubject", {sub});
      const d = da.data.ans;
      alert(`${JSON.stringify(d)}`);
      if (d) {
        setSearchResults(d);  
      } else {
        setSearchResults([]);  
      }
      setB(0);
    } catch (err) {
      alert(err);
      setSearchResults([]);  
    }
  }

  const searchLecturer = async () => {
    try {
      const da = await axios.post("http://localhost:4000/getSearchLecturer", lecturer);
      const d = da.data.ans;
      alert(d[0].id);
      alert(lecturer);
      if (d) {
        setSearchResults(d);  
      } else {
        setSearchResults([]);  
      }
      setB(0);
    } catch (err) {
      alert(err);
      setSearchResults([]);  
    }
  }

  const bookLecturer = (tutoremail) => {
    try {
      alert(tutoremail);
      localStorage.setItem("ids",JSON.stringify({id:tutoremail}))
      navigate("/book")
    } catch (err) {
      console.log(err);
    }
  }

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
    navigate("/tuteemain");
  };
  return (
    <div>
      <header className="header-v2">
        <div className="container">
          <div className="logo-v2" onClick={handleClick}>
            <img src={logoImage} alt="Logo" className="yourdata-logo-image" />
          </div>
          <div className="search-bar-v2">
            <input 
              type="text" 
              className="search-input-v2" 
              placeholder="Search by subject..." 
              value={sub} 
              onChange={(e) => setSub(e.target.value)} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchSubject();
                }
              }} 
            />
          </div>
          
          <div className="search-bar-v2">
            <input 
              type="text" 
              className="search-input-v2" 
              placeholder="Search by lecturer..." 
              value={lecturer} 
              onChange={(e) => setLecturer(e.target.value)} 
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchLecturer();
                }
              }} 
            />
          </div>
          
          <div className="bookings-v2">
            <a href="/bookings" className="bookings-link-v2">Your Bookings</a>
          </div>
          
          <div>
            <a href="/contactus" className="contactus-link-v2">Contact us</a>
          </div>
          
          <div className="profile-v2">
            <a href="/profile" className="profile-link-v2">Profile</a>
          </div>
          
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>
              
              <div className="tutee-background">
        <div className="search-results">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((item, index) => (
                <li key={index}>
                  <h3>{item.usrname}</h3>
                  <p>{item.tutoremail}</p>
                  <p>{item.teachcategory}</p>
                  <p>{item.phnumber}</p>
                  <p>{item.lecturedatetime}</p>
                  <button onClick={() => bookLecturer(item.tutoremail)}>
                    Book
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <img className='ok' src={tuteeimage} alt="tuteeimage"></img>
    )}
  </div>
</div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default TuteeMain;
