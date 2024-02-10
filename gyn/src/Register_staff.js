import './App.css';
import axios from 'axios';
import React ,{ useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser } from '@fortawesome/free-solid-svg-icons'

const  Register_staff = () =>{
    const navigate = useNavigate();
    
    const [values,setValues] =useState({
        full_name:"",
        phone_no:"",
        role:"",
        email:"",
        password:"",
        status:""
    })

    const handleChange =(e) =>{
        const {name,value} =e.target;
        setValues({ ...values,[name]:value});
    }


    const handleSubmit =(e) =>{
        console.log(e);
        e.preventDefault();
        axios.post('http://localhost:8081/staff_reg',values)
        .then(res =>{
            console.log(res);
         
        })
        .catch(err =>console.log(err))
        navigate('/home');
    }
  

    
    return(
        <div className="container">
            <div>
          <header id="header" class="d-flex flex-column justify-content-center">
            <nav id="navbar" class="navbar nav-menu">
              <ul>
                <li><a href="home" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Home</span></a></li>
                <li><a href="patient_registration" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Patient Registration</span></a></li>
                <li><a href="Register_staff" class="nav-link scrollto active"><FontAwesomeIcon icon={faRectangleList} /><span>Staff Registration</span></a></li>
                <li><a href="patient_person" class="nav-link scrollto"><FontAwesomeIcon icon={faHospitalUser} /> <span>Patient Information</span></a></li>
                <li><a href="#services" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Services</span></a></li>
                <li><a href="#contact" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Contact</span></a></li>
              </ul>
            </nav>
          </header>
        </div>
        <form onSubmit={handleSubmit}>
            <header>Staff Registration</header>
            <br />
            <div className="fields">
                <div className="input-field">
                <label htmlFor="fullname">Full Name : </label>
            <input type='text' name='name' pattern="[A-Za-z]+" title="Only alphabets are allowed"  placeholder='Enter your fullname' onChange={e =>setValues({...values,name:e.target.value})} />
            </div >
            <div className="input-field">
            <label htmlFor="phoneno">Phone No : </label>
            <input type="tel" pattern="[0-9]{10}" maxlength="10" name='phone_no' placeholder='Enter your phone No'  onChange={e =>setValues({...values,phone_no:e.target.value})} /></div>
            </div>
            
            <div className="input-field">
            <label htmlFor="email">Email : </label><br/>
            <input type="email" name="email" placeholder="Enter your email"  onChange={handleChange} />
             </div>
            {/* {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}<br /> */}
            <br/>
             <div className="fields">
            <div className="input-field">
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" placeholder=" Enter the password" onChange={handleChange} /></div>
            <div className="input-field">
            <label htmlFor="Cpassword">Confirm Password : </label>
            <input type="password" name="password" placeholder="Confirm password" /></div>
            </div>
            <div className="dropdownflex">
            <div className="input-fieldL">
            <select name="role" id="status" onChange={e =>setValues({...values,role:e.target.value})} >
                                    <option value="consultant">Consultant</option>
                                    <option value="registrar">Registrar</option>
                                    <option value="medical_officer">Medical Officer</option>
                                    <option value="data_entry">Data Entry</option>
                                </select>
                                </div>
            <div className="input-field">
            <select name="status" id="status" onChange={e =>setValues({...values,status:e.target.value})} >
                {/* <option value="active">Active</option> */}
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
            </select>
            </div>
            </div>
            <br/>
            
            <div className="btn"><button type="submit">Register</button></div>
        </form>
    </div>
    );
}
export default Register_staff;