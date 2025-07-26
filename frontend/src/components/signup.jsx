import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usern, setUsern] = useState("");
    const [role, setRole] = useState("");
    // const [servercode,setServercode]=useState("");
    const [phnum,setPhnum]=useState("");
    
    const navigate = useNavigate();


    localStorage.setItem("roles",JSON.stringify({ role:role}));   
    localStorage.setItem("emails",JSON.stringify({ email:username}));
    const handlesSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                username: usern,
                email: username,
                password: password,
                role: role,
            };

            const res = await axios.post("http://localhost:4000/signup", data);
            if (res.data.status === "success") {
                    navigate("/emailVerification")
            } else {
                alert("Already account is present")
                navigate(res.data.redirect);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const phnumcode=async (e)=>{
      e.preventDefault();
      try{
        const response=await axios.post("http://localhost:4000/phnumver",phnum);
      }
      catch(err){
        alert(err);
      }
    }
    return (
      <div className="main1">
        <div className="logo">
            <a href="/" className="logo-link">MyWebsite</a>
          </div>
        <div className="signup-wrapper">
  <div className="signup-container">
    
    <form className="signup-form" onSubmit={handlesSubmit}>
      <h3 className="signup-title">SignUp</h3>
      <input
        className="signup-input"
        type="text"
        placeholder="Enter username"
        required
        onChange={(e) => setUsern(e.target.value)}
        value={usern}
      />
      <input
        className="signup-input"
        type="email"
        placeholder="Enter your email"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="signup-input"
        type="password"
        placeholder="Enter your password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* <button onClick={Codesending}>
        Send code
      </button> */}
      <select
        className="signup-select"
        name="role"
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="" disabled selected>
          Select a Role
        </option>
        <option value="tutor">Tutor</option>
        <option value="tutee">Tutee</option>
      </select>
      {/* <input
        type="number"
        placeholder="Enter phone number"
        required
        value={phnum}
        onChange={(e)=>setPhnum(e.target.value)}
        onClick={phnumcode}
      /> */}
      
      
      
      <button className="signup-submit" type="submit">Submit</button>
    </form>
  </div>

  <div className="or-divider">
    <hr className="line" />
    <span className="or-text">or</span>
    <hr className="line" />
  </div>
  <div className="signup-google">
    <button className="signup-google-button">Signup with Google</button>
  </div>
</div>

      </div>
        

    );
}

export default Signup;
