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
      .post('http://localhost:5000/contact_us', values)

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
        <div className="contact-container">
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontWeight: "bold" }}>Contact Us</h2>
              <div >
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                  className="contact-input"
                />
                {formErrors.username && <p style={{ color: "red" }}>{formErrors.username}</p>}
              </div>
              <div >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  className="contact-input"
                  style={{ borderColor: isEmailValid ? '#aaa' : 'red' }}
                />
                {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}
              </div>

              <div >
                <textarea
                  name="complaints"
                  placeholder="Message"
                  value={values.complaints}
                  onChange={handleChange}
                  className="contact-textarea"
                />
                {formErrors.complaints && <p style={{ color: "red" }}>{formErrors.complaints}</p>}
              </div>

              <button className='contact_button' type="submit">Submit</button>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contactus;
