import '../App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from '../component/Nav.jsx';
import NavBar from '../component/NavBar.jsx';

const UpdateStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location.state !== undefined;

  const initialState = {
    id: null,
    full_name: "",
    phone_no: "",
    role: "consultant",  // Default value
    email: "",
    password: "", // New password field
    confirm_password: "", // Confirm new password field
    status: "active",    // Default value
    ...location.state,   // Override defaults with any existing state, except password
  };

  // Remove hashed password from initialState
  if (initialState.password) {
    delete initialState.password;
  }

  const [values, setValues] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === "password") {
        if (value.length < 8 && value.length > 0) {
            setFormErrors({ ...formErrors, password: "Password must be at least 8 characters long." });
        } else {
            const { password, ...rest } = formErrors; // Remove password error if validation passes
            setFormErrors(rest);
        }
    }

    if (name === "confirm_password") {
        if (values.password && value !== values.password) {
            setFormErrors({ ...formErrors, confirm_password: "Passwords do not match." });
        } else {
            const { confirm_password, ...rest } = formErrors; // Remove confirm_password error if validation passes
            setFormErrors(rest);
        }
    }
  };

  const validate = () => {
    let errors = {};
    if (values.password && values.password.length < 8) {
        errors.password = "Password must be at least 8 characters long.";
    }
    if (values.password && values.password !== values.confirm_password) {
        errors.confirm_password = "Passwords do not match.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      try {
        if (isEditMode) {
          // Update existing staff member
          await axios.put(`http://localhost:8081/staff_update/${values.id}`, values);
          alert("Staff Updated Successfully");
          navigate('/staff_information'); // Redirect to the staff information page after update
        } 
      } catch (err) {
        console.log(err);
        alert("Error updating staff.");
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
        <h2>Update Staff</h2>
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
            <label htmlFor="new_password">New Password: </label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter a new password" 
              value={values.password}
              onChange={handleChange} 
            />
            {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="confirm_password">Confirm Password : </label>
            <input 
              type="password" 
              name="confirm_password" 
              placeholder="Confirm new password" 
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
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <br />
        <div className="btn1">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStaff;
