import './App.css';
import './home.css';
<<<<<<< HEAD
import React, {useEffect, useState} from 'react';
=======
import React, {useState, useEffect} from 'react';
>>>>>>> 570a26641f8844cd13fbaaaf26731b7e9831e855
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';


const PAdd = () => {   
<<<<<<< HEAD
    const navigate = useNavigate();
    let patient_phn=localStorage.getItem('patient_phn');

=======
>>>>>>> 570a26641f8844cd13fbaaaf26731b7e9831e855

    const [values,setValues] = useState({
        date:'',
        phn:'',
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
        other:'',
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
            alert('Patient PHN is required.');
            return;
        }
        axios.post('http://localhost:8081/newReg',values)
        .then(res =>{
            console.log(res);
         
        })
        .catch(err =>console.log(err))
        navigate('/patients_information/patient_profile/patient_admission')
    }

<<<<<<< HEAD
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const currentDate = new Date().toISOString().split('T')[0];
    
        if (selectedDate > currentDate) {
          alert('Please select a date and time that is not in the future.');
        } else {
          setValues({ ...values, date: selectedDate });
        }
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
        }
=======
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
>>>>>>> 570a26641f8844cd13fbaaaf26731b7e9831e855

    return (
        <div>
            <NavBar/>
            <Nav/>
            <div className="container">
                <div className='heading'>
                    <div className="input-field-phn">
                        <label htmlFor="ward_no">PHN No. : </label>
                        <input type="number"  value={data.phn}  readOnly />
                    </div> 
                    <h2>Patient Admission Registration</h2>
                    <div className="input-field-add">
                        <label htmlFor="ward_no">Admission No. : </label>
                        <input type="number"  value=""  readOnly />
                    </div>

                </div>
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
    )
}
export default PAdd;
