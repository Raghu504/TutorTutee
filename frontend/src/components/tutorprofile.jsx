import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from '../images/logo.png'; 
function Tutorprofile({ id, role }){
    const [username, setUser] = useState("");
    const [email,setEmail]=useState("");
      const navigate=useNavigate();
    
    useEffect(()=>{
        const fetchUserData = async () => {
            try {
                const r=await axios.get(`http://localhost:4000/profiledata/${id}/${role}`);
                
                if(r.data.status==="success" && r.data.username){
                    const username=r.data.username;
                    const email=r.data.email;
                    setUser(username);
                    setEmail(email);
                }
                else{
                    alert("no profile data");
                }
                    
            }
            catch(err){
                alert(err);
            }
        }
        fetchUserData();
    },[id,role])
    const handleClick = () => {
        navigate("/tutormain");
      };
    return(
        <div>
            <div className="logo-v2" onClick={handleClick} style={{ cursor: "pointer" }}>
                          <img src={logoImage} alt="Logo" className="logo-image-v2" />
                      </div>
            <h2>👤</h2>
            <h3>{username}</h3>
            <h3>{email}</h3>
        </div>
    )
}

export default Tutorprofile;