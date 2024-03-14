import './App.css';
import './home.css';
import react, { useEffect ,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faHouse, faRectangleList, faHospitalUser, faUser } from '@fortawesome/free-solid-svg-icons'

const PReg = () => {
    const navigate = useNavigate();

    const [values,setValues] = useState({
        date:'',
        time:'',
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
        height:'',
        weight:'',
        past_med:[],
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

    const handleLogout = async () => {
        navigate('/');
          try {
            await axios.get('http://localhost:8081/logout');
            navigate('/');
          } catch (error) {
            console.error('Logout failed:', error);
          }
        };
    
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

    //   const handleCheckboxChange = (e) => {
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

      const handleBloodGroupChange = (e) => {
        setValues({
          ...values,
          bloodgr: e.target.value,
        });
      };
    
    

    return (
        <div>
            <nav class="navM">
          <div class="containerN">
            <h1 class="logo">
              <a href="/home">GYNECOLOGY</a>
            </h1>
            <ul>
              <li><a href="./" class=""><FontAwesomeIcon icon={faUser} /></a></li>
              <li>
                <div>
                  <button onClick={handleLogout} class="buttonHome">Logout</button>
                </div>
            </li>
            </ul>

          </div>
        </nav>
        <div className="container">

            <header>Visit Form</header>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <div className="A">
                        <span className="title">Visit Details</span>
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="date"> Date : </label>
                                <input type="datetime-local" onChange={handleDateChange} value={values.date} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="time"> Visit No : </label>
                                <input type="number" onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="full_name">Name : </label>
                                <input type="text" pattern="[A-Za-z]+" size="50" title="Only alphabets are allowed" placeholder="Enter text here" onChange={e =>setValues({...values,fname:e.target.value})} required/>
                            </div>                            
                        </div>
                    </div>

                    <div className="B">
                        <span className="title">Complaints </span>
                        <div className="fields">
                        <div className="input-fieldM">
                                <input type="checkbox" id="Vaginal Bleeding" name="past_med" value="Vaginal Bleeding"/>
                                <label for="Vaginal Bleeding">Vaginal Bleeding</label>
                                <input type="checkbox" id="Dribbiling" name="past_med" value="Dribbiling"/>
                                <label for="Dribbiling">Dribbiling</label>
                                </div>
                            <div className="input-fieldM">
                                <input type="checkbox" id="Abdominal Pain" name="past_med" value="Abdominal Pain"/>
                                <label for="Abdominal Pain">Abdominal Pain</label>
                                <input type="checkbox" id="Back Pain" name="past_med" value="Back Pain"/>
                                <label for="Back Pain">Back Pain</label>
                                </div>
                                
                            <div className="input-fieldM">
                                <input type="checkbox" id="Show" name="past_med" value="Show"/>
                                <label for="Show">Show</label>
                               <input type="checkbox" id="Reduced fetal movements" name="past_med" value="Reduced fetal movements"/>
                                <label for="Reduced fetal movements">Reduced fetal movements</label>
                                </div>
                                
                            <div className="input-fieldM">
                                <input type="checkbox" id="Vaginal Discharge" name="past_med" value="Vaginal Discharge" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="Vaginal Discharge">Vaginal Discharge</label>
                                <input type="checkbox" id="Blood Sugar Series" name="past_med" value="Blood Sugar Series" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="Blood Sugar Series">Blood Sugar Series</label>   
                            </div>
                            </div>
                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="allergy">Others : </label>
                                <textarea id="allergy" placeholder="Enter text here" name="allergy" rows="3" cols="50" onChange={e =>setValues({...values,allergy:e.target.value})}></textarea>
                            </div> 
                        </div>
        
         {/* Examination */}
                    <div className="A">
                        <span className="title">Examination</span>
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="date"> Blood Presure : </label>

                            </div>
                                <input type="number" name='mmHg'  placeholder="mmHg" onChange={e =>setValues({...values,time:e.target.value})} />
                            /<input type="number" name='mmHg' placeholder="mmHg" onChange={e =>setValues({...values,time:e.target.value})} />
                            <div className="input-field">
                            </div>
                            <div className="input-field">
                                <label htmlFor="time"> Pulse rate: </label>
                                <input type="number" placeholder='bpm' onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                                                       
                        </div>
                        <div className="fields1">
                        <div className="input-field">
                                <label htmlFor="full_name">Symphysis fundal height: </label>
                                <input type="number"  title="Only alphabets are allowed" placeholder="cm" onChange={e =>setValues({...values,fname:e.target.value})} required/>
                            </div> 
                            </div>
                    </div>
                    <div className="fields1">
                    <div className="input-field">
                                <label htmlFor="Select_headt">Head : </label>
                                <select name="Head" id="head" onChange={handleBloodGroupChange} value={values.bloodgr} required>
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
                        <div className="input-field">
                            <label htmlFor="full_name">Head: </label>
                            <input type="number"  title="Only alphabets are allowed" placeholder="value/5" onChange={e =>setValues({...values,fname:e.target.value})} required/>
                        </div> 


                    </div>
                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="allergy">Others : </label>
                                <textarea id="allergy" placeholder="Enter text here" name="allergy" rows="3" cols="50" onChange={e =>setValues({...values,allergy:e.target.value})}></textarea>
                            </div> 
                        </div>


                        <div className="A">
                        <span className="title">Management</span>
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="date"> Date : </label>
                                <input type="datetime-local" onChange={handleDateChange} value={values.date} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="time"> Visit No : </label>
                                <input type="number" onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="full_name">Name : </label>
                                <input type="text" pattern="[A-Za-z]+" size="50" title="Only alphabets are allowed" placeholder="Enter text here" onChange={e =>setValues({...values,fname:e.target.value})} required/>
                            </div>                            
                        </div>
                    </div>
                        <div className="fields">
                            
                            {/* <div className="input-fieldX">
                                <p>Allergy History : </p>
                                <input type="checkbox" id="drugs" name="drugs" value="Drugs"/>
                                <label for="drugs">Drugs</label>
                            </div>
                            <div className="input-fieldX2">
                                <input type="checkbox" id="drugs" name="drugs" value="Drugs"/>
                                <label for="drugs">Foods</label>
                            </div>
                            <div className="input-fieldX2">
                                <input type="checkbox" id="drugs" name="drugs" value="Drugs"/>
                                <label for="drugs">Plaster</label>
                            </div> */}
                         
                            

                            <div className="input-fieldM">
                                <p>Past Medical History : </p>
                                <input type="checkbox" id="diabetics" name="past_med" value="Diabetics Mellitus"/>
                                <label for="diabetics">Diabetics Mellitus</label>
                                <input type="checkbox" id="hypertension" name="past_med" value="Hypertension"/>
                                <label for="hypertension">Hypertension</label>
                                <input type="checkbox" id="hypothyroidism" name="past_med" value="Hypothyroidism"/>
                                <label for="hypothyroidism">Hypothyroidism</label>
                                <input type="checkbox" id="asthma" name="asthma" value="Bronchal Asthma" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="asthma">Bronchal Asthma</label>
                                <input type="checkbox" id="epilepsy" name="epilepsy" value="Epilepsy" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="epilepsy">Epilepsy</label>
                            </div>
                            <div className="input-fieldM">
                                <input type="checkbox" id="valvular_heart" name="valvular_heart" value="Valvular Heart Diseases" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="valvular_heart">Valvular Heart Diseases</label>
                                <input type="checkbox" id="ishemic_heart" name="ishemic_heart" value="Ishemic heart diseases" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="ishemic_heart">Ishemic Heart Diseases</label>
                                <input type="checkbox" id="renal_diseases" name="renal_diseases" value="Renal Diseases" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="renal_diseases">Renal Diseases</label>
                                <input type="checkbox" id="arthritics" name="arthritics" value="Arthritics" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="arthritics">Arthritics</label>
                                <input type="checkbox" id="hypercholesterolemia" name="hypercholesterolemia" value="Hypercholesterolemia" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="hypercholesterolemia">Hypercholesterolemia</label>
                            </div>

                            <div className="input-fieldM">
                                <p>Past Surgical History : </p>
                                <input type="checkbox" id="lscs" name="lscs" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="diabetics">Lower Segment Cesarian Section (LSCS)</label>
                                <input type="checkbox" id="lrt" name="lrt" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="hypertension">L Rproscopic Tubal ligation (LRT)</label>
                                <input type="checkbox" id="myomectomy" name="myomectomy" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="hypothyroidism">Laparoscopic myomectomy</label>
                                <input type="checkbox" id="lap" name="lap" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="asthma">Lap and Cye</label>
                            </div> 
                         
                            <div className="input-field">
                                <label htmlFor="other">Other : </label>
                                <textarea id="other" placeholder="Enter text here" name="other" rows="3" cols="50" onChange={e =>setValues({...values,other:e.target.value})}></textarea>
                            </div> 
                            
                            <div className="input-field">
                                <label htmlFor="other">Other : </label>
                                <textarea id="other" placeholder="Enter text here" name="other" rows="3" cols="50" onChange={e =>setValues({...values,other:e.target.value})}></textarea>
                            </div> 
                            <div className="input-fieldM">
                                <p>Family History of Cancers : </p>
                                <input type="checkbox" id="endometrical" name="endometrical" value="Endometrical CA"/>
                                <label for="endometrical">Endometrical CA</label>
                                <input type="checkbox" id="overian" name="overian" value="Overian CA"/>
                                <label for="overian">Overian CA</label>
                                <input type="checkbox" id="cervical" name="cervical" value="Cervical CA"/>
                                <label for="cervical">Cervical CA</label>
                                <input type="checkbox" id="vulvular" name="vulvular" value="Vulvular CA"/>
                                <label for="vulvular">Vulvular CA</label>
                                <input type="checkbox" id="breat" name="breat" value="Breat CA"/>
                                <label for="breat">Breat CA</label>
                            </div> 

                            <div className="input-field">
                                <label htmlFor="cancer">Family History of Cancers : </label>
                                <textarea id="cancer" placeholder="Enter text here" name="cancer" rows="3" cols="50" onChange={e =>setValues({...values,past_hist:e.target.value})}></textarea>
                            </div>   

                            <div className="input-fieldA">
                                <p>Menstrual History : </p>
                                <label htmlFor="weight">Menarche Age : </label>
                                <input type="text"/>
                                <label htmlFor="weight">Menarche Age : </label>
                                <input type="text"/>
                                <label htmlFor="weight">Menarche Age : </label>
                                <input type="text"/>
                                
                            </div>

                            <div className="input-fieldA">
                                <p>Menstrual History : </p>
                                <label for="menarche_age">Menarche Age :</label>
                                <input type="text" id="menarche_age" name="menarche_age" value="" />
                                <label for="menopausal_age">Menopausal Age</label>
                                <input type="text" id="menopausal_age" name="menopausal_age" value="" />
                                <label for="lmp">LMP</label>
                                <input type="text" id="lmp" name="lmp" value="" />
                                <p>Menstrual Cycle : </p>
                                <input type="radio" id="regular" name="Menstrual" value="Regular" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="regular">Regular</label>
                                <input type="radio" id="irregular" name="Menstrual" value="Irregular" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="irregular">Irregular</label>
                            </div> 

                            <div className="input-fieldA">
                                <p>Past Obstetric History : </p>
                                <label for="P">P </label>
                                <input type="text" id="P" name="P" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="C">C</label>
                                <input type="text" id="C" name="C" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                               
                                <label for="c1">C1</label>
                                <input type="text" id="c1" name="c1" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="c2">C2</label>
                                <input type="text" id="c2" name="c2" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="c3">C3</label>
                                <input type="text" id="c3" name="c3" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="c4">C4</label>
                                <input type="text" id="c4" name="c4" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="c5">C5</label>
                                <input type="text" id="c5" name="c5" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                            </div> 
                              
                            <div className="input-field">
                                <label htmlFor="diagnosis">Diagnosis : </label>
                                <textarea id="diagnosis" placeholder="Enter text here" name="diagnosis" rows="3" cols="50" onChange={e =>setValues({...values,diagnosis:e.target.value})}></textarea>
                            </div>    
                        </div>
                    </div>
                </div>
                <div className="btn"><button type="submit">Register</button></div>
            </form>
        </div>
        </div>
    )
}
export default PReg;
