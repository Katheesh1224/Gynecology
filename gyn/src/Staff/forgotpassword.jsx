import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Footer from '../Component/Footer.jsx';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); 
  const navigate = useNavigate();

  const [values, setValues] = useState({ password: '', confirm_password: '' });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    if (name === "password") {
      if (value.length < 8) {
        setFormErrors({ ...formErrors, password: "Password must be at least 8 characters long." });
      } else {
        const { password, ...rest } = formErrors;
        setFormErrors(rest);
      }
    }

    if (name === "confirm_password") {
      if (value !== values.password) {
        setFormErrors({ ...formErrors, confirm_password: "Passwords do not match." });
      } else {
        const { confirm_password, ...rest } = formErrors;
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

  const handleRequestOtp = async () => {
    try {
      await axios.post('http://localhost:5000/staff/forgotpassword', { email });
      setStep(2);
      toast.success('OTP sent');
    } catch (err) {
      console.error(err);
      toast.error('Error sending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post('http://localhost:5000/staff/verifyotp', { email, otp });
      setStep(3);
    } catch (err) {
      console.error(err);
      toast.error('Invalid or expired OTP');
    }
  };


  // handleSubmit function for form submission with error handling
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:5000/staff/resetpassword', { email, newPassword: values.password })
        .then(res => {
          console.log(res);
          toast.success('Password Reset successfully!');
          navigate('/login');
          setFormErrors({});
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
    <div>
      {step === 1 && (
        <div>
          <h2>Forgot Password</h2>
          <div className="fields">
            <div className="input-field">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                size={50}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <br />
          <center><button onClick={handleRequestOtp}>Request OTP</button></center>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Verify OTP</h2>
          <div className="fields">
            <div className="input-field">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>
          <br />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}> {/* Wrap in a form to enable handleSubmit */}
          <h2>Reset Password</h2>
          <div className="fields">
            <div className="input-field">
              <input 
                type="password" 
                name="password" 
                placeholder="Enter new password" 
                value={values.password} 
                onChange={handleChange} 
              />
              {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}
            </div>
            <div className="input-field">
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
          <center><button type="submit" disabled={Object.keys(formErrors).length > 0}>Reset Password</button></center>
        </form>
      )}
      <Footer />
    </div>
  );
};

export default ForgotPassword;
