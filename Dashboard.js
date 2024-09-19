import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./dashboard.css";
import Cookies from 'js-cookie'
import Employeelist from "./Employeelist";
import CreateEmployee from "./createEmployee";
import EditEmployee from "./editEmployee";
import Dash from "./Dash";
const Dashboard = ({ defaultTab }) => {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState(defaultTab || "Home");
  const username = Cookies.get('name');


  const menuItems = [
    { id: "home", name: "Home" },
    
    { id: "employeeList", name: "EmployeeList" },
  ];

  useEffect(() => {
    if (defaultTab) {
      setSelectedView(defaultTab);
    }
  }, [defaultTab]);

  const handleMenuItemClick = (view) => {
    setSelectedView(view)
    navigate(`/${view.toLowerCase()}`);
  };

  const handleLogoutClick = () => {
    Object.keys(Cookies.get()).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    navigate("/");
  };

  const renderContent = () => {
    switch (selectedView) {
      case "Home":
        return <Dash />
      case "CreateEmployee":
        return <CreateEmployee />

      case "edit_employee":
        return <EditEmployee />
      case "EmployeeList":
        return <Employeelist />

      default:
    }
  };

  return (
    <div className="CreateDash_Navbody">
      <div className="CreateDash_top-panel">
        <ul className="CreateDash_menu">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => handleMenuItemClick(item.name)}
              className={selectedView === item.name ? "active" : ""}
            >
              {item.name}
            </li>
          ))}
          <li>
           {username}
            <i
              class="fa fa-sign-out"
              aria-hidden="true"
              style={{marginLeft:"40px", marginRight: "10px" }}
            ></i>
            Logout
          </li>
        </ul>
      </div>
      <div className="CreateDash_content">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;



