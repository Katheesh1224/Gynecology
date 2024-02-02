import './login.css';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import React ,{ useState } from 'react';


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
        setFormErrors(validate(formValues));
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
    const validate = (values) => {
        const errors = {}
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;


        if (!values.email) {
            errors.email = "email is required!"
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!"
        }


        if (!values.password) {
            errors.password = "password is required!"
        } else if (values.password.length < 4) {
            errors.password = "password must be more than 4 characters!"
        }
        else if (values.password.length > 10) {
            errors.password = "password can not exceed more than 10 characters!"
        }


        return errors;
    }
    
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

                <a href="#">Forget Your Password?</a>
                <button type='submit'>Sign In</button>
                
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
