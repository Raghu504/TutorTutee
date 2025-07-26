import React, { useState, useEffect } from "react";
import Footer from "./footer.jsx";
import axios from "axios";
import "./book.css";
function Bookings() {
  const [bookdata, setBookdata] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const mail = JSON.parse(localStorage.getItem("emailz"));
    if (mail?.email) {
      setEmail(mail.email);
    }
  }, []);

  useEffect(() => {
    const bookingdata = async () => {
      if (!email) return;
      try {
        const res = await axios.post("http://localhost:4000/bookeddata", { tuteemail: email });
        if (res.data.status === "success") {
          setBookdata(res.data.d || []);
        } else {
          setBookdata([]);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };

    bookingdata();
  }, [email]);

  const cancelLecturer = async (id) => {
    try {
      const response = await axios.post("http://localhost:4000/cancleBooking", { id });
      if (response.data.status === "success") {
        alert("Booking canceled");
        setBookdata(bookdata.filter((item) => item.id !== id));
      } else {
        alert("Cancellation failed");
      }
    } catch (err) {
      console.error("Error canceling booking:", err);
    }
  };

  return (
    <div className="page-container">
      {/* <div className="logo-v2" onClick={handleClick}>
              <img src={logoImage} alt="Logo" className="logo-image-v2" />
      </div> */}

      <h2 className="page-title">Bookings Page</h2>

      <div className="bookings-container">
        {bookdata.length > 0 ? (
          bookdata.map((item, index) => (
            <div key={index} className="booking-card">
              <h3 className="booking-title">Lecturer: {item.tutoremail}</h3>
              <p className="booking-text">Subjects: {Array.isArray(item.subjects) ? item.subjects.join(", ") : "N/A"}</p>
              <p className="booking-text">Date: {item.date || "No date available"}</p>
              <button className="cancel-button" onClick={() => cancelLecturer(item.id)}>Cancel Booking</button>
            </div>
          ))
        ) : (
          <p className="no-bookings-message">No bookings available.</p>
        )}
      </div>

      
    </div>
  );
}

export default Bookings;
