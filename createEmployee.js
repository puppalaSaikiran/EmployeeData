import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import "./CreateEmployee.css";
import { useNavigate, useParams } from "react-router-dom";

const CreateEmployee = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: {
      MCA: false,
      BCA: false,
      BSC: false,
    },
    imgUpload: null,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      course: {
        ...formData.course,
        [name]: checked,
      },
    });
  };

  // Handle file upload changes
  const handleFileChange = (e) => {
    setFormData({ ...formData, imgUpload: e.target.files[0] });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data for the request
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobileNo", formData.mobileNo);
    formDataToSend.append("designation", formData.designation);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("course", JSON.stringify(formData.course)); // Convert course object to JSON string
    formDataToSend.append("imgUpload", formData.imgUpload);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set appropriate headers for file upload
          },
        }
      );

      console.log("Response: ", response.data);
      alert("Employee created successfully!");
      Navigate("/employeeList")
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="mobileNo">Mobile No:</label>
        <input
          type="text"
          id="mobileNo"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="designation">Designation:</label>
        <select
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
          className="form-input"
        >
          <option value="">Select</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      <fieldset className="form-group">
        <legend>Gender:</legend>
        <label>
          <input
            type="radio"
            name="gender"
            value="M"
            checked={formData.gender === "M"}
            onChange={handleInputChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="F"
            checked={formData.gender === "F"}
            onChange={handleInputChange}
          />
          Female
        </label>
      </fieldset>

      <fieldset className="form-group">
        <legend>Course:</legend>
        <label>
          <input
            type="checkbox"
            name="MCA"
            checked={formData.course.MCA}
            onChange={handleCheckboxChange}
          />
          MCA
        </label>
        <label>
          <input
            type="checkbox"
            name="BCA"
            checked={formData.course.BCA}
            onChange={handleCheckboxChange}
          />
          BCA
        </label>
        <label>
          <input
            type="checkbox"
            name="BSC"
            checked={formData.course.BSC}
            onChange={handleCheckboxChange}
          />
          BSC
        </label>
      </fieldset>

      <div className="form-group">
        <label htmlFor="imgUpload">Image Upload:</label>
        <input
          type="file"
          id="imgUpload"
          name="imgUpload"
          onChange={handleFileChange}
          className="form-input"
        />
      </div>

      <button type="submit" className="submit-button">Submit</button>
    </form>

  );
};

export default CreateEmployee;
