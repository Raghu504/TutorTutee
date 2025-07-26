import React,{useState,useEffect} from "react";
import axios from "axios";

function Profile({id,role}){
    const [username, setUser] = useState("");
    const [email,setEmail]=useState("")
    alert(id);
    alert(role);

    useEffect(()=>{
        const fetchUserData = async () => {
            try {
                const r=await axios.get(`http://localhost:4000/profiledata/${id}/${role}`);
                alert(r.data.status);
                if(r.data.status==="success"){
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
                alert("ok");
            }
        }
        fetchUserData();
    },[id,role])
    return(
        <div>
            <div className="logo-v2">
            <a href="/tuteemain" className="logo-link-v2">MyWebsite</a>
            </div>
            <h2>👤</h2>
            <h3>{username}</h3>
            <h3>{email}</h3>
        </div>
    )
}

export default Profile;