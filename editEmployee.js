import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './employee.css';

const EditEmployee = () => {
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
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`);
      const user = response.data;

      // Populate form with existing data
      setFormData({
        name: user.name,
        email: user.email,
        mobileNo: user.mobile_no,
        designation: user.designation,
        gender: user.gender,
        course: {
          MCA: user.course.includes("MCA"),
          BCA: user.course.includes("BCA"),
          BSC: user.course.includes("BSC"),
        },
        imgUpload: null, // You may choose to display existing image or allow re-upload
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

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

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("mobileNo", formData.mobileNo);
      formDataObj.append("designation", formData.designation);
      formDataObj.append("gender", formData.gender);
      formDataObj.append("course", JSON.stringify(formData.course));
      if (formData.imgUpload) {
        formDataObj.append("imgUpload", formData.imgUpload);
      }

      await axios.put(`http://localhost:5000/api/users/${id}`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/employeeList");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    navigate("/employeeList");
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
      <div className="form-group">
        <span>Gender:</span>
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
      </div>
      <div className="form-group">
        <span>Course:</span>
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
      </div>
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
      <div>
        <button type="submit" className="submit-button">Update Employee</button>
        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditEmployee;
