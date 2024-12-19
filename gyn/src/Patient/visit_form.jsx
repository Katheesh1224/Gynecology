import '../App.css';
import '../home.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Footer from '../Component/Footer.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import { toast } from 'react-toastify'; // Import toast from react-toastify



const VisitForm = () => {
    const navigate = useNavigate();

    let patient_phn = localStorage.getItem('patient_phn');
    const add_count = parseInt(localStorage.getItem('addCount'), 10); // Ensure parsing here
    let visit_un = patient_phn + "_" + add_count;
    const [consultants, setConsultants] = useState([]); 

    
    // console.log(visit_un);

    const [value, setValue] = useState('');

    const [values,setValues] = useState({
        phn:'',
        visit_id:'',
        admission_id:'',
        date:'',
        visit_no:'',
        seenBy:'',
        time:'',
        complaints:[],
        abnormalUlerine:[] ,
        otherComplaint:'',
        bpa:'',
        bpb:'',
        pr:'',
        abdominalExam:'',
        gynaecologyExam:'',
        wbc:'',
        hb:'',
        plate:'',
        whiteCell:'',
        redCell:'',
        protein:'',
        seK:'',
        seNa:'',
        crp:'',
        fbs:'',
        ppbsAB:'',
        ppbsAL:'',
        ppbsAD:'',
        lftALT:'',
        lftAST:'',
        lftOther:'',
        scan_types:[],
        mri:'',
        ct:'',
        tas:'',
        tus:'',
        minorEua:'',
        minorEb:'',
        major:[],
        medicalManage:'',
        surgicalManage:'',
        followUp:''
    })

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            console.log(visit_un);
            const response = await axios.get(`http://localhost:5000/visit/require_visit_count/${visit_un}`);
            console.log(response.data); // Log the full response data to check the structure
            
            // Check if visit_count exists and handle cases where it might not
            if (response.data && response.data.visit_count !== undefined) {
              const fetchedData = response.data.visit_count; // Access data correctly
              console.log(fetchedData)
              setData(fetchedData);
              setValues(prevValues => ({
                ...prevValues,
                // phn: fetchedData.phn, // Uncomment if needed
                visit_no: fetchedData + 1
                
              }));
                     
            } else {
              console.error('Unexpected response format:', response.data);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
        const fetchConsultants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/patient/staffs'); // Your backend URL
        setConsultants(response.data); // Set fetched consultants into state
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    };
    fetchConsultants();
      }, [visit_un]);
      values.admission_id=visit_un;
      visit_un+="_"+values.visit_no;
      values.visit_id=visit_un; 

      // console.log(values.visit_id);  
      

    const handleSubmit =(e) =>{
        console.log(e);
        e.preventDefault();
        console.log(values);
        if (!values.visit_id) 
        {
            toast.error('Patient PHN is required.');
            return;
        }
        axios.post('http://localhost:5000/visit/treat',values)
        .then(res => {
            navigate('/home');
            toast.success('Form submitted successfully!');
            console.log(res);

            navigate('/patients_information/patient_profile/patient_admission/patient_visit')
         
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

    const inputClass = isNaN(value) || value < 0 || value > 200 ? "invalid" : '';

    const handleInputChange = (e) =>{
        const target = e.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        
        if (name === 'complaints') {
            if (target.checked) {
              value = [...values.complaints, target.value];
            } else {
              value = values.complaints.filter((subject) => subject !== target.value);
            }
            
        }

        if (name === 'abnormalUlerine') {
            if (target.checked) {
                value = [...values.abnormalUlerine, target.value];
            } else {
                value = values.abnormalUlerine.filter((subject) => subject !== target.value);
            }
        }

        if (name === 'major') {
            if (target.checked) {
                value = [...values.major, target.value];
            } else {
                value = values.major.filter((subject) => subject !== target.value);
            }
        }
          
        setValues({
            ...values,
            [name]: value,
        });console.log(value);
    }

    const [checkbox1Checked, setCheckbox1Checked] = useState(false);
    const [checkbox2Checked, setCheckbox2Checked] = useState(false);
    const [checkbox3Checked, setCheckbox3Checked] = useState(false);
    const [checkbox4Checked, setCheckbox4Checked] = useState(false);

    const handleCheckbox1Change = (e) => {
        setCheckbox1Checked(!checkbox1Checked);

        const target = e.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        if (name === 'scan_types') {
            if (target.checked) {
                value = [...values.scan_types, target.value];
            } else {
                value = values.scan_types.filter((subject) => subject !== target.value);
            }
        }
          
        setValues({
            ...values,
            [name]: value,
        });console.log(value);
    };

    const handleCheckbox2Change = (e) => {
        setCheckbox2Checked(!checkbox2Checked);

        const target = e.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        if (name === 'scan_types') {
            if (target.checked) {
                value = [...values.scan_types, target.value];
            } else {
                value = values.scan_types.filter((subject) => subject !== target.value);
            }
        }
          
        setValues({
            ...values,
            [name]: value,
        });console.log(value);
    };

    const handleCheckbox3Change = (e) => {
        setCheckbox3Checked(!checkbox3Checked);
        
        const target = e.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        if (name === 'scan_types') {
            if (target.checked) {
                value = [...values.scan_types, target.value];
            } else {
                value = values.scan_types.filter((subject) => subject !== target.value);
            }
        }
          
        setValues({
            ...values,
            [name]: value,
        });console.log(value);
    };

    const handleCheckbox4Change = (e) => {
        setCheckbox4Checked(!checkbox4Checked);
        
        const target = e.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        if (name === 'scan_types') {
            if (target.checked) {
                value = [...values.scan_types, target.value];
            } else {
                value = values.scan_types.filter((subject) => subject !== target.value);
            }
        }
          
        setValues({
            ...values,
            [name]: value,
        });console.log(value);
    };

    const handlePrevious = () => {
        navigate(`/patients_information/patient_profile/patient_admission/patient_visit`);
      };

    return (
        <div>
            <NavBar/>
            <Nav/>
            <Chatbot/>
            <div className="container">
                <h2 style={{ fontWeight: 'bold' }}>Visit Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <div className="A">
                            <span className="title">Visit Details</span>
                            <div className="fields1">
                                <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="date"> Date: </label>
                                    <input type="datetime-local" onChange={handleDateChange} value={values.date} required/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="visit_no"> Visit No.: </label>
                                    <input type="number"  value={values.visit_no} readOnly name='numberInput' id={inputClass}  onChange={e =>setValues({...values,visit_count:e.target.value})}  required/>
                                </div>
                                
                                <div className="input-field">
                                    <label htmlFor="full_name">Seen by: </label>
                                    <select name="role" id="status" onChange={e =>setValues({...values,seenBy:e.target.value})} >
                                         <option value="">Select here</option>
                                            {/* Map through the consultants and create an option for each */}
                                            {consultants.map((consultant) => (
                                            <option key={consultant.id} value={consultant.full_name}> {/* Assuming each consultant has an 'id' and 'name' */}
                                                {consultant.full_name}
                                            </option>
                                            ))}
                                    </select>
                                    </div>                                                   
                            </div>
                        <div className="B">
                            <span className="title">Complaints </span>
                            <div className="fields">
                            <div className="input-fieldM">
                                    <input type="checkbox" id="Vaginal Bleeding" name="complaints" value="Vaginal Bleeding" onChange={handleInputChange}/>
                                    <label for="Vaginal Bleeding">Vaginal Bleeding</label>
                                    <input type="checkbox" id="Dribbiling" name="complaints" value="Dribbiling" onChange={handleInputChange}/>
                                    <label for="Dribbiling">Dribbiling</label>
                                    <input type="checkbox" id="Subtertility" name="complaints" value="Subtertility" onChange={handleInputChange}/>
                                    <label for="Subtertility">Subtertility</label>
                                    <input type="checkbox" id="Vaginal Discharge" name="complaints" value="Vaginal Discharge"  onChange={handleInputChange}/>
                                    <label for="Vaginal Discharge">Vaginal Discharge</label>

                                    </div>
                                <div className="input-fieldM">
                                    <input type="checkbox" id="Abdominal Pain" name="complaints" value="Abdominal Pain" onChange={handleInputChange}/>
                                    <label for="Abdominal Pain">Abdominal Pain</label>
                                    <input type="checkbox" id="Back Pain" name="complaints" value="Back Pain" onChange={handleInputChange}/>
                                    <label for="Back Pain">Back Pain</label>
                                    <input type="checkbox" id="Urinary Incontenur" name="complaints" value="Urinary Incontenur" onChange={handleInputChange}/>
                                    <label for="Urinary Incontenur">Urinary Incontenur</label>
                                    <input type="checkbox" id="Blood Sugar Series" name="complaints" value="Blood Sugar Series"  onChange={handleInputChange}/>
                                    <label for="Blood Sugar Series">Blood Sugar Series</label>   

                                    </div>
                                    
                                <div className="input-fieldM">
                                    <input type="checkbox" id="Show" name="complaints" value="Show" onChange={handleInputChange}/>
                                    <label for="Show">Show</label>
                                <input type="checkbox" id="Reduced Fetal Movements" name="complaints" value="Reduced Fetal Movements" onChange={handleInputChange}/>
                                    <label for="Reduced Fetal Movements">Reduced Fetal Movements</label>
                                <input type="checkbox" id="lump at Vulva" name="complaints" value="lump at Vulva" onChange={handleInputChange}/>
                                    <label for="lump at Vulva ">lump at Vulva</label>
                                    <input type="checkbox" id="Blood Pressure Monitor" name="complaints" value="Blood Pressure Monitor"  onChange={handleInputChange}/>
                                    <label for="Blood Pressure Monitor">Blood Pressure Monitor</label>   
                                    </div>
                                </div>
                                <br/>
                                <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="abnormalUlerine">  Abnormal Ulerine bleeding:  </label>
                                </div>
                            </div>
                            <div className="fields">
                            <div className="input-fieldM">
                                    <input type="checkbox" id="Poit Menopances Bleed" name="abnormalUlerine" value="Poit Menopances Bleed" onChange={handleInputChange}/>
                                    <label for="Poit Menopances Bleed">Poit Menopances Bleed</label>
                                    <input type="checkbox" id="Heavy Mensurus Bleeding" name="abnormalUlerine" value="Heavy Mensurus Bleeding" onChange={handleInputChange}/>
                                    <label for="Heavy Mensurus Bleeding">Heavy Mensurus Bleeding</label>
                                    </div>
                                <div className="input-fieldM">
                                    <input type="checkbox" id="Dysmenurrhoea" name="abnormalUlerine" value="Dysmenurrhoea" onChange={handleInputChange}/>
                                    <label for="Dysmenurrhoea">Dysmenurrhoea </label>
                                    <input type="checkbox" id="Oliyomennorihe" name="abnormalUlerine" value="Oliyomennorihe" onChange={handleInputChange}/>
                                    <label for="Oliyomennorihe">Oliyomennorihe</label>
                                    </div>                         
                                </div>
                                <br/>
                            <div className="fields">
                                <div className="input-field">
                                    <label htmlFor="Complaints">Others: </label>
                                    <textarea id="Complaints" placeholder="Enter text here" name="Complaints" rows="3" cols="50" onChange={e =>setValues({...values,otherComplaint:e.target.value})}></textarea>
                                </div> 
                            </div>
            
                        <div className="A">
                            <span className="title">Examination</span>
                            <div className="fields1">
                                <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="Blood Presure"> Blood Presure: </label>
                                    <input type="number" name='mmHg'  placeholder="mmHg" onChange={e =>setValues({...values,bpa:e.target.value})} />
                                </div>
                                <div>/</div>
                                
                                <div className="input-field">
                                    <label style={{color:'white'}}>.</label>
                                    <input type="number" name='mmHg' placeholder="mmHg" onChange={e =>setValues({...values,bpb:e.target.value})} />
                                </div>

                                <div className="input-field">
                                    <label htmlFor="Pulse rate"> Pulse rate: </label>
                                    <input type="number" placeholder='bpm' onChange={e =>setValues({...values,pr:e.target.value})} required/>
                                </div>
                                                        
                            </div>
                        
                        </div>
                            <div className="fields">
                                <div className="input-field">
                                    <label htmlFor="Examination">Abdominal Examination: </label>
                                    <textarea id="Examination" placeholder="Enter text here" name="abdominal" rows="3" cols="50" onChange={e =>setValues({...values,abdominalExam:e.target.value})}></textarea>
                                </div> 
                            </div>
                            <div className="fields">
                                <div className="input-field">
                                    <label htmlFor="Examination">Gynaecology Examination: </label>
                                    <textarea id="Examination" placeholder="Enter text here" name="gynecology" rows="3" cols="50" onChange={e =>setValues({...values,gynaecologyExam:e.target.value})}></textarea>
                                </div> 
                            </div>


                            <div className="A">
                            <span className="title">Investigation</span>
                            <div className="fields1">
                                <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="FBC"> FBC: </label>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="WBC"> WBC: </label>
                                    <input type="number" placeholder='mm³' min={0}  onChange={e =>setValues({...values,wbc:e.target.value})} required/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Hb"> Hb: </label>
                                    <input type="number" placeholder='g/dL' onChange={e =>setValues({...values,hb:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="P/t"> P/t: </label>
                                    <input type="number" placeholder='/mm³' onChange={e =>setValues({...values,plate:e.target.value})}  />
                                </div>
                                                            
                            </div>
                            
                            <div className="fields1">
                                <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="UFR"> UFR: </label>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="White cells"> White cells: </label>
                                    <input type="number" placeholder='/hpf' min={0} max={5} onChange={e =>setValues({...values,whiteCell:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Red cells "> Red cells: </label>
                                    <input type="number" placeholder='/hpf' min={0} max={3}onChange={e =>setValues({...values,redCell:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Select_protein">Protein: </label>
                                    <select name="protein" id="protein"  onChange={e =>setValues({...values,protein:e.target.value})}  >
                                        <option value="">Select protein</option>
                                        <option value="Nil">Nil</option>
                                        <option value="1+">1+</option>
                                        <option value="2+">2+</option>
                                        <option value="3+">3+</option>
                                        <option value="Trace">Trace</option>
                                    </select>
                                </div>
                                                            
                            </div>
                            {/* <br /> */}
                            <div className="fields1">
                                <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="SE">  SE:&emsp;  </label>
                                </div>
                                <div className="input-field">
                                    <label htmlFor=" K+"> K+: </label>
                                    <input type="number" placeholder='mmol/L' min={0} max={10} onChange={e =>setValues({...values,seK:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Na+"> Na+: </label>
                                    <input type="number" placeholder='mmol/L' min={100} max={200} onChange={e =>setValues({...values,seNa:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                </div>
                            </div>
                            {/* <br /> */}
                            <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="CRP"> CRP:  </label>
                                </div>
                                <div className="input-field">
                                    <input type="number" placeholder='mg/L' min={-1} max={300} onChange={e =>setValues({...values,crp:e.target.value})}  />
                                </div>
                            
                            </div>

                            <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="FBS"> FBS:  </label>
                                </div>
                                <div className="input-field">
                                    <input type="number" placeholder='mmol/l' min={3} max={9} onChange={e =>setValues({...values,fbs:e.target.value})}  />
                                </div>
                                
                            </div>

                            <div className="fields1">
                                <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="PRBS">  PPBS:  </label>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="AB"> AB: </label>
                                    <input type="number"  onChange={e =>setValues({...values,ppbsAB:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="AL"> AL: </label>
                                    <input type="number"  onChange={e =>setValues({...values,ppbsAL:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="AD"> AD: </label>
                                    <input type="number"  onChange={e =>setValues({...values,ppbsAD:e.target.value})}  />
                                </div>
                            </div>
                            <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="Scan">  LFT:  </label>
                                </div>
                                {/* &emsp; */}
                            <div className="input-field">
                                    <label htmlFor="AB"> ALT: </label>
                                    <input type="text" placeholder='U/L' min={0} max={150} onChange={e =>setValues({...values,lftALT:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="AL"> AST: </label>
                                    <input type="text" placeholder='U/L' min={0} max={100} onChange={e =>setValues({...values,lftAST:e.target.value})}  />
                                </div> 
                            </div>
                            <br />
                            <div className="fields1">
                            <div className="input-field">
                                    <label htmlFor="management">Other: </label>
                                    <textarea id="management" placeholder="Enter text here" name="management" rows="3" cols="50" onChange={e =>setValues({...values,lftOther:e.target.value})}></textarea>
                                </div> 
                                </div>
                                <br />
                            <div className="fields">
                                <div>
                                    <div className="input-field" onload="setMaxDate()">
                                        <label htmlFor="scan">Scanning:</label>
                                    </div>
                                    
                                    <div className="input-Check">
                                        <input type="checkbox" id="mri" name='scan_types' value="MRI" checked={checkbox1Checked} onChange={handleCheckbox1Change}/>
                                        <label htmlFor="checkbox1">MRI</label>
                                        {checkbox1Checked && (
                                            <div className="input-fieldCheck">
                                                <input type="text" placeholder="Enter description for MRI" onChange={e =>setValues({...values,mri:e.target.value})}/>
                                            </div>
                                        )}
                                    </div>

                                    <div className="input-Check">
                                        <input type="checkbox" id="ct" name='scan_types' value="CT" checked={checkbox2Checked} onChange={handleCheckbox2Change}/>
                                        <label htmlFor="checkbox2">CT</label>
                                        {checkbox2Checked && (
                                            <div className="input-fieldCheck">
                                                <input type="text" placeholder="Enter description for CT" onChange={e =>setValues({...values,ct:e.target.value})}/>
                                            </div>
                                        )}
                                        </div>
                                </div>
                                
                                <div>
                                    <div className="input-field" onload="setMaxDate()">
                                        <label htmlFor="Scan">  USS:  </label>
                                    </div>
                                    
                                    <div className="input-Check">
                                        <input type="checkbox" id="tas" name='scan_types' value="TAS"  checked={checkbox3Checked} onChange={handleCheckbox3Change}/>
                                        <label htmlFor="checkbox1">TAS</label>
                                        {checkbox3Checked && (
                                            <div className="input-fieldCheck">
                                                <input type="text" placeholder="Enter description for TAS" onChange={e =>setValues({...values,tas:e.target.value})}/>
                                            </div>
                                        )}
                                    </div>

                                    <div className="input-Check">
                                        <input type="checkbox" id="tus" name='scan_types' value="TUS" checked={checkbox4Checked} onChange={handleCheckbox4Change}/>
                                        <label htmlFor="checkbox2">TUS</label>
                                        {checkbox4Checked && (
                                            <div className="input-fieldCheck">
                                                <input type="text" placeholder="Enter description for TUS" onChange={e =>setValues({...values,tus:e.target.value})}/>
                                            </div>
                                        )}
                                    </div>
                                </div>    
                            </div>
                            
                        </div>
                        <span className="title">Management</span>                                                  
                        <div className="A">
                            <div className="fields">
                                <div className="input-field">
                                    <label htmlFor="Others">Medical management: </label>
                                    <textarea id="Decision" placeholder="Enter text here" name="medical" rows="3" cols="50" onChange={e =>setValues({...values,medicalManage:e.target.value})}></textarea>
                                </div> 
                            </div>
                            <div className="fields">
                                <div className="input-field">
                                    <label htmlFor="Others">Surgical management: </label>
                                    <textarea id="Decision" placeholder="Enter text here" name="medical" rows="3" cols="50" onChange={e =>setValues({...values,surgicalManage:e.target.value})}></textarea>
                                </div> 
                            </div>
                        </div>
                        </div>
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="Scan">  Minor:  </label>
                            </div>&emsp;
                            <div className="input-field">
                                <label htmlFor="AB"> EUA: </label>
                                <input type="text"  onChange={e =>setValues({...values,minorEua:e.target.value})}  />
                            </div>
                            <div className="input-field">
                                <label htmlFor="AL"> EB: </label>
                                <input type="text"  onChange={e =>setValues({...values,minorEb:e.target.value})} />
                            </div> 
                        </div>

                            <div className="fields1">
                                <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="Scan">  Major:  </label>
                                </div>
                            </div>
                            <div className="fields">
                                <div className="input-fieldM">
                                    <input type="checkbox" id="BL/LRT" name="major" value="BL/LRT" onChange={handleInputChange}/>
                                    <label for="BL/LRT">BL/LRT</label>
                                    <input type="checkbox" id="TAH" name="major" value="TAH" onChange={handleInputChange}/>
                                    <label for="TAH">TAH</label>
                                </div>
                                <div className="input-fieldM">
                                    <input type="checkbox" id="BSO" name="major" value="BSO" onChange={handleInputChange}/>
                                    <label for="BSO">BSO </label>
                                    <input type="checkbox" id="Myomectomy" name="major" value="Myomectomy" onChange={handleInputChange}/>
                                    <label for="Myomectomy">Myomectomy</label>
                                </div>
                                    
                                <div className="input-fieldM">
                                    <input type="checkbox" id="Polpectomy" name="major" value="Polpectomy" onChange={handleInputChange}/>
                                    <label for="Polpectomy">Polpectomy</label>
                                </div>  
                            </div>
                    </div>
                    <div className="button-bar">
                        <button onClick={handlePrevious}> {"<<"} &nbsp;&nbsp; Previous </button>
                        <button type="submit"> Submit </button>
                    </div>
                    </div>
                </form>
            </div>  
            <Footer/>         
        </div>
    )
}
export default VisitForm;
