import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./employeeList.css";

const EmployeeList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCreateEmployee = () => {
    navigate("/create_employee");
  };

  const handleEditEmployee = (id) => {
    navigate(`/edit_employee/${id}`);
  };

  return (
    <div>
      <button className="create-button" onClick={handleCreateEmployee}>
        Create Employee
      </button>

      <div className="table-container">
        <h2>All Employees</h2>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.img_upload}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile_no}</td>
                <td>{user.designation}</td>
                <td>{user.gender}</td>
                <td>{user.course}</td>
                <td>{user.createDate}</td>
                
                <td>
                  <button onClick={() => handleEditEmployee(user.id)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
