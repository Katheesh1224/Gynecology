import './login.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PReg } from './patient_registration';

export const Login = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignInForm/>} />
                <Route path="/patient_registration" element={<PReg />} />
            </Routes>
        </Router>
    );
};

const SignInForm = () => {
    return (
        <div className="containerL" id="containerL">
            <div className="form-container sign-in">
                <form>
                    <h1>Sign In</h1>
                    <br />
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <a href="#">Forget Your Password?</a>
                    <button>Sign In</button>
                    <Link to="/patient_registration">patient_registration_Form</Link>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-right">
                        <h1>GYN WARD</h1>
                        <p>A compassionate team is committed to women's health, offering specialized care with empathy and expertise</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
