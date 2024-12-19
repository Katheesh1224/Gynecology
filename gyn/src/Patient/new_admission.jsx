import '../App.css';
import '../home.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import Footer from '../Component/Footer.jsx';


const PAdd = () => {   
    const navigate = useNavigate();
    const [consultants, setConsultants] = useState([]);

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
            const response = await axios.get(`http://localhost:5000/patient/require_count/${patient_phn}`);
            const fetchedData = response.data;
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
    // Fetch the consultants data from the backend when the component mounts
    const fetchConsultants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/patient/consultants'); // Your backend URL
        setConsultants(response.data); // Set fetched consultants into state
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    };
    fetchConsultants();
      }, [patient_phn]);

    const handleSubmit =(e) =>{
        console.log(e);
        e.preventDefault();
        if (!values.phn) {
            toast.error('Patient PHN is required.');
            return;
        }
        axios.post('http://localhost:5000/patient/newReg',values)
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
            toast.error('Please select a date and time that is not in the future.');
        } else {
          setValues({ ...values, date: selectedDate });
        }
    };

    const handlePrevious = () => {
        navigate(`/patients_information/patient_profile/patient_admission`);
      };

    return (
        <div>
            <NavBar/>
            <Nav/>
            <Chatbot/>
            <div className="container">
                <h2 style={{ fontWeight: 'bold' }}>Patient Admission Registration</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="form">
                    <div className='heading'>
                    <div className="input-field-phn">
                        <label htmlFor="ward_no">PHN No. : </label>
                        <input type="number" readOnly value={data.phn} onChange={e =>setValues({...values,phn:e.target.value})}  />
                    </div> 

                    <div className="fields1">
                                <div className="input-field" >
                                    <label htmlFor="date">Admission Date : </label>
                                    <input type="datetime-local" onChange={handleDateChange} value={values.date} required/>
                                </div>
                            </div>
                    
                    <div className="input-field-add">
                        <label htmlFor="ward_no">Admission No. : </label>
                        <input type="number"  value={data.add_count+1} readOnly onChange={e =>setValues({...values,add_count:e.target.value})} />
                    </div>

                </div>
                        <div className="B">
                            
                            <div className="fields">
                                <div className="input-fieldB">
                                    <label htmlFor="bht">BHT : </label>
                                    <input type="text" placeholder="123456/1234" pattern="[0-9]{6}/[0-9]{4}" maxlength="11" onChange={e =>setValues({...values,bht:e.target.value})} required/>
                                </div>   
                                <div className="input-fieldH">
                                    <label htmlFor="ward_no">Ward No. : </label>
                                    <input type="number"  value="21"  readOnly onChange={e =>setValues({...values,ward:e.target.value})}/>
                                </div>  
                                {/* <div className="input-fieldC">
                                    <label htmlFor="consultant">Consultant Name : </label>
                                    <select name="consultant" id="consultant" onChange={e =>setValues({...values,consultant:e.target.value})}>
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
                                    <input type="number" placeholder="cm"max={250} min={90} onChange={e =>setValues({...values,height:e.target.value})} />
                                </div>

                                <div className="input-fieldH">
                                    <label htmlFor="weight">Weight : </label>
                                    <input type="number" placeholder="kg" max={400} min={30}  onChange={e =>setValues({...values,weight:e.target.value})}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-bar">
                        <button onClick={handlePrevious}> {"<<"} &nbsp;&nbsp; Previous </button>
                        <button type="submit"> Register </button>
                    </div>    
                </form>
            </div>
            <Footer/>
        </div>
    )
}


export default PAdd;