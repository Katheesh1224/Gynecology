import './App.css';
import axios from 'axios';
import React ,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';


const  RegisterStaff = () =>{
    const navigate = useNavigate();
    
    const [values,setValues] =useState({
        full_name:"",
        phone_no:"",
        role:'',
        email:"",
        password:"",
        status:'',
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
        // navigate('/home');
        alert("Staff Registered Successfully");
    }
  

    
    return(
        <div className="container">
            <NavBar/>
            <Nav/>
        <form onSubmit={handleSubmit}>
            <header>Staff Registration</header>
            <br />
            <div className="fields">
                <div className="input-field">
                <label htmlFor="fullname">Name : </label>
            <input type='text' name='name' pattern="[A-Za-z]+" title="Only alphabets are allowed"  placeholder='Enter your fullname' onChange={e =>setValues({...values,name:e.target.value})} />
            </div >
            <div className="input-field">
            <label htmlFor="phoneno">Phone No : </label>
            <input type="tel" pattern="[0-9]{10}" maxlength="10" name='phone_no' placeholder='Enter your phone No'  onChange={e =>setValues({...values,phone_no:e.target.value})} /></div>
            </div>
            <br/>
            <div className="fields">
            <div className="input-field">
            <label htmlFor="email">Email : </label>
            <input type="email" name="email" placeholder="Enter your email"  onChange={handleChange} />
             </div>
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
            <select name="role" id="role" onChange={e =>setValues({...values,role:e.target.value})} >
                <option value="consultant">Consultant</option>
                <option value="registrar">Registrar</option>
                <option value="medical_officer">Medical Officer</option>
                <option value="data_entry">Data Entry</option>
            </select>
            </div>
            <div className="input-field">
            <select name="status" id="status" onChange={e =>setValues({...values,status:e.target.value})} >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
            </select>
            </div>
            </div>
            <br/>
            
            <div className="btn1"><button type="submit">Register</button></div>
        </form>
    </div>
    );
}
export default RegisterStaff;