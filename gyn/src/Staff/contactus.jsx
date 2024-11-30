import '../App.css';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import Footer from '../Component/Footer.jsx';
import axios from 'axios';

const Contactus = () => {
  const [values, setValues] = useState({
    email: "",
    username: "",
    complaints: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    let errors = { ...formErrors };

    switch (name) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setIsEmailValid(false);
          errors.email = "Please enter a valid email address.";
        } else {
          setIsEmailValid(true);
          delete errors.email;
        }
        break;

      case "username":
        if (value.trim() === "") {
          errors.username = "Username is required.";
        } else {
          delete errors.username;
        }
        break;

      case "complaints":
        if (value.trim() === "") {
          errors.complaints = "Complaints cannot be empty.";
        } else {
          delete errors.complaints;
        }
        break;

      default:
        break;
    }

    setFormErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(formErrors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    axios
      .post('http://localhost:8081/contact_us', values)

      .then((res) => {
        toast.success('Your complaint has been submitted successfully!');
        setValues({ email: "", username: "", complaints: "" });
        setFormErrors({});
      })
      .catch((err) => {
        toast.error('There was an error submitting the form. Please try again.');
      });
  };

  return (
    <div className='wrapper'>
      <NavBar />
      <Chatbot />
      <div className='main-content'>
        <Nav />
        <div className="container3">
          <form onSubmit={handleSubmit}>
            <div className='title'>Contact Us</div>
            <br />
            <div className="content3">
            <div className="user-details">
              <div className="input-box">
                <label htmlFor="details">Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  style={{ borderColor: isEmailValid ? '#aaa' : 'red' }}
                />
                {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}
              </div>
            
              <div className="input-box">
                <label htmlFor="details">Username:</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={values.username}
                  onChange={handleChange}
                />
                {formErrors.username && <p style={{ color: "red" }}>{formErrors.username}</p>}
              </div>
              
              <div className="input-box">
                <label htmlFor="details">Complaints:</label>
                <br/>
                <textarea
                  name="complaints"
                  placeholder="Enter your complaints"
                  value={values.complaints}
                  onChange={handleChange}
                />
                {formErrors.complaints && <p style={{ color: "red" }}>{formErrors.complaints}</p>}
              </div>
            <div className="btn3">
              <button type="submit">Submit</button>
            </div>
            </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contactus;
