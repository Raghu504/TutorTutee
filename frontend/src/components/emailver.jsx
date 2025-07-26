import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import "./emailverr.css";

function Emailver() {
  const [serverCode, setServerCode] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [role,setRole]=useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("emails"));
    const emailFromStorage = storedData?.email;

    const roles=JSON.parse(localStorage.getItem("roles"));
    const rr=roles?.role;
    setRole(rr);
    setEmail(emailFromStorage);

    const sendCode = async () => {
      if (!emailFromStorage) {
        alert("No email found in localStorage.");
        return;
      }
      try {
        const response = await axios.post("http://localhost:4000/codesent", { email: emailFromStorage });
        setServerCode(response.data.code);
        alert("Code sent!");
      } catch (err) {
        alert("Failed to send verification code. Please try again.");
      }
    };

    sendCode();
  }, []);

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code === serverCode) {
      setStatus("success");
      if(role==="tutor"){
        navigate("/teachform");
      }
      else{
        navigate("/tuteeform");
      }
    } else {
      setStatus("failure");
      alert("Incorrect verification code. Please try again.");
    }
  };

  return (
    <div className="fullscreen-container">
      <div className="verification-container">
        <h3>Almost there!</h3>
        <p>We have sent an email to {email || "your email"}.</p>
        <p>Please enter the verification code:</p>

        <form onSubmit={handleVerifyCode}>
          <input
            className="verification-input"
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button className="verify-button" type="submit">
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
}

export default Emailver;
  