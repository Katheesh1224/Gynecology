import '../App.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import { toast } from 'react-toastify';
import Footer from '../Component/Footer.jsx';

const RegisterStaff = () => {
  // const initialState = 

  const [values, setValues] = useState({
    id: null,
    full_name: "",
    phone_no: "",
    role: "consultant",
    email: "",
    password: "",
    confirm_password: "",
    status: "active",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFullNameValid, setIsFullNameValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
      axios.post('http://localhost:5000/staff/staff_reg', values)
        .then(res => {
          toast.success('Staff registered successfully!');
          navigate('/staff_information');
          setFormErrors({});
        })
        .catch(err => {
          const errorMessage = err.response?.data?.error || err.response?.data?.details || 'An unexpected error occurred.';
          toast.error(`There was an error submitting the form: ${errorMessage}`);
        });
  };

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    setValues({ ...values, [name]: value });

    let errors = { ...formErrors };

    switch (name) {
      case "password":
        if (value.length < 8) {
          errors.password = "Password must be at least 8 characters long.";
        } else {
          delete errors.password;
        }
        break;

      case "confirm_password":
        if (value !== values.password) {
          errors.confirm_password = "Passwords do not match.";
        } else {
          delete errors.confirm_password;
        }
        break;

      case "full_name":
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          setIsFullNameValid(false);
          errors.full_name = "Only alphabets are allowed.";
        } else {
          setIsFullNameValid(true);
          delete errors.full_name;
        }
        break;

      case "phone_no":
        if (!/^[0-9]*$/.test(value)) {
          setIsPhoneNumberValid(false);
          errors.phone_no = "Only numbers are allowed.";
        } else {
          setIsPhoneNumberValid(true);
          delete errors.phone_no;
        }
        break;

      case "email":
        if (value === "") { 
          setIsEmailValid(true); 
          delete errors.email; 
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setIsEmailValid(false);
          errors.email = "Please enter a valid email address.";
        } else {
          setIsEmailValid(true);
          delete errors.email;
        }
        break;

      default:
        break;
    }

    setFormErrors(errors);
  };


  return (
    <div className='wrapper'>
      <NavBar />
      <Chatbot/>
      <div className='main-content'>
        <Nav />
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h2 style={{fontWeight:"bold"}} >Staff Registration</h2>
            <div className="fields">
              <div className="input-field">
                <label htmlFor="fullname">Full Name:</label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={values.full_name}
                  onChange={handleChange}
                  style={{ borderColor: isFullNameValid ? '#aaa' : 'red' }}
                />
                {formErrors.full_name && <p style={{ color: "red" }}>{formErrors.full_name}</p>}
              </div>
              <div className="input-field">
                <label htmlFor="phoneno">Phone Number:</label>
                <input
                  type="tel"
                  maxLength="10"
                  name='phone_no'
                  placeholder='Enter your phone number'
                  value={values.phone_no}
                  onChange={handleChange}
                  style={{ borderColor: isPhoneNumberValid ? '#aaa' : 'red' }}
                />
                {formErrors.phone_no && <p style={{ color: "red" }}>{formErrors.phone_no}</p>}
              </div>
            </div>
            <div className="fields">
              <div className="input-field">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  // style={{ borderColor: isEmailValid ? '#aaa' : 'red' }}
                />
                {formErrors.email && <p style={{ color: "blue" }}>{formErrors.email}</p>}
              </div>
            </div>
            <div className="fields">
              <div className="input-field">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter the password"
                  value={values.password}
                  onChange={handleChange}
                />
                {formErrors.password && <p style={{ color: "blue" }}>{formErrors.password}</p>}
              </div>
              <div className="input-field">
                <label htmlFor="confirm_password">Confirm Password:</label>
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm password"
                  value={values.confirm_password}
                  onChange={handleChange}
                />
                {formErrors.confirm_password && <p style={{ color: "blue" }}>{formErrors.confirm_password}</p>}
              </div>
            </div>
            <div className="dropdownflex">
              <div className="input-fieldL">
                <label htmlFor="role">Role:</label>
                <select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  style={{width:'195px'}}
                >
                  <option value="consultant">Consultant</option>
                  <option value="registrar">Registrar</option>
                  <option value="medical_officer">Medical Officer</option>
                  <option value="data_entry">Data Entry</option>
                </select>
              </div>
              <div className="input-fieldL">
                <label htmlFor="status">Status:</label>
                <select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  style={{width:'195px'}}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="btn1">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterStaff;
