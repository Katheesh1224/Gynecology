import '../App.css';
import '../home.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import { toast } from 'react-toastify';
import Footer from '../Component/Footer.jsx';



const VisitEdit = () => {   
    const navigate = useNavigate();
    
    let patient_phn = localStorage.getItem('patient_phn');
    const add_count = parseInt(localStorage.getItem('addCount'), 10); // Ensure parsing here
    const visit_count = parseInt(localStorage.getItem('visitIndex'), 10); // Ensure parsing here
    const visit_unique = patient_phn + "_" + add_count + "_" + visit_count;
    const [consultants, setConsultants] = useState([]); 

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

    useEffect(() => {

        
        const fetchData = async () => {
        
        // console.log("Add Count from Local Storage:", add_count);

        if (isNaN(visit_count)) {
            console.error("Invalid visit_count value.");
            return; // Prevent further execution if add_count is not valid
        }

        try {
            const response = await axios.get(`http://localhost:5000/visit/visitdetail/${visit_unique}`);
            const visit = response.data;
            console.log(visit.scan_types);
            const date = new Date(visit.date);
            const formattedDate = date.toISOString().slice(0, 16);

            setValues({
                date: formattedDate,
                visit_no: visit.visit_count,
                seenBy: visit.seen_by,
                complaints: visit.complaints.split(', '),
                abnormalUlerine: visit.abnormal_bleeding.split(', '),
                otherComplaint: visit.complaint_other,
                bpa: visit.exam_bpa,
                bpb: visit.exam_bpb,
                pr: visit.exam_pulse,
                abdominalExam: visit.exam_abdominal,
                gynaecologyExam: visit.exam_gynaecology,
                wbc: visit.fbc_wbc,
                hb: visit.fbc_hb,
                plate: visit.fbc_pt,
                whiteCell: visit.ufr_wc,
                redCell: visit.ufr_rc,
                protein: visit.ufr_protein,
                seK: visit.se_k,
                seNa: visit.se_na,
                crp: visit.crp,
                fbs: visit.fbs,
                ppbsAB: visit.ppbs_ab,
                ppbsAL: visit.ppbs_al,
                ppbsAD: visit.ppbs_ad,
                lftALT: visit.lft_alt,
                lftAST: visit.lft_ast,
                lftOther: visit.invest_other,
                mri: visit.scan_mri,
                ct: visit.scan_ct,
                tas: visit.uss_tas,
                tus: visit.uss_tus,
                scan_types: visit.scan_types.split(', '),
                minorEua: visit.manage_minor_eua,
                minorEb: visit.manage_minor_eb,
                major: visit.manage_major.split(', '),
                medicalManage: visit.manage_medical,
                surgicalManage: visit.manage_surgical
            });
            console.log(visit);
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
        const response = await axios.get('http://localhost:5000/patient/staffs'); // Your backend URL
        setConsultants(response.data); // Set fetched consultants into state
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    };
    fetchConsultants();
    }, [patient_phn]);

    const handleUpdate =(e) =>{
        console.log(visit_unique);
        e.preventDefault();
        axios.put(`http://localhost:5000/visit/visitUpdate/${visit_unique}`,values)
        .then(res =>{
            console.log(res);
            navigate(`/patients_information/patient_profile/patient_admission/patient_visit/visit_details`);
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
          
        setValues({
            ...values,
            [name]: value,
        });console.log(value);

        if (name === 'abnormalUlerine') {
            if (target.checked) {
                value = [...values.abnormalUlerine, target.value];
            } else {
                value = values.abnormalUlerine.filter((subject) => subject !== target.value);
            }
        }
        
        setValues({
            ...values,
            [name]: value,
        });console.log(value);

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
            if (!Array.isArray(values.scan_types)) {
                values.scan_types = [];
            }

            if (target.checked) {
                value = [...values.scan_types, target.value];
            } else {
                value = values.scan_types.filter((subject) => subject !== target.value);
            }
        }

        setValues({
            ...values,
            [name]: value,
        });
        console.log("Updated values:", values);
    };

    const handleCheckbox2Change = (e) => {
        setCheckbox2Checked(!checkbox2Checked);
        
        const target = e.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        if (name === 'scan_types') {
            if (!Array.isArray(values.scan_types)) {
                values.scan_types = [];
            }

            if (target.checked) {
                value = [...values.scan_types, target.value];
            } else {
                value = values.scan_types.filter((subject) => subject !== target.value);
            }
        }

        setValues({
            ...values,
            [name]: value,
        });
        console.log("Updated values:", values);
    };

    const handleCheckbox3Change = (e) => {
        setCheckbox3Checked(!checkbox3Checked);
        
        const target = e.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        if (name === 'scan_types') {
            if (!Array.isArray(values.scan_types)) {
                values.scan_types = [];
            }

            if (target.checked) {
                value = [...values.scan_types, target.value];
            } else {
                value = values.scan_types.filter((subject) => subject !== target.value);
            }
        }

        setValues({
            ...values,
            [name]: value,
        });
        console.log("Updated values:", values);
    };

    const handleCheckbox4Change = (e) => {
        setCheckbox4Checked(!checkbox4Checked);

        const target = e.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;

        if (name === 'scan_types') {
            if (!Array.isArray(values.scan_types)) {
                values.scan_types = [];
            }

            if (target.checked) {
                value = [...values.scan_types, target.value];
            } else {
                value = values.scan_types.filter((subject) => subject !== target.value);
            }
        }

        setValues({
            ...values,
            [name]: value,
        });
        console.log("Updated values:", values);
    };


    return (
        <div>
            <NavBar/>
            <Nav/>
            <Chatbot/>
            <div className="container">
                <h2 style={{ fontWeight: 'bold' }}>Patient Visit Update</h2>
                <form onSubmit={handleUpdate}>
                    <div className="form">
                        <div className="A">
                            <span className="title">Visit Details</span>
                            <div className="fields1">
                                <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="date"> Date : </label>
                                    <input type="datetime-local" onChange={handleDateChange} value={values.date} required/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="visit_no"> Visit No : </label>
                                    <input type="number"  value={values.visit_no} readOnly name='numberInput'  required onChange={e =>setValues({...values,visit_count:e.target.value})}/>
                                </div>
                                
                                <div className="input-field">
                                    <label htmlFor="full_name">Seen by : </label>
                                    <select name="role" id="status" value={values.seenBy} onChange={e =>setValues({...values,seenBy:e.target.value})} >
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
                        </div>

                        <div className="B">
                            <span className="title">Complaints </span>
                            <div className="fields">
                                <div className="input-fieldM">
                                    <input type="checkbox" id="Vaginal Bleeding" name="complaints" value="Vaginal Bleeding" onChange={handleInputChange} checked={values.complaints.includes('Vaginal Bleeding')}/>
                                    <label for="Vaginal Bleeding">Vaginal Bleeding</label>
                                    <input type="checkbox" id="Dribbiling" name="complaints" value="Dribbiling" onChange={handleInputChange} checked={values.complaints.includes('Dribbiling')}/>
                                    <label for="Dribbiling">Dribbiling</label>
                                    <input type="checkbox" id="Subtertility" name="complaints" value="Subtertility" onChange={handleInputChange} checked={values.complaints.includes('Subtertility')}/>
                                    <label for="Subtertility">Subtertility</label>
                                    <input type="checkbox" id="Vaginal Discharge" name="complaints" value="Vaginal Discharge"  onChange={handleInputChange} checked={values.complaints.includes('Vaginal Discharge')}/>
                                    <label for="Vaginal Discharge">Vaginal Discharge</label>
                                </div>

                                <div className="input-fieldM">
                                    <input type="checkbox" id="Abdominal Pain" name="complaints" value="Abdominal Pain" onChange={handleInputChange} checked={values.complaints.includes('Abdominal Pain')}/>
                                    <label for="Abdominal Pain">Abdominal Pain</label>
                                    <input type="checkbox" id="Back Pain" name="complaints" value="Back Pain" onChange={handleInputChange} checked={values.complaints.includes('Back Pain')}/>
                                    <label for="Back Pain">Back Pain</label>
                                    <input type="checkbox" id="Urinary Incontenur" name="complaints" value="Urinary Incontenur" onChange={handleInputChange} checked={values.complaints.includes('Urinary Incontenur')}/>
                                    <label for="Urinary Incontenur">Urinary Incontenur</label>
                                    <input type="checkbox" id="Blood Sugar Series" name="complaints" value="Blood Sugar Series"  onChange={handleInputChange} checked={values.complaints.includes('Blood Sugar Series')}/>
                                    <label for="Blood Sugar Series">Blood Sugar Series</label>   

                                    </div>
                                    
                                <div className="input-fieldM">
                                    <input type="checkbox" id="Show" name="complaints" value="Show" onChange={handleInputChange} checked={values.complaints.includes('Show')}/>
                                    <label for="Show">Show</label>
                                <input type="checkbox" id="Reduced Fetal Movements" name="complaints" value="Reduced Fetal Movements" onChange={handleInputChange} checked={values.complaints.includes('Reduced Fetal Movements')}/>
                                    <label for="Reduced Fetal Movements">Reduced Fetal Movements</label>
                                <input type="checkbox" id="lump at Vulva" name="complaints" value="lump at Vulva" onChange={handleInputChange} checked={values.complaints.includes('lump at Vulva')}/>
                                    <label for="lump at Vulva ">lump at Vulva</label>
                                    <input type="checkbox" id="Blood Pressure Monitor" name="complaints" value="Blood Pressure Monitor"  onChange={handleInputChange} checked={values.complaints.includes('Blood Pressure Monitor')}/>
                                    <label for="Blood Pressure Monitor">Blood Pressure Monitor</label>   
                                    </div>
                                </div>
                                <br/>
                                <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="Scan">  Abnormal Ulerine bleeding :  </label>
                                </div>
                            </div>
                            <div className="fields">
                            <div className="input-fieldM">
                                    <input type="checkbox" id="Poit Menopances Bleed" name="abnormalUlerine" value="Poit Menopances Bleed" onChange={handleInputChange} checked={values.abnormalUlerine.includes('Poit Menopances Bleed')}/>
                                    <label for="Poit Menopances Bleed">Poit Menopances Bleed</label>
                                    <input type="checkbox" id="Heavy Mensurus Bleeding" name="abnormalUlerine" value="Heavy Mensurus Bleeding" onChange={handleInputChange} checked={values.abnormalUlerine.includes('Heavy Mensurus Bleeding')}/>
                                    <label for="Heavy Mensurus Bleeding">Heavy Mensurus Bleeding</label>
                                    </div>
                                <div className="input-fieldM">
                                    <input type="checkbox" id="Dysmenurrhoea" name="abnormalUlerine" value="Dysmenurrhoea" onChange={handleInputChange} checked={values.abnormalUlerine.includes('Dysmenurrhoea')}/>
                                    <label for="Dysmenurrhoea">Dysmenurrhoea </label>
                                    <input type="checkbox" id="Oliyomennorihe" name="abnormalUlerine" value="Oliyomennorihe" onChange={handleInputChange} checked={values.abnormalUlerine.includes('Oliyomennorihe')}/>
                                    <label for="Oliyomennorihe">Oliyomennorihe</label>
                                    </div>                         
                                </div>
                                <br/>
                            <div className="fields">
                                <div className="input-field">
                                    <label htmlFor="Complaints">Others : </label>
                                    <textarea id="Complaints" placeholder="Enter text here" name="Complaints" rows="3" cols="50"  onChange={e =>setValues({...values,otherComplaint:e.target.value})}></textarea>
                                </div> 
                            </div>
            
                        <div className="A">
                            <span className="title">Examination</span>
                            <div className="fields1">
                                <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="Blood Presure"> Blood Presure : </label>
                                    <input type="number" name='mmHg'  placeholder="mmHg" value={values.bpa} onChange={e =>setValues({...values,bpa:e.target.value})} />
                                </div>
                                <div>/</div>
                                
                                <div className="input-field">
                                    <label>.</label>
                                    <input type="number" name='mmHg' placeholder="mmHg" value={values.bpb} onChange={e =>setValues({...values,bpb:e.target.value})} />
                                </div>

                                <div className="input-field">
                                    <label htmlFor="Pulse rate"> Pulse rate: </label>
                                    <input type="number" placeholder='bpm' value={values.pr} onChange={e =>setValues({...values,pr:e.target.value})} required/>
                                </div>
                                                        
                            </div>
                        
                        </div>
                            <div className="fields">
                                <div className="input-field">
                                    <label htmlFor="Examination">Abdominal Examination : </label>
                                    <textarea id="Examination" placeholder="Enter text here" name="abdominal" rows="3" cols="50" value={values.abdominalExam} onChange={e =>setValues({...values,abdominalExam:e.target.value})}></textarea>
                                </div> 
                            </div>
                            <div className="fields">
                                <div className="input-field">
                                    <label htmlFor="Examination">Gynaecology Examination : </label>
                                    <textarea id="Examination" placeholder="Enter text here" name="gynecology" rows="3" cols="50" value={values.gynaecologyExam} onChange={e =>setValues({...values,gynaecologyExam:e.target.value})}></textarea>
                                </div> 
                            </div>


                            <div className="A">
                            <span className="title">Investigation</span>
                            <div className="fields1">
                                <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="FBC"> FBC : </label>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="WBC"> WBC : </label>
                                    <input type="number" placeholder='count/mm' value={values.wbc} onChange={e =>setValues({...values,wbc:e.target.value})} required/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Hb"> Hb : </label>
                                    <input type="number" placeholder='g/dL' value={values.hb} onChange={e =>setValues({...values,hb:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="P/t"> P/t : </label>
                                    <input type="number" placeholder='count/mm' value={values.plate} onChange={e =>setValues({...values,plate:e.target.value})}  />
                                </div>
                                                            
                            </div>
                            
                            <div className="fields1">
                                <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="UFR"> UFR : </label>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="White cells"> White cells : </label>
                                    <input type="number" placeholder='/hpf' min={0} max={5} value={values.whiteCell} onChange={e =>setValues({...values,whiteCell:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Red cells "> Red cells : </label>
                                    <input type="number" placeholder='/hpf' min={0} max={3} value={values.redCell} onChange={e =>setValues({...values,redCell:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Select_protein">Protein : </label>
                                    <select name="protein" id="protein" value={values.protein}  onChange={e =>setValues({...values,protein:e.target.value})}  >
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
                                    <label htmlFor="SE">  SE&emsp;:  </label>
                                </div>
                                <div className="input-field">
                                    <label htmlFor=" K+"> K+ : </label>
                                    <input type="number" placeholder='mmol/L' min={0} max={10} value={values.seK} onChange={e =>setValues({...values,seK:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="Na+"> Na+ : </label>
                                    <input type="number" placeholder='mmol/L' min={100} max={200} value={values.seNa} onChange={e =>setValues({...values,seNa:e.target.value})}  />
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
                                    <input type="number" placeholder='mg/L' min={-1} max={300} value={values.crp} onChange={e =>setValues({...values,crp:e.target.value})}  />
                                </div>
                            
                            </div>

                            <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="FBS"> FBS   :  </label>
                                </div>
                                <div className="input-field">
                                    <input type="number" placeholder='mmol/l' min={3} max={9} value={values.fbs} onChange={e =>setValues({...values,fbs:e.target.value})}  />
                                </div>
                                
                            </div>

                            <div className="fields1">
                                <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="PRBS">  PPBS:  </label>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="AB"> AB : </label>
                                    <input type="number" value={values.ppbsAB}  onChange={e =>setValues({...values,ppbsAB:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="AL"> AL : </label>
                                    <input type="number" value={values.ppbsAL}  onChange={e =>setValues({...values,ppbsAL:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="AD"> AD : </label>
                                    <input type="number" value={values.ppbsAD}  onChange={e =>setValues({...values,ppbsAD:e.target.value})}  />
                                </div>
                            </div>
                            <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="Scan">  LFT :  </label>
                                </div>
                                {/* &emsp; */}
                            <div className="input-field">
                                    <label htmlFor="AB"> ALT : </label>
                                    <input type="text" placeholder='U/L' min={0} max={150} value={values.lftALT} onChange={e =>setValues({...values,lftALT:e.target.value})}  />
                                </div>
                                <div className="input-field">
                                    <label htmlFor="AL"> AST : </label>
                                    <input type="text" placeholder='U/L' min={0} max={100} value={values.lftAST} onChange={e =>setValues({...values,lftAST:e.target.value})}  />
                                </div> 
                            </div>
                            <br />
                            <div className="fields1">
                            <div className="input-field">
                                    <label htmlFor="management">Other : </label>
                                    <textarea id="management" placeholder="Enter text here" name="management" rows="3" cols="50" value={values.lftOther} onChange={e =>setValues({...values,lftOther:e.target.value})}></textarea>
                                </div> 
                                </div>
                                <br />



                                <div className="fields">
                                <div>
                                    <div className="input-field" onload="setMaxDate()">
                                        <label htmlFor="scan">Scanning:</label>
                                    </div>
                                    
                                    <div className="input-Check">
                                        <input type="checkbox" id="mri" name='scan_types' value="MRI" checked={checkbox1Checked || values.scan_types.includes('MRI')} onChange={handleCheckbox1Change}/>
                                        <label htmlFor="checkbox1">MRI</label>
                                        {checkbox1Checked && (
                                            <div className="input-fieldCheck">
                                                <input type="text" placeholder="Enter description for MRI" value={values.mri} onChange={e =>setValues({...values,mri:e.target.value})}/>
                                            </div>
                                        )}
                                    </div>

                                    <div className="input-Check">
                                        <input type="checkbox" id="ct" name='scan_types' value="CT" checked={checkbox2Checked || values.scan_types.includes('CT')} onChange={handleCheckbox2Change}/>
                                        <label htmlFor="checkbox2">CT</label>
                                        {checkbox2Checked && (
                                            <div className="input-fieldCheck">
                                                <input type="text" placeholder="Enter description for CT" value={values.ct} onChange={e =>setValues({...values,ct:e.target.value})}/>
                                            </div>
                                        )}
                                        </div>
                                </div>
                                
                                <div>
                                    <div className="input-field" onload="setMaxDate()">
                                        <label htmlFor="Scan">  USS:  </label>
                                    </div>
                                    
                                    <div className="input-Check">
                                        <input type="checkbox" id="tas" name='scan_types' value="TAS"  checked={checkbox3Checked || values.scan_types.includes('TAS')} onChange={handleCheckbox3Change}/>
                                        <label htmlFor="checkbox1">TAS</label>
                                        {checkbox3Checked && (
                                            <div className="input-fieldCheck">
                                                <input type="text" placeholder="Enter description for TAS" value={values.tas} onChange={e =>setValues({...values,tas:e.target.value})}/>
                                            </div>
                                        )}
                                    </div>

                                    <div className="input-Check">
                                        <input type="checkbox" id="tus" name='scan_types' value="TUS" checked={checkbox4Checked || values.scan_types.includes('TUS')} onChange={handleCheckbox4Change}/>
                                        <label htmlFor="checkbox2">TUS</label>
                                        {checkbox4Checked && (
                                            <div className="input-fieldCheck">
                                                <input type="text" placeholder="Enter description for TUS" value={values.tus} onChange={e =>setValues({...values,tus:e.target.value})}/>
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
                                    <label htmlFor="Others">Medical management : </label>
                                    <textarea id="Decision" placeholder="Enter text here" name="medical" rows="3" cols="50" value={values.medicalManage} onChange={e =>setValues({...values,medicalManage:e.target.value})}></textarea>
                                </div> 
                            </div>
                            <div className="fields">
                                <div className="input-field">
                                    <label htmlFor="Others">Surgical management : </label>
                                    <textarea id="Decision" placeholder="Enter text here" name="medical" rows="3" cols="50" value={values.surgicalManage} onChange={e =>setValues({...values,surgicalManage:e.target.value})}></textarea>
                                </div> 
                            </div>
                        </div>
                        </div>
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="Scan">  Minor :  </label>
                            </div>&emsp;
                            <div className="input-field">
                                <label htmlFor="AB"> EUA : </label>
                                <input type="text" value={values.minorEua}  onChange={e =>setValues({...values,minorEua:e.target.value})}  />
                            </div>
                            <div className="input-field">
                                <label htmlFor="AL"> EB : </label>
                                <input type="text" value={values.minorEb}  onChange={e =>setValues({...values,minorEb:e.target.value})} />
                            </div> 
                        </div>

                            <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                    <label htmlFor="Scan">  Major :  </label>
                                </div>&emsp;&emsp;
                        </div>
                            <div className="fields">
                                <div className="input-fieldM">
                                    <input type="checkbox" id="BL/LRT" name="major" value="BL/LRT" onChange={handleInputChange} checked={values.major.includes('BL/LRT')}/>
                                    <label for="BL/LRT">BL/LRT</label>
                                    <input type="checkbox" id="TAH" name="major" value="TAH" onChange={handleInputChange} checked={values.major.includes('TAH')}/>
                                    <label for="TAH">TAH</label>
                                </div>
                                <div className="input-fieldM">
                                    <input type="checkbox" id="BSO" name="major" value="BSO" onChange={handleInputChange} checked={values.major.includes('BSO')}/>
                                    <label for="BSO">BSO </label>
                                    <input type="checkbox" id="Myomectomy" name="major" value="Myomectomy" onChange={handleInputChange} checked={values.major.includes('Myomectomy')}/>
                                    <label for="Myomectomy">Myomectomy</label>
                                </div>
                                    
                                <div className="input-fieldM">
                                    <input type="checkbox" id="Polpectomy" name="major" value="Polpectomy" onChange={handleInputChange} checked={values.major.includes('Polpectomy')}/>
                                    <label for="Polpectomy">Polpectomy</label>
                                </div>  
                            </div>
                    </div>
                    <div className="btn1"><button type="submit" name="submit">Upadate</button></div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}
export default VisitEdit;
