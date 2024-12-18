import '../App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import { toast } from 'react-toastify';
import Footer from '../Component/Footer.jsx';

const EditStaff = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get userId from localStorage
  const [values, setValues] = useState({
    id: null,
    full_name: "",
    phone_no: "",
    role: "consultant",
    email: "",
    status: "active",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    // Fetch user data based on userId
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/staff/staff_information${userId}`);
        setValues(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      toast.error("User ID not found in localStorage.");
      navigate('/login'); // Redirect to login if no userId
    }
  }, [userId, navigate]);

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
        await axios.put(`http://localhost:8081/staff_update/${userId}`, values);
        toast.success('Staff Updated Successfully');
        navigate('/backup');
      } catch (err) {
        console.error(err);
        toast.error("Error updating staff.");
      }
    } else {
      setFormErrors(errors);
    }
  };

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="wrapper">
      <NavBar />
      <Chatbot />
      <div className="main-content">
        <Nav />
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontWeight: "bold" }}>Update Staff</h2>
            <br />
            <div className="fields">
              <div className="input-field">
                <label htmlFor="fullname">Full Name:</label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={values.full_name}
                  onChange={handleChange}
                />
              </div>
              <div className="input-field">
                <label htmlFor="phoneno">Phone Number:</label>
                <input
                  type="tel"
                  maxLength="10"
                  name="phone_no"
                  placeholder="Enter your phone number"
                  value={values.phone_no}
                  onChange={handleChange}
                />
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
                />
              </div>
            </div>

            {showPasswordFields && (
              <div className="fields">
                <div className="input-field">
                  <label htmlFor="new_password">New Password: </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter a new password"
                    onChange={handleChange}
                  />
                  {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}
                </div>
                <div className="input-field">
                  <label htmlFor="confirm_password">Confirm Password: </label>
                  <input
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm new password"
                    onChange={handleChange}
                  />
                  {formErrors.confirm_password && <p style={{ color: "red" }}>{formErrors.confirm_password}</p>}
                </div>
              </div>
            )}

            <div className="dropdownflex">
              <div className="input-fieldL">
                <label htmlFor="role">Role: </label>
                <select name="role" id="role" value={values.role} onChange={handleChange}>
                  <option value="consultant">Consultant</option>
                  <option value="registrar">Registrar</option>
                  <option value="medical_officer">Medical Officer</option>
                  <option value="data_entry">Data Entry</option>
                </select>
              </div>

              <div className="input-field">
                <label htmlFor="status">Status: </label>
                <select name="status" id="status" value={values.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <br />
            <div className="btn1">
              <button type="button" id="btn2" onClick={togglePasswordFields}>
                {showPasswordFields ? "Hide Password Fields" : "Edit Password"}
              </button>
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditStaff;
