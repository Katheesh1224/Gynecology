import '../App.css';
import '../home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import Footer from '../Component/Footer.jsx';


const PEdit = () => {
    const navigate = useNavigate();
    let patient_id=localStorage.getItem('patient_id');    

    const [values,setValues] = useState({
        fname:'',
        address:'',
        bloodgr:'',
        dob:'',
        status:'',
        nic:'',
        phn:'',
        phone_no:''
    })

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/patient/patient/${patient_id}`);
            const patient = response.data;
            console.log(patient)
            setValues({
                fname: patient.full_name,
                address: patient.address,
                bloodgr: patient.blood_gr,
                dob: formatDateForInput(patient.dob),
                status: patient.marrital_status,
                nic: patient.nic,
                phn: patient.phn,
                phone_no:patient.phone_no  
            });

        } catch (error) {
            console.log(error);
            toast.error('Failed to fetch patient data.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formatDateForInput = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/patient/patientUpdate/${patient_id}`, values); // Changed to PUT
            navigate('/patients_information/patient_profile/patient_about');
            toast.success('Form updated successfully!');
        } catch (err) {
            console.error(err);
            let errorMessage = 'An unexpected error occurred.';
            if (err.response && err.response.data) {
                errorMessage = err.response.data.error || err.response.data.details || errorMessage;
            }
            toast.error(`There was an error updating the form: ${errorMessage}`);
        }
    };

      const handleDateofbirthChange = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0];
    
        if (selectedDate > currentDate) {
            toast.error('Please select a date that is not in the future.');
            //alert('Please select a date and time that is not in the future.');
        } else {
          setValues({ ...values, dob: selectedDate });
        }
      };

      const handleBloodGroupChange = (e) => {
        setValues({
          ...values,
          bloodgr: e.target.value,
        });
      };    
    
    
    const [formErrors, setFormErrors] = useState({});
    const [isFullNameValid, setIsFullNameValid] = useState(true);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
    const [isNICErrorValid, setIsNICErrorValid] = useState(true);
    const [isNICInstValid, setIsNICInstValid] = useState(true);
    const [isPHNErrorValid, setIsPHNErrorValid] = useState(true);
    const [isPHNInstValid, setIsPHNInstValid] = useState(true);

      const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        let value = target.value;
        setValues({ ...values, [name]: value });
    
        let errors = { ...formErrors };
    
        switch (name) {
          case "fname":
            if (!/^[a-zA-Z\s]*$/.test(value)) {
              setIsFullNameValid(false);
              errors.fname = "Invalid input: Only alphabets are allowed.";
            } else {
              setIsFullNameValid(true);
              delete errors.fname;
            }
            break;
    
          case "phone_no":
            if (!/^[0-9]*$/.test(value)) {
              setIsPhoneNumberValid(false);
              errors.phone_no = "Invalid input: Only numbers (0-9) are allowed.";
            } else {
              setIsPhoneNumberValid(true);
              delete errors.phone_no;
            }
            break;
    
            case "nic":
                if (value === "") { 
                    setIsNICErrorValid(true); 
                    setIsNICInstValid(true); 
                    delete errors.nic; 
                } else if (!/^[0-9]*[vV]?$/.test(value)) { 
                    setIsNICErrorValid(false);
                    errors.nic = "Only numbers and v are allowed.";
                } else if (!/^(?:[0-9]{12}|[0-9]{9}[vV])$/.test(value)) { 
                    setIsNICInstValid(false);
                    errors.nic = "Enter correct form of NIC.";
                } else {
                    setIsNICErrorValid(true);
                    setIsNICInstValid(true);
                    delete errors.nic;
                }
                break;            

            case "phn":
                if (value === "") { 
                    setIsPHNErrorValid(true); 
                    setIsPHNInstValid(true);
                    delete errors.phn; 
                } else if (!/^[0-9]*$/.test(value)) { 
                    setIsPHNErrorValid(false);
                    errors.phn = "Only numbers are allowed.";
                } else if (value.length !== 11) { 
                    setIsPHNInstValid(false);
                    errors.phn = "Enter exactly 11 digits.";
                } else {
                    setIsPHNErrorValid(true);
                    setIsPHNInstValid(true);
                    delete errors.phn;
                }
                break;
    
          default:
            break;
        }
    
        setFormErrors(errors);
      };



    
    return (
        <div className='wrapper'>
            <NavBar/>
            <Chatbot/>
            <div className='main-content'>
                <div className='side-bar'>
                    <Nav/>
                </div>
                

        <div className="container">

            <h2 style={{ fontWeight: 'bold' }}>Patient Registration</h2>
            <form onSubmit={handleUpdate}>
                <div className="form">
                    <div className="A">
                        <span className="title">Section A - Personal details identification</span>

                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="full_name">Fullname : </label>
                                <input type="text" name="fname" value={values.fname} placeholder="Enter text here" onChange={handleChange} style={{ borderColor: isFullNameValid ? '#aaa' : 'red' }} required/>
                                {formErrors.fname && <p style={{ color: "red" }}>{formErrors.fname}</p>}
                            </div>
                            <div className="input-field">
                                <label htmlFor="address">Address : </label>
                                <input type="text" placeholder="Enter text here" value={values.address} onChange={e =>setValues({...values,address:e.target.value})} required/>
                            </div>                             
                        </div>

                        <div className="fields">
                            <div className="input-fieldN">
                                <label htmlFor="blood_gr">Blood Group : </label>
                                <select name="blood_gr" id="blood_gr" onChange={handleBloodGroupChange}
                                    value={values.bloodgr} required>
                                    <option value="">Select here</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                            <div className="input-fieldN" >
                                <label htmlFor="dob">Date of Birth : </label>
                                <input type="date" placeholder="Enter number here" onChange={handleDateofbirthChange} value={values.dob} required/>
                            </div>   
                            <div className="input-fieldN">
                                <label htmlFor="marrital_status">Marrital Status : </label>
                                <select name="marrital_status" id="marrital_status" onChange={e =>setValues({...values,status:e.target.value})} value={values.status} required>
                                    <option value="married">Married</option>
                                    <option value="unmarried">Unmarried</option>
                                </select>
                            </div> 
                            <div className="input-fieldN">
                                <label htmlFor="nic">NIC No. : </label>
                                <input type="text" name="nic" placeholder="Enter NIC here" maxLength="12" value={values.nic} onChange={handleChange} style={{ borderColor: isNICErrorValid ? '#aaa' : 'red' }}/>
                                        {formErrors.nic && <p style={{ color: isNICErrorValid ? 'blue' : 'red' }}>{formErrors.nic}</p>}
                            </div>
                            <div className="input-fieldN">
                                <label htmlFor="phn">PHN No. : </label>
                                <input type="text" name="phn" placeholder="Enter PHN here" maxLength={11} value={values.phn} onChange={handleChange} style={{ borderColor: isPHNErrorValid ? '#aaa' : 'red' }} required/>
                                        {formErrors.phn && <p style={{ color: isPHNErrorValid ? 'blue' : 'red' }}>{formErrors.phn}</p>}
                            </div>   
                            <div className="input-fieldN">
                                <label htmlFor="phone_no">Telephone No. : </label>
                                <input type="phone_no" name="phone_no" placeholder="Enter phone number here" value={values.phone_no} maxLength="10" onChange={handleChange} style={{ borderColor: isPhoneNumberValid ? '#aaa' : 'red' }} required/>
                                {formErrors.phone_no && <p style={{ color: "red" }}>{formErrors.phone_no}</p>}
                            </div>                             
                        </div>
                        
                    </div>
                    </div>

                    <div className="btn1"><button type="submit">Update</button></div>
                
            </form>
        </div>
        </div>
        <Footer/>
        </div>
    )
}
export default PEdit;