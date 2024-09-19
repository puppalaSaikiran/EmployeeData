import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
import Cookies from 'js-cookie'

// Renaming the component to avoid conflict
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/login",formData);
    console.log("response :", response);
    if(response.status === 200){
      console.log(response.data);
      Cookies.set('name', response.data.user.name, { expires: 7 });
      console.log("User Found");
      navigate("/dashboard");
    }
    else{
      console.log("user not found")
    }
    console.log("fromData", formData);
  };

  return (
    <div className="login">
      {contextHolder} {/* Render the context holder at the top level */}
      <div className="loginContainer">

        <div className="loginDetail">
          <div>
            <h3>Login</h3>
          </div>
          <div>
            <form onSubmit={handleFormSubmit}>
              <input
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                type="text"
                placeholder="Enter username"
              />
              <input
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                type="text"
                placeholder="Enter password"
              />
              <button type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
