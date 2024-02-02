import './login.css';
import axios from 'axios';
import React ,{ useState } from 'react';

const  Register_staff = () =>{
    
    const [values,setValues] =useState({
        name:"",
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
        <div className="form-container sign-in">
            <h1>Staff Registration From</h1>
        <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <br />
            <input type='text' name='name' placeholder='Name' onChange={e =>setValues({...values,name:e.target.value})} /><br />
            <input type='number' name='phone_no' placeholder='Phone No'  onChange={handleChange} /><br />
            <select name="role" id="role" onChange={e =>setValues({...values,role:e.target.value})} >
                                    <option value="admin">Admin</option>
                                    <option value="staff">Staff</option>
                                </select><br />
            <input type="text" name="email" placeholder="Email"  onChange={handleChange} /><br />
            {/* {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}<br /> */}

            <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br />
            {/* {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}<br /> */}

            <select name="status" id="status" onChange={e =>setValues({...values,status:e.target.value})} >
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="disabled">Disabled</option>
                                </select><br />

            <a href="#">Forget Your Password?</a><br />
            <button type='submit'>Register</button>
            
        </form>
    </div>
    );
}
export default Register_staff;