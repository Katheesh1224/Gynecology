import './App.css';
import './home.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';


const PAdd = () => {   

    const [values,setValues] = useState({
        bht:'',
        ward:'21',
        consultant:'',
        height:'',
        weight:'',
        past_med:'',
        complaint:'',
        past_surg:'',
        past_hist:'',
        past_obs:'',
        other:'',
        diagnosis:'',
        allergy:''
    })

    const handleSubmit =(e) =>{
        console.log(e);
        e.preventDefault();
        axios.post('http://localhost:8081/reg',values)
        .then(res =>{
            console.log(res);
         
        })
        .catch(err =>console.log(err))
        navigate('/home')
    }

    const navigate = useNavigate();
    let patient_id=localStorage.getItem('patient_id');

    const [data, setData] = useState([]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:8081/about/${patient_id}`);
              setData(response.data[0]);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }, []);

    return (
        <div>
            <NavBar/>
            <Nav/>
            <div className="container">
                <h2>Patient Admission Registration</h2>
                <div className='heading'>
                    <div className="input-field-phn">
                        <label htmlFor="ward_no">PHN No. : </label>
                        <input type="number"  value={data.phn}  readOnly />
                    </div> 
                    
                    <div className="input-field-add">
                        <label htmlFor="ward_no">Admission No. : </label>
                        <input type="number"  value=""  readOnly />
                    </div>

                </div>
                <br></br>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <div className="B">
                            <div className="fields">
                                <div className="input-fieldB">
                                    <label htmlFor="bht">BHT : </label>
                                    <input type="text" pattern="[0-9]{6}/[0-9]{4}" maxlength="11" onChange={e =>setValues({...values,bht:e.target.value})} required/>
                                </div>   
                                <div className="input-fieldH">
                                    <label htmlFor="ward_no">Ward No. : </label>
                                    <input type="number"  value="21"  readOnly onChange={e =>setValues({...values,ward:e.target.value})}/>
                                </div>  
                                <div className="input-fieldC">
                                    <label htmlFor="consultant">Consultant Name : </label>
                                    <select name="consultant" id="consultant" onChange={e =>setValues({...values,consultant:e.target.value})}>
                                        <option value="">Select here</option>
                                        <option value="x">Dr.X</option>
                                        <option value="y">Dr.Y</option>
                                        <option value="z">Dr.Z</option>
                                    </select>
                                </div>
                                

                           </div>
                        </div>
                    </div>
                    <br></br>
                    <div className="btn1"><button type="submit">Register</button></div>
                    
                </form>
            </div>
        </div>
    )
}
export default PAdd;
