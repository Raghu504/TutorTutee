import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./form.css"; 

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    dob: "",
    email: "",
    mobileNumber: "",
    subjects: [],
    experience: "",
    qualification: "",
    address: "",
    pincode: "",
    state: "",
    category: "",
  });
  const navigate = useNavigate();

  const subjectsList = [
    "Biology",
    "Chemistry",
    "Computer Science",
    "Economics",
    "English",
    "Geography",
    "History",
    "Mathematics",
    "Physics",
    "Political Science",
    "Psychology",
    "Sociology",
  ].sort();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectsChange = (e) => {
    const { options } = e.target;
    const selectedSubjects = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData({ ...formData, subjects: selectedSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const d = {
        fn: formData.firstName,
        lna: formData.lastName,
        age: formData.age,
        dob: formData.dob,
        email: formData.email,
        phnum: formData.mobileNumber,
        sub: formData.subjects,
        exp: formData.experience,
        quali: formData.qualification,
        addr: formData.address,
        pinc: formData.pincode,
        ste: formData.state,
        teachcategory:formData.category,
      };
      alert(formData.subjects);
      alert(formData.category);
      const res = await axios.post("http://localhost:4000/teachform", d);
      if (res.data.status === "success") {
        navigate("/login");
      } else {
        navigate("/teachform");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container1">
      <form className="form1" onSubmit={handleSubmit}>
        <h1 className="form-heading1">Tutor Data</h1>
        <label className="form-label">
          First Name:
          <input
            className="form-input1"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label1">
          Last Name:
          <input
            className="form-input1"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label1">
          Age:
          <input
            className="form-input1"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label1">
          Date of Birth:
          <input
            className="form-input1"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label1">
          Email:
          <input
            className="form-input1"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label1">
          Mobile Number:
          <input
            className="form-input1"
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label1">
          Subjects You Teach (To select more subjects press Ctrl and select subjects):
          <select
            className="form-select1"
            multiple
            name="subjects"
            value={formData.subjects}
            onChange={handleSubjectsChange}
            required
          >
            {subjectsList.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </label>
        <label className="form-label1">
          Category:
          <select
            className="signup-select1"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a Role
            </option>
            <option value="pre-primary education">Pre-Primary Education</option>
            <option value="primary education">Primary Education</option>
            <option value="secondary education">Secondary Education</option>
            <option value="college/university">College/University</option>
          </select>
        </label>
        <label className="form-label1">
          Experience (in years):
          <input
            className="form-input1"
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label1">
          Major Education Qualification:
          <input
            className="form-input1"
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label1">
          Address:
          <textarea
            className="form-textarea1"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label1">
          Pincode:
          <input
            className="form-input1"
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </label>
        <label className="form-label1">
          State:
          <input
            className="form-input1"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </label>
        <button className="form-button1" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
