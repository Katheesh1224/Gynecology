import './login.css';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import React ,{ useState } from 'react';
import { Link } from 'react-router-dom';
import {home} from './home';
import {patient_registration} from './patient_registration.js';


export const Login = () => {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }


    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // setFormErrors(validate(formValues));
        setIsSubmit(true);  

        if(!(formErrors.email)&& !(formErrors.password)){
            axios.post('http://localhost:8081/login',formValues).then(res =>{
                if(res.data ==="Success"){
                    navigate('/home');
                }else{
                    alert("no record existed");
                }
            })
            .catch(err=>console.log(err));
        }
    }
    const handleClick = () => {
        navigate('/patient_registration');

    }
    return (
        <div className="containerL" id="containerL">
        <div className="form-container sign-in">
            <form>
                <h1>Sign In</h1>
                <br />
                <input type="text" name="email" placeholder="Email" />
                <input type="password" name="password" placeholder="Password" />
                <a href="#">Forget Your Password?</a>
                <button>Sign In</button>
                {/* <Link to="/patient_registration.jsx">patient_registration_Form</Link> */}
                <button onClick={handleClick}>patient_registration_Form</button>
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
        
    )
};

export default Login;
