import '../App.css';
import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom'; 
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import { toast } from 'react-toastify'; // Import toast from react-toastify


const RegisterStaff = () => {
  const initialState = {
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

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:8081/staff_reg', values)
        .then(res => {
          console.log(res);
          toast.success('Form submitted successfully!');
          navigate('/staff_information');

          setValues(initialState); // Reset form fields
          setFormErrors({}); // Clear errors
        })
        .catch(err => {
          console.log(err);

          let errorMessage = 'An unexpected error occurred.';
          
          if (err.response && err.response.data) {
              errorMessage = err.response.data.error || err.response.data.details || errorMessage;
          }
          toast.error(`There was an error submitting the form: ${errorMessage}`);
        });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className='wrapper'>
      <NavBar />
      <div className='main-content'>
        <Nav />
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h2>Staff Registration</h2>
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
                  value={values.password} 
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
                  id="status" 
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
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterStaff;