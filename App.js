import './App.css';
import {  Route, Routes, Navigate, HashRouter, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateEmployee from './components/createEmployee';

function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/home' element={<Dashboard defaultTab="Home" />} />
          <Route path='/employeeList' element={<Dashboard defaultTab="EmployeeList" />} />
          <Route path='/edit_employee/:id' element={<Dashboard defaultTab="edit_employee" />} />
          <Route path='/create_employee' element={<Dashboard defaultTab="CreateEmployee" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
