import './App.css';
import axios from 'axios';
import React ,{ useState } from 'react';

const  Register_staff = () =>{
    
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
    }
  

    
    return(
        <div className="container">
        <form onSubmit={handleSubmit}>
            <h1>Staff Registration </h1>
            <br />
            <div className="fields">
                <div className="input-field">
                <label htmlFor="fullname">Full Name : </label>
            <input type='text' name='name' placeholder='Enter your fullname' onChange={e =>setValues({...values,name:e.target.value})} />
            </div >
            <div className="input-field">
            <label htmlFor="phoneno">Phone No : </label>
            <input type='number' name='phone_no' placeholder='Enter your phone No'  onChange={e =>setValues({...values,phone_no:e.target.value})} /></div>
            </div>
            
            <div className="input-field">
            <label htmlFor="email">Email : </label><br/>
            <input type="text" name="email" placeholder="Enter your email"  onChange={handleChange} />
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
            {/* {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}<br /> */}
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
                <option value="">Select</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
            </select>
            </div>
            </div>
            <br/>
            <button type='submit' class="button">Register</button>
            
        </form>
    </div>
    );
}
export default Register_staff;