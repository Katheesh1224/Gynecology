import '../App.css';
import '../home.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import { toast } from 'react-toastify'; // Import toast from react-toastify


const PAdd = () => {   
    const navigate = useNavigate();

    let patient_phn=localStorage.getItem('patient_phn');

    const [values,setValues] = useState({
        date:'',
        phn:'',
        bht:'',
        ward:'21',
        consultant:'',
        add_count:''
    })

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8081/require_count/${patient_phn}`);
            const fetchedData = response.data[0];
            setData(fetchedData);
            setValues(prevValues => ({
              ...prevValues,
              phn: fetchedData.phn,
              add_count: Number(fetchedData.add_count) + 1
            }));
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [patient_phn]);

    const handleSubmit =(e) =>{
        console.log(e);
        e.preventDefault();
        if (!values.phn) {
            toast.error('Patient PHN is required.');
            return;
        }
        axios.post('http://localhost:8081/newReg',values)
        .then(res =>{
            console.log(res);
        })
        .catch(err =>console.log(err))
        navigate('/patients_information/patient_profile/patient_admission')
    }

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0];
    
        if (selectedDate > currentDate) {
            toast.error('Please select a date and time that is not in the future.');
        } else {
          setValues({ ...values, date: selectedDate });
        }
    };

    return (
        <div>
            <NavBar/>
            <Nav/>
            <div className="container">
                <h2>Patient Admission Registration</h2>
                <div className='heading'>
                    <div className="input-field-phn">
                        <label htmlFor="ward_no">PHN No. : </label>
                        <input type="number" readOnly value={data.phn} onChange={e =>setValues({...values,phn:e.target.value})}  />
                    </div> 
                    
                    <div className="input-field-add">
                        <label htmlFor="ward_no">Admission No. : </label>
                        <input type="number"  value={data.add_count+1} readOnly onChange={e =>setValues({...values,add_count:e.target.value})} />
                    </div>

                </div>
                <br></br>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <div className="B">
                            <span className="title">Section B - Admission details</span>
                            <div className="fields1">
                                <div className="input-field" >
                                    <label htmlFor="date">Admission Date : </label>
                                    <input type="datetime-local" onChange={handleDateChange} value={values.date} required/>
                                </div>
                            </div>
                            <div className="fields">
                                <div className="input-fieldB">
                                    <label htmlFor="bht">BHT : </label>
                                    <input type="text" placeholder="123456/1234" pattern="[0-9]{6}/[0-9]{4}" maxlength="11" onChange={e =>setValues({...values,bht:e.target.value})} required/>
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

                                <div className="input-fieldH">
                                    <label htmlFor="height">Height : </label>
                                    <input type="number" placeholder="cm"max={250} min={90} onChange={e =>setValues({...values,height:e.target.value})} />
                                </div>

                                <div className="input-fieldH">
                                    <label htmlFor="weight">Weight : </label>
                                    <input type="number" placeholder="kg" max={400} min={30}  onChange={e =>setValues({...values,weight:e.target.value})}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn1"><button type="submit">Register</button></div>    
                </form>
            </div>
        </div>
    )
}


export default PAdd;