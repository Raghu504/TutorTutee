import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logoImage from '../images/logo.png'; 
import './tutordata.css'; // Import the CSS file

function Yourdata() {
    const navigate = useNavigate();
    const [tutormail, setTutoremail] = useState("");
    const [tutord, setTutordata] = useState([]); 

    const hh = JSON.parse(localStorage.getItem("emailz"));
    const email = hh?.email;

    useEffect(() => {
        const fetchTutorData = async () => {
            setTutoremail(email);
            try {
                if (tutormail) {  
                    const tutordata = await axios.post("http://localhost:4000/tutordata", { tutormail });
                    if (tutordata.data.status === "success") {
                        const ll = tutordata.data.kk;
                        setTutordata(ll);
                    } else {
                        console.log("Failed to fetch tutor data");
                    }
                }
            } catch (err) {
                alert("Error fetching data: " + err);
            }
        };
        fetchTutorData();
    }, [tutormail]);

    const handleClick = () => {
        navigate("/tutormain");
    };

    const cancelLecturer = async (id) => {
        try {
            await axios.post("http://localhost:4000/cancelBookings", { id });
            setTutordata(tutord.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="yourdata-container">
            <div className="yourdata-logo" onClick={handleClick}>
                <img src={logoImage} alt="Logo" className="yourdata-logo-image" />
            </div>
            <h2 className="yourdata-heading">Bookings Page</h2>
            {tutord.length > 0 ? (
                <ul className="yourdata-list">
                    {tutord.map((item, index) => (
                        <li key={index} className="yourdata-list-item">
                            <p className="yourdata-lecturer">Lecturer: {item.tutoremail}</p>
                            <p className="yourdata-subjects">Subjects: {Array.isArray(item.subjects) ? item.subjects.join(", ") : "N/A"}</p>
                            <p className="yourdata-date">Date: {item.date || "No date available"}</p>
                            <p className="yourdata-tuteemail">{item.tuteemail}</p>
                            <button className="yourdata-cancel-button" onClick={() => cancelLecturer(item.id)}>Cancel Booking</button> 
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="yourdata-no-bookings">No bookings available.</p>
            )}
        </div>
    );
}

export default Yourdata;