import './App.css';
import './home.css';
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'; 
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';

const PReg = () => {
    const navigate = useNavigate();

    const [values,setValues] = useState({
        date:'',
        fname:'',
        address:'',
        bloodgr:'',
        dob:'',
        status:'',
        nic:'',
        phn:'',
        tp:'',
        bht:'',
        ward:'21',
        consultant:'',
        allergy:'',
        past_med:[],
        past_med_other:'',
        past_surg:[],
        past_surg_other:'',
        hx_diseases:'',
        hx_cancer:[],
        hx_cancer_other:'',
        diagnosis:'', 
        height:'',
        weight:'',
        menarche_age:'',
        menopausal_age:'',
        lmp:'',
        menstrual_cycle:'',        
        complaint:'',
        other:''
        // req.body.past_hist,
        // req.body.complaint,
        // req.body.past_obs,
        // past_hist:'',
        // past_obs:'',
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
    
      const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0];
    
        if (selectedDate > currentDate) {
          alert('Please select a date and time that is not in the future.');
        } else {
          setValues({ ...values, date: selectedDate });
        }
      };

      const handleDateofbirthChange = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0];
    
        if (selectedDate > currentDate) {
          alert('Please select a date and time that is not in the future.');
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

      const handleInputChange = (e) =>{
        const target = e.target;
        const name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        if (name === 'past_med') {
            if (target.checked) {
              value = [...values.past_med, target.value];
            } else {
              value = values.past_med.filter((subject) => subject !== target.value);
            }
            
          }
          setValues({
            ...values,
            [name]: value,
          });console.log(value);

          if (name === 'past_surg') {
            if (target.checked) {
              value = [...values.past_surg, target.value];
            } else {
              value = values.past_surg.filter((subject) => subject !== target.value);
            }
          }
          setValues({
            ...values,
            [name]: value,
          });console.log(value);

          if (name === 'hx_cancer') {
            if (target.checked) {
              value = [...values.hx_cancer, target.value];
            } else {
              value = values.hx_cancer.filter((subject) => subject !== target.value);
            }
          }
          setValues({
            ...values,
            [name]: value,
          });console.log(value);
          //const handleCheckboxChange = (e) => {
    //     const { name, value, checked } = e.target;
    
    //     // Use the spread operator to create a new array with the selected values
    //     const updatedPastMed = checked
    //       ? [...values.past_med, value]
    //       : values.past_med.filter((item) => item !== value);
    
    //     setValues((prevValues) => ({
    //       ...prevValues,
    //       [name]: updatedPastMed,
    //     }));
    //   };
      }
    
    

    return (
        <div className='wrapper'>
            <NavBar/>
            <div className='main-content'>
                <div className='side-bar'>
                    <Nav/>
                </div>
                

        <div className="container">

            <h2>Patient Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <div className="A">
                        <span className="title">Section A - Personal details identification</span>
                        <div className="fields1">
                            <div className="input-field" >
                                <label htmlFor="date">Admission Date : </label>
                                <input type="datetime-local" onChange={handleDateChange} value={values.date} required/>
                            </div>
                        </div>

                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="full_name">Fullname : </label>
                                <input type="text" pattern="[A-Za-z]+" title="Only alphabets are allowed" placeholder="Enter text here" onChange={e =>setValues({...values,fname:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="address">Address : </label>
                                <input type="text" placeholder="Enter text here" onChange={e =>setValues({...values,address:e.target.value})} required/>
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
                                <select name="marrital_status" id="marrital_status" onChange={e =>setValues({...values,status:e.target.value})} required>
                                    <option value="married">Select here</option>
                                    <option value="married">Married</option>
                                    <option value="unmarried">Unmarried</option>
                                </select>
                            </div> 
                            <div className="input-fieldN">
                                <label htmlFor="nic">NIC No. : </label>
                                <input type="text" placeholder="Enter number here" pattern="(^[0-9]{12}$)|(^[0-9]{9}[v]$)" maxLength="12" onChange={e =>setValues({...values,nic:e.target.value})}/>
                            </div>
                            <div className="input-fieldN">
                                <label htmlFor="phn">PHN No. : </label>
                                <input type="text" placeholder="Enter number here" pattern="[0-9]{11}" maxLength={11} onChange={e =>setValues({...values,phn:e.target.value})} required/>
                            </div>   
                            <div className="input-fieldN">
                                <label htmlFor="phone_no">Telephone No. : </label>
                                <input type="tel" pattern="[0-9]{10}" placeholder="Enter number here" maxLength="10" onChange={e =>setValues({...values,tp:e.target.value})} required/>
                            </div>                             
                        </div>
                        
                    </div>

                    <div className="B">
                        <span className="title">Section B - Admission details</span>
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
                         
                            <div className="input-field">
                                <label htmlFor="allergy">Allergy History : </label>
                                <textarea id="allergy" placeholder="Enter text here" name="allergy" rows="3" cols="50" onChange={e =>setValues({...values,allergy:e.target.value})}></textarea>
                            </div> 
                            <div className="input-field">
                                <label htmlFor="complain">Family History of other Diseases : </label>
                                <textarea id="complain" placeholder="Enter text here" name="complain" rows="3" cols="50" onChange={e =>setValues({...values,hx_diseases:e.target.value})}></textarea>
                        </div>
                            <br></br> 

                            <div className="input-fieldM">
                                <p>Past Medical History : </p>
                                <input type="checkbox" id="diabetics" name="past_med" value="Diabetics mellitus" onChange={handleInputChange}/>
                                <label htmlFor="diabetics">Diabetics mellitus</label>
                                <input type="checkbox" id="hypertension" name="past_med" value="Hypertension" onChange={handleInputChange}/>
                                <label htmlFor="hypertension">Hypertension</label>
                                <input type="checkbox" id="hypothyroidism" name="past_med" value="Hypothyroidism" onChange={handleInputChange}/>
                                <label htmlFor="hypothyroidism">Hypothyroidism</label>
                                <input type="checkbox" id="asthma" name="past_med" value="Bronchial asthma" onChange={handleInputChange}/>
                                <label htmlFor="asthma">Bronchial asthma</label>
                                <input type="checkbox" id="epilepsy" name="past_med" value="Epilepsy" onChange={handleInputChange}/>
                                <label htmlFor="epilepsy">Epilepsy</label>
                            </div>
                            <div className="input-fieldM">
                                <input type="checkbox" id="valvular_heart" name="past_med" value="Valvular heart diseases" onChange={handleInputChange}/>
                                <label htmlFor="valvular_heart">Valvular heart diseases</label>
                                <input type="checkbox" id="ishemic_heart" name="past_med" value="Ishemic heart diseases" onChange={handleInputChange}/>
                                <label htmlFor="ishemic_heart">Ishemic heart diseases</label>
                                <input type="checkbox" id="renal_diseases" name="past_med" value="Renal diseases" onChange={handleInputChange}/>
                                <label htmlFor="renal_diseases">Renal diseases</label>
                                <input type="checkbox" id="arthritis" name="past_med" value="Arthritis" onChange={handleInputChange}/>
                                <label htmlFor="arthritis">Arthritis</label>
                                <input type="checkbox" id="hypercholesterolemia" name="past_med" value="Hypercholesterolemia" onChange={handleInputChange}/>
                                <label htmlFor="hypercholesterolemia">Hypercholesterolemia</label>
                            </div>

                            <div className="input-fieldM">
                                <p>Past Surgical History : </p>
                                <input type="checkbox" id="LSCS" name="past_surg" value="Lower Segment Cesarian Section" onChange={handleInputChange}/>
                                <label htmlFor="LSCS">Lower Segment Cesarian Section LSCS</label>
                                <input type="checkbox" id="LRT" name="past_surg" value="Tubal ligation" onChange={handleInputChange}/>
                                <label htmlFor="LRT">L Rproscopic Tubal ligation (LRT)</label>
                                <input type="checkbox" id="hysterectomy" name="past_surg" value=">Total abdominal hysterectomy" onChange={handleInputChange}/>
                                <label htmlFor="hysterectomy">Total abdominal hysterectomy</label>
                                <input type="checkbox" id="myomectomy" name="past_surg" value="Laparoscopic myomectomy" onChange={handleInputChange}/>
                                <label htmlFor="myomectomy">Laparoscopic myomectomy</label>
                                <input type="checkbox" id="lap" name="past_surg" value="Lap and dye" onChange={handleInputChange}/>
                                <label htmlFor="lap">Lap and Dye</label>
                            </div> 
                         
                            <div className="input-field">
                                <label htmlFor="med_other">Past Medical History Other : </label>
                                <textarea id="med_other" placeholder="Enter text here" name="med_other" rows="3" cols="50" onChange={e =>setValues({...values,past_med_other:e.target.value})}></textarea>
                            </div> 
                            
                            <div className="input-field">
                                <label htmlFor="surg_other">Past Surgical History Other : </label>
                                <textarea id="surg_other" placeholder="Enter text here" name="surg_other" rows="3" cols="50" onChange={e =>setValues({...values,past_surg_other:e.target.value})}></textarea>
                            </div> 
                            <div className="input-fieldM">
                                <p>Family History of Cancers : </p>
                                <input type="checkbox" id="endometrical" name="hx_cancer" value="Endometrical CA" onChange={handleInputChange}/>
                                <label htmlFor="endometrical">Endometrical CA</label>
                                <input type="checkbox" id="overian" name="hx_cancer" value="Ovarian CA" onChange={handleInputChange}/>
                                <label htmlFor="overian">Ovarian CA</label>
                                <input type="checkbox" id="cervical" name="hx_cancer" value="Cervical CA" onChange={handleInputChange}/>
                                <label htmlFor="cervical">Cervical CA</label>
                                <input type="checkbox" id="vulvular" name="hx_cancer" value="Vulvular CA" onChange={handleInputChange}/>
                                <label htmlFor="vulvular">Vulvular CA</label>
                                <input type="checkbox" id="breat" name="hx_cancer" value="Breast CA" onChange={handleInputChange}/>
                                <label htmlFor="breat">Breast CA</label>
                            </div> 

                            <div className="input-field">
                                <label htmlFor="cancer">Family History of Cancers : </label>
                                <textarea id="cancer" placeholder="Enter text here" name="cancer" rows="3" cols="50" onChange={e =>setValues({...values,hx_cancer_other:e.target.value})}></textarea>
                            </div>   

                            <div className="input-fieldA">
                                <p>Menstrual History : </p>
                                <label htmlFor="menarche_age">Menarche Age : </label>
                                <input type="number" placeholder="yrs" id="menarche_age" name="menarche_age" onChange={e =>setValues({...values,menarche_age:e.target.value})}/>
                                <label htmlFor="menopausal_age">Menopausal Age : </label>
                                <input type="number" id="menopausal_age" name="menopausal_age" placeholder="yrs" onChange={e =>setValues({...values,menopausal_age:e.target.value})}/>
                                <label htmlFor="lmp">LMP : </label>
                                <input type="number" id="lmp" name="lmp" placeholder="days" onChange={e =>setValues({...values,lmp:e.target.value})}/>
                                <p>Menstrual Cycle : 
                                <input type="radio" id="regular" name="Menstrual" value="regular" onChange={e =>setValues({...values,menstrual_cycle:e.target.value})}/>
                                <label htmlFor="regular">Regular</label>
                                <input type="radio" id="irregular" name="Menstrual" value="irregular" onChange={e =>setValues({...values,menstrual_cycle:e.target.value})}/>
                                <label htmlFor="irregular">Irregular</label></p>
                            </div> <br></br>
                            <div></div>
                            
                            <div className="input-field">
                                <label htmlFor="diagnosis">Diagnosis : </label>
                                <textarea id="diagnosis" placeholder="Enter text here" name="diagnosis" rows="3" cols="50" onChange={e =>setValues({...values,diagnosis:e.target.value})}></textarea>
                            </div>    
                        </div>
                    </div>
                </div>
                <div className="btn1"><button type="submit">Register</button></div>
                
            </form>
        </div>
        </div>
        </div>
    )
}
export default PReg;
