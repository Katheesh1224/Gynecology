import './App.css';
import './home.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';

const AdEdit = () => {   
    const navigate = useNavigate();
    let patient_phn = localStorage.getItem('patient_phn');
    const add_count = parseInt(localStorage.getItem('addCount'), 10); // Ensure parsing here

    const [values,setValues] = useState({
        date:'',
        phn:'',
        bht:'',
        ward:'21',
        consultant:'',
        add_count:''
    })

    useEffect(() => {
        const fetchData = async () => {
        const add_count = parseInt(localStorage.getItem('addCount'), 10); // Ensure parsing here
        // console.log("Add Count from Local Storage:", add_count);

        if (isNaN(add_count)) {
            console.error("Invalid add_count value.");
            return; // Prevent further execution if add_count is not valid
        }

        try {
            const response = await axios.get(`http://localhost:8081/admissiondetail/${patient_phn}/${add_count}`);
            const patient = response.data[0];
            const date = new Date(patient.date);
            const formattedDate = date.toISOString().slice(0, 16);

            setValues({
                date: formattedDate,
                bht: patient.bht,
                ward: patient.ward_no,
                consultant: patient.consultant,
                nic: patient.nic,
                phn: patient.phn,
                add_count:patient.add_count
            });
            console.log(patient.ward);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        if (patient_phn) {
            fetchData();
        }
    }, [patient_phn]);

    const handleUpdate =(e) =>{
        console.log(e);
        e.preventDefault();
        axios.put(`http://localhost:8081/admissionUpdate/${patient_phn}/${add_count}`,values)
        .then(res =>{
            console.log(res);
            navigate('/patients_information/patient_profile/patient_admission')
        })
        .catch(err =>console.log(err))
    }

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0];
    
        if (selectedDate > currentDate) {
          alert('Please select a date and time that is not in the future.');
        } else {
          setValues({ ...values, date: selectedDate });
        }
    };

    return (
        <div>
            <NavBar/>
            <Nav/>
            <div className="container">
                <div className='heading'>
                    <div className="input-field-phn">
                        <label htmlFor="ward_no">PHN No. : </label>
                        <input type="number" readOnly value={values.phn} onChange={e =>setValues({...values,phn:e.target.value})}  />
                    </div> 
                    <h2>Patient Admission Registration</h2>
                    <div className="input-field-add">
                        <label htmlFor="ward_no">Admission No. : </label>
                        <input type="number"  value={values.add_count} readOnly onChange={e =>setValues({...values,add_count:e.target.value})} />
                    </div>

                </div>
                <form onSubmit={handleUpdate}>
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
                                    <input type="text" placeholder="123456/1234" pattern="[0-9]{6}/[0-9]{4}" maxlength="11" value={values.bht} onChange={e =>setValues({...values,bht:e.target.value})} required/>
                                </div>   
                                <div className="input-fieldH">
                                    <label htmlFor="ward_no">Ward No. : </label>
                                    <input type="number"  value="21"  readOnly onChange={e =>setValues({...values,ward:e.target.value})}/>
                                </div>  
                                <div className="input-fieldC">
                                    <label htmlFor="consultant">Consultant Name : </label>
                                    <select name="consultant" id="consultant" onChange={e =>setValues({...values,consultant:e.target.value})} value={values.consultant}>
                                        <option value="">Select here</option>
                                        <option value="x">Dr.X</option>
                                        <option value="y">Dr.Y</option>
                                        <option value="z">Dr.Z</option>
                                    </select>
                                </div>
                                {/* <div className="input-fieldH">
                                    <label htmlFor="height">Height : </label>
                                    <input type="number" placeholder="cm"max={250} min={90} onChange={e =>setValues({...values,height:e.target.value})} />
                                </div>

                                <div className="input-fieldH">
                                    <label htmlFor="weight">Weight : </label>
                                    <input type="number" placeholder="kg" max={400} min={30}  onChange={e =>setValues({...values,weight:e.target.value})}/>
                                </div> */}
                        </div>
                    </div>
                </div>

                    <div className="btn1"><button type="submit">Update</button></div>
                </form>
            </div>
        </div>
    )
}
export default AdEdit;
