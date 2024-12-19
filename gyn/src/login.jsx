import './login.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import Footer from './Component/Footer.jsx';


export const Login = () => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/staff/login', formValues);
        console.log('response.data', response.data)
        const { token, role, userId} = response.data;
        console.log('Login successful:', token);
        login(token, role, userId);
       

        if (role === 'superadmin') {
          navigate('/home'); // Redirect to backup.jsx
        } else {
          navigate('/backup'); // Redirect to home for other roles
        }
      } catch (err) {
        console.error('Login failed:', err);
        toast.error('Invalid credentials');
      }
    }
  };
const notify = () => toast("Please contact your administrator to reset your password");

  const validate = (values) => {
    const errors = {};
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 15) {
      errors.password = "Password cannot exceed more than 10 characters!";
    }
    return errors;
  };

  return (
    <div className="containerL" id="containerL">
      <div className="form-container sign-in">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <br />
          <input type="text" name="email" placeholder="Email" value={formValues.email} onChange={handleChange} />
          {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}
          <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
          {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}
          <Link to="/forgotpassword">Forgot Password?</Link>
          <button type='submit'>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h1>GYN WARD</h1>
            <p style={{ color: "white" }}>A compassionate team is committed to women's health, offering specialized care with empathy and expertise</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
