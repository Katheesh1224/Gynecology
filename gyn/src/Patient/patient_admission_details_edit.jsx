import '../App.css';
import '../home.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';import { toast } from 'react-toastify';
import Footer from '../Component/Footer.jsx';


const AdEdit = () => {   
    const navigate = useNavigate();
    let patient_phn = localStorage.getItem('patient_phn');
    const add_count = parseInt(localStorage.getItem('addCount'), 10); // Ensure parsing here\
    const [consultants, setConsultants] = useState([]); // Store fetched consultants

    const [values,setValues] = useState({
        date:'',
        phn:'',
        bht:'',
        ward:'21',
        consultant:'',
        add_count:'',
        height:'',
        weight:''
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
            const response = await axios.get(`http://localhost:5000/patient/admission/${patient_phn}/${add_count}`);
            const patient = response.data;
            const date = new Date(patient.date);
            const formattedDate = date.toISOString().slice(0, 16);

            setValues({
                date: formattedDate,
                bht: patient.bht,
                ward: patient.ward_no,
                consultant: patient.consultant,
                nic: patient.nic,
                phn: patient.phn,
                height: patient.height,
                weight: patient.weight,
                add_count:patient.add_count
            });
            console.log(patient.ward);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch patient data.');
        }
        };

        if (patient_phn) {
            fetchData();
        }

        const fetchConsultants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/patient/consultants'); // Your backend URL
        setConsultants(response.data); // Set fetched consultants into state
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    };

    fetchConsultants();
    }, [patient_phn]);

    const handleUpdate =(e) =>{
        console.log(e);
        e.preventDefault();
        axios.put(`http://localhost:5000/patient/admissionUpdate/${patient_phn}/${add_count}`,values)
        .then(res =>{
            console.log(res);
            navigate('/patients_information/patient_profile/patient_admission')
            toast.success('Form updated successfully!');
        })
        .catch(err => {
            console.log(err);

            let errorMessage = 'An unexpected error occurred.';
            
            if (err.response && err.response.data) {
                errorMessage = err.response.data.error || err.response.data.details || errorMessage;
            }
            toast.error(`There was an error submitting the form: ${errorMessage}`);
        });    }

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
            <Chatbot/>
            <div className="container">
                <div className='heading'>
                    <div className="input-field-phn">
                        <label htmlFor="ward_no">PHN No. : </label>
                        <input type="number" readOnly value={values.phn} onChange={e =>setValues({...values,phn:e.target.value})}  />
                    </div> 
                    <h2 style={{ fontWeight: 'bold' }}>Patient Admission Registration</h2>
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
                                {/* <div className="input-fieldC">
                                    <label htmlFor="consultant">Consultant Name : </label>
                                    <select name="consultant" id="consultant" onChange={e =>setValues({...values,consultant:e.target.value})} value={values.consultant}>
                                        <option value="">Select here</option>
                                        <option value="x">Dr.X</option>
                                        <option value="y">Dr.Y</option>
                                        <option value="z">Dr.Z</option>
                                    </select>
                                </div> */}
                                <div className="input-fieldC">
                                    <label htmlFor="consultant">Consultant Name:</label>
                                    <select
                                        name="consultant"
                                        id="consultant"
                                        onChange={e =>setValues({...values,consultant:e.target.value})} // Update selected consultant
                                        value={values.consultant} // Control the dropdown value
                                    >
                                        <option value="">Select here</option>
                                        {/* Map through the consultants and create an option for each */}
                                        {consultants.map((consultant) => (
                                        <option key={consultant.id} value={consultant.full_name}> {/* Assuming each consultant has an 'id' and 'name' */}
                                            {consultant.full_name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input-fieldH">
                                    <label htmlFor="height">Height : </label>
                                    <input type="number" value= {values.height} placeholder="cm"max={250} min={90} onChange={e =>setValues({...values,height:e.target.value})} />
                                </div>

                                <div className="input-fieldH">
                                    <label htmlFor="weight">Weight : </label>
                                    <input type="number" value= {values.weight} placeholder="kg" max={400} min={30}  onChange={e =>setValues({...values,weight:e.target.value})}/>
                                </div>
                        </div>
                    </div>
                </div>

                    <div className="btn1"><button type="submit">Update</button></div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}
export default AdEdit;
