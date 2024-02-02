import './App.css';
import react, { useEffect ,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

export const PReg = () => {

    const [values,setValues] =useState({
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

      const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
    
        // Use the spread operator to create a new array with the selected values
        const updatedPastMed = checked
          ? [...values.past_med, value]
          : values.past_med.filter((item) => item !== value);
    
        setValues((prevValues) => ({
          ...prevValues,
          [name]: updatedPastMed,
        }));
      };

      const handleBloodGroupChange = (e) => {
        setValues({
          ...values,
          bloodgr: e.target.value,
        });
      };
    
    

    return (

        <div className="container">
            <header>Patient Registration</header>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <div className="A">
                        <span className="title">Section A</span>
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="date">Admission Date : </label>
                                <input type="datetime-local" onChange={handleDateChange} value={values.date} required/>
                            </div>
                        </div>

                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="full_name">Fullname : </label>
                                <input type="text" placeholder="Enter text here" onChange={e =>setValues({...values,fname:e.target.value})} required/>
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
                            <div className="input-fieldN">
                                <label htmlFor="dob">Date of Birth : </label>
                                <input type="date" placeholder="Enter number here" onChange={e =>setValues({...values,dob:e.target.value})} required/>
                            </div>   
                            <div className="input-fieldN">
                                <label htmlFor="marrital_status">Marrital Status : </label>
                                <select name="marrital_status" id="marrital_status" onChange={e =>setValues({...values,status:e.target.value})} required>
                                    <option value="married">Married</option>
                                    <option value="unmarried">Unmarried</option>
                                </select>
                            </div> 
                            <div className="input-fieldN">
                                <label htmlFor="nic">NIC No. : </label>
                                <input type="text" placeholder="Enter number here" pattern="(^[0-9]{12}$)|(^[0-9]{10}[v]$)" maxlength="12" onChange={e =>setValues({...values,nic:e.target.value})}/>
                            </div>
                            <div className="input-fieldN">
                                <label htmlFor="phn">PHN No. : </label>
                                <input type="text" placeholder="Enter number here" pattern="[0-9]{11}" maxlength="11" onChange={e =>setValues({...values,phn:e.target.value})} required/>
                            </div>   
                            <div className="input-fieldN">
                                <label htmlFor="phone_no">Telephone No. : </label>
                                <input type="tel" pattern="[0-9]{10}" placeholder="Enter number here" maxlength="10" onChange={e =>setValues({...values,tp:e.target.value})} required/>
                            </div>                             
                        </div>
                        
                    </div>

                    <div className="B">
                        <span className="title">Section B</span>
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
                                <input type="number" max={250} min={90} onChange={e =>setValues({...values,height:e.target.value})} />
                            </div>
                            <div className='unit1'>
                                <p>cm</p>
                            </div>
                            <div className="input-fieldH">
                                <label htmlFor="weight">Weight : </label>
                                <input type="number" max={400} min={30}  onChange={e =>setValues({...values,weight:e.target.value})}/>
                            </div>
                            <div className='unit1'>
                                <p>kg</p>
                            </div>    
                            
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
                         
                            <div className="input-field">
                                <label htmlFor="allergy">Allergy History : </label>
                                <textarea id="allergy" placeholder="Enter text here" name="allergy" rows="3" cols="50" onChange={e =>setValues({...values,allergy:e.target.value})}></textarea>
                            </div> 
                            <div className="input-field">
                                <label htmlFor="complain">Presenting Complaints : </label>
                                <textarea id="complain" placeholder="Enter text here" name="complain" rows="3" cols="50" onChange={e =>setValues({...values,complaint:e.target.value})}></textarea>
                            </div>
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
                         
                            <div className="input-field">
                                <label htmlFor="other">Other : </label>
                                <textarea id="other" placeholder="Enter text here" name="other" rows="3" cols="50" onChange={e =>setValues({...values,other:e.target.value})}></textarea>
                            </div> 
                            <div className="input-fieldM">
                                <p>Past Surgical History : </p>
                                <input type="checkbox" id="diabetics" name="diabetics" value="Diabetics Mellitus" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="diabetics">Diabetics Mellitus</label>
                                <input type="checkbox" id="hypertension" name="hypertension" value="Hypertension" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="hypertension">Hypertension</label>
                                <input type="checkbox" id="hypothyroidism" name="hypothyroidism" value="Hypothyroidism" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="hypothyroidism">Hypothyroidism</label>
                                <input type="checkbox" id="asthma" name="asthma" value="Bronchal Asthma" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="asthma">Bronchal Asthma</label>
                                <input type="checkbox" id="epilepsy" name="epilepsy" value="Epilepsy" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="epilepsy">Epilepsy</label>
                            </div> 
                            <div className="input-field">
                                <label htmlFor="other">Other : </label>
                                <textarea id="other" placeholder="Enter text here" name="other" rows="3" cols="50" onChange={e =>setValues({...values,other:e.target.value})}></textarea>
                            </div> 
                            {/* <div className="input-fieldM">
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
                            </div>  */}
                            <div className="input-field">
                                <label htmlFor="cancer">Family History of Cancers : </label>
                                <textarea id="cancer" placeholder="Enter text here" name="cancer" rows="3" cols="50" onChange={e =>setValues({...values,past_hist:e.target.value})}></textarea>
                            </div>   
                            {/* <div className="input-fieldM">
                                <p>Menstrual History : </p>
                                <label for="diabetics">Menarche Age :</label>
                                <input type="text" id="menarche_age" name="menarche_age" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="menopausal_age">Menopausal Age</label>
                                <input type="text" id="menopausal_age" name="menopausal_age" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="lmp">LMP</label>
                                <input type="text" id="lmp" name="lmp" value="" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <p>Menstrual Cycle : </p>
                                <input type="checkbox" id="regular" name="regular" value="Regular" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="asthma">Regular</label>
                                <input type="checkbox" id="irregular" name="irregular" value="Irregular" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="irregular">Irregular</label>
                            </div>  */}
                             
                            <div className="input-field">
                                <label htmlFor="diagnosis">Diagnosis : </label>
                                <textarea id="diagnosis" placeholder="Enter text here" name="diagnosis" rows="3" cols="50" onChange={e =>setValues({...values,diagnosis:e.target.value})}></textarea>
                            </div>    
                                      
                            <div>
                                <button type="submit">Register</button>
                                </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        
    )
}
