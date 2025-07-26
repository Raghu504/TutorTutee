import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function StudentForm() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    age: "",
    dob: "",
    collegeSchoolName: "",
    rightNowStudying: "",
    email:"",
  });
  localStorage.setItem("rnstudying",JSON.stringify({rns:formData.rightNowStudying}));
  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData); 
    handleFormSubmission(formData);
  };

  const handleFormSubmission =async (e) => {
    alert(formData.firstName)
    const d={
        fname:formData.firstName,
        lname:formData.lastName,
        email:formData.email,
        phnumber:formData.mobileNumber,
        age:formData.age,
        dateofbirth:formData.dob,
        cname:formData.collegeSchoolName,
        rnstudying:formData.rightNowStudying,
    }
    try{
        const gg=await axios.post("http://localhost:4000/tuteeform",d);
        if(gg.data.status==="success"){
            navigate("/tuteemain");
        }
        else{
            alert("not inserted into table");
        }
    }
    catch(err){
        alert(err);
    }
    
  };

  return (
    <div className="form-container">
      <h1>Student Registration Form</h1>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>

        {/* Last Name */}
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date of Birth:
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          College/School Name:
          <input
            type="text"
            name="collegeSchoolName"
            value={formData.collegeSchoolName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Right Now Studying:
          <select
            name="rightNowStudying"
            value={formData.rightNowStudying}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="pre-primary education">Pre-Primary Education</option>
            <option value="primary education">Primary Education</option>
            <option value="secondary education">Secondary Education</option>
            <option value="college/university">College/University</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default StudentForm;