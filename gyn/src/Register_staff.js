import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';

const RegisterStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location.state !== undefined;

  const initialState = location.state || {
    id: null,
    full_name: "",
    phone_no: "",
    role: "consultant",  // Default value
    email: "",
    password: "",
    confirm_password: "", // Added confirm_password
    status: "active",    // Default value
  };

  const [values, setValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      setValues(location.state);
    }
  }, [location.state, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === "password") {
      if (value.length < 8) {
        setFormErrors({ ...formErrors, password: "Password must be at least 8 characters long." });
      } else {
        const { password, ...rest } = formErrors; // Remove password error if validation passes
        setFormErrors(rest);
      }
    }

    if (name === "confirm_password") {
      if (value !== values.password) {
        setFormErrors({ ...formErrors, confirm_password: "Passwords do not match." });
      } else {
        const { confirm_password, ...rest } = formErrors; // Remove confirm_password error if validation passes
        setFormErrors(rest);
      }
    }
  };

  const validate = () => {
    let errors = {};
    if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }
    if (values.password !== values.confirm_password) {
      errors.confirm_password = "Passwords do not match.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      if (isEditMode) {
        // Update existing staff member
        axios.put(`http://localhost:8081/staff_update/${values.id}`, values)
          .then(res => {
            console.log(res);
            alert("Staff Updated Successfully");
            navigate('/Register_staff'); // Redirect to the home page or another page after update
          })
          .catch(err => {
            console.log(err);
            alert("Error updating staff.");
          });
      } else {
        // Register new staff member
        axios.post('http://localhost:8081/staff_reg', values)
          .then(res => {
            console.log(res);
            alert("Staff Registered Successfully");
            setValues(initialState); // Reset form fields
            setFormErrors({}); // Clear errors
          })
          .catch(err => {
            console.log(err);
            alert("Error registering staff.");
          });
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <Nav />
      <form onSubmit={handleSubmit}>
        <header>{isEditMode ? "Update Staff" : "Staff Registration"}</header>
        <br />
        <div className="fields">
          <div className="input-field">
            <label htmlFor="fullname">Name : </label>
            <input 
              type='text' 
              name='full_name' 
              pattern="[A-Za-z]+" 
              title="Only alphabets are allowed" 
              placeholder='Enter your fullname' 
              value={values.full_name}
              onChange={handleChange} 
            />
          </div>
          <div className="input-field">
            <label htmlFor="phoneno">Phone No : </label>
            <input 
              type="tel" 
              pattern="[0-9]{10}" 
              maxLength="10" 
              name='phone_no' 
              placeholder='Enter your phone No' 
              value={values.phone_no}
              onChange={handleChange} 
            />
          </div>
        </div>
        <br />
        <div className="fields">
          <div className="input-field">
            <label htmlFor="email">Email : </label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              value={values.email}
              onChange={handleChange} 
            />
          </div>
        </div>
        <br />
        <div className="fields">
          <div className="input-field">
            <label htmlFor="password">Password: </label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter the password" 
              onChange={handleChange} 
            />
            {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="Cpassword">Confirm Password : </label>
            <input 
              type="password" 
              name="confirm_password" 
              placeholder="Confirm password" 
              value={values.confirm_password}
              onChange={handleChange} 
            />
            {formErrors.confirm_password && <p style={{ color: "red" }}>{formErrors.confirm_password}</p>}
          </div>
        </div>
        <div className="dropdownflex">
          <div className="input-fieldL">
            <label htmlFor="role">Role: </label>
            <select 
              name="role" 
              id="role" 
              value={values.role} 
              onChange={handleChange}
            >
              <option value="consultant">Consultant</option>
              <option value="registrar">Registrar</option>
              <option value="medical_officer">Medical Officer</option>
              <option value="data_entry">Data Entry</option>
            </select>
          </div>
          
          <div className="input-field">
            <label htmlFor="status">Status: </label>
            <select 
              name="status" 
              id="status" 
              value={values.status} 
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <br />
        <div className="btn1">
          <button type="submit">{isEditMode ? "Update" : "Register"}</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterStaff;
