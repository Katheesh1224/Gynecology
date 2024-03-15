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
                            <br/>
                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="Complaints">Others : </label>
                                <textarea id="Complaints" placeholder="Enter text here" name="Complaints" rows="3" cols="50" onChange={e =>setValues({...values,allergy:e.target.value})}></textarea>
                            </div> 
                        </div>
        
         {/* Examination */}
                    <div className="A">
                        <span className="title">Examination</span>
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="Blood Presure"> Blood Presure : </label>

                            </div>
                                <input type="number" name='mmHg'  placeholder="mmHg" onChange={e =>setValues({...values,time:e.target.value})} />
                            /<input type="number" name='mmHg' placeholder="mmHg" onChange={e =>setValues({...values,time:e.target.value})} />
                            <div className="input-field">
                            </div>
                            <div className="input-field">
                                <label htmlFor="Pulse rate"> Pulse rate: </label>
                                <input type="number" placeholder='bpm' onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                                                       
                        </div>
                        <div className="fields1">
                        <div className="input-field">
                                <label htmlFor="Symphysis fundal height">Symphysis fundal height: </label>
                                <input type="number"  title="Only alphabets are allowed" placeholder="cm" onChange={e =>setValues({...values,fname:e.target.value})} required/>
                            </div> 
                            </div>
                    </div>
                    <div className="fields1">
                    <div className="input-field">
                                <label htmlFor="Select_head">Head : </label>
                                <select name="Head" id="head"  onChange={handleBloodGroupChange} value={values.bloodgr} required>
                                    <option value="">Select Head</option>
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
                        
                        </div> 
                        <div className="input-field">
                        
                        </div> 
                        <div className="input-field">
                            <label htmlFor="Head">Head: </label>
                            <input type="number"  title="Only alphabets are allowed" placeholder="value/5" onChange={e =>setValues({...values,fname:e.target.value})} required/>
                        </div> 


                    </div>
                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="Examination">Others : </label>
                                <textarea id="Examination" placeholder="Enter text here" name="Examination" rows="3" cols="50" onChange={e =>setValues({...values,allergy:e.target.value})}></textarea>
                            </div> 
                        </div>


                        <div className="A">
                        <span className="title">Management</span>
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="FBC"> FBC : </label>
                            </div>
                            <div className="input-field">
                                <label htmlFor="WBC"> WBC : </label>
                                <input type="number" placeholder='count/mm' onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="Hb"> Hb : </label>
                                <input type="number" placeholder='g/dL' onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="P/t"> P/t : </label>
                                <input type="number" placeholder='count/mm' onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                                                        
                        </div>
                        {/* <br /> */}
                        
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="UFR"> UFR : </label>
                            </div>
                            <div className="input-field">
                                <label htmlFor="White cells"> White cells : </label>
                                <input type="number" placeholder='/hpf' onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="Red cells "> Red cells : </label>
                                <input type="number" placeholder='/hpf' onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="Select_protein">Protein : </label>
                                <select name="protein" id="protein"  onChange={handleBloodGroupChange} value={values.bloodgr} required>
                                    <option value="">Select protein</option>
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
                                                        
                        </div>
                        {/* <br /> */}
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="SE">  SE&emsp;:  </label>
                            </div>
                            <div className="input-field">
                                <label htmlFor=" K+"> K+ : </label>
                                <input type="number" placeholder='mmol/l' onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="Na+"> Na+ : </label>
                                <input type="number" placeholder='mmol/l' onChange={e =>setValues({...values,time:e.target.value})} required/>
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
                                <input type="number" placeholder='mg/DL' onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                           
                        </div>
                        {/* <br /> */}
                        <div className="fields1">
                        <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="FBS"> FBS   :  </label>
                            </div>
                            <div className="input-field">
                                <input type="number" placeholder='mmol/l' onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                            
                        </div>
                        {/* <br /> */}
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="PRBS">  PRBS:  </label>
                            </div>
                            <div className="input-field">
                                <label htmlFor="AB"> AB : </label>
                                <input type="number"  onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="AL"> AL : </label>
                                <input type="number"  onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="AD"> AD : </label>
                                <input type="number"  onChange={e =>setValues({...values,time:e.target.value})} required/>
                            </div>
                        </div>
                        <br />
                        <div className="fields1">
                        <div className="input-field">
                                <label htmlFor="management">Other : </label>
                                <textarea id="management" placeholder="Enter text here" name="management" rows="3" cols="50" onChange={e =>setValues({...values,other:e.target.value})}></textarea>
                            </div> 
                            </div>
                    </div>
                    <div className="A">
                        <span className="title">Decision</span>
                        <div className="fields">
                            <div className="input-fieldM">
                                <input type="checkbox" id="EL|LSCS" name="Decision" value="EL|LSCS"/>
                                <label for="EL|LSCS">EL|LSCS</label>
                                <input type="checkbox" id="Introduction of Labour" name="Decision" value="Introduction of Labour"/>
                                <label for="DribIntroduction of Labourbiling">Introduction of Labour</label>
                                
                                </div>
                            <div className="input-fieldM">
                                <input type="checkbox" id="EM|LSCS" name="Decision" value="EM|LSCS"/>
                                <label for="EM|LSCS">EM|LSCS</label>
                                <input type="checkbox" id="Augmentation of Labour" name="Decision" value="Augmentation of Labour"/>
                                <label for="Augmentation of Labour">Augmentation of Labour</label>
                                
                                </div>
                                
                            <div className="input-fieldM">
                                <input type="checkbox" id="Blood transfusion" name="Decision" value="Blood transfusion"/>
                                <label for="Blood transfusion">Blood transfusion</label>
                               <input type="checkbox" id="ARM" name="Decision" value="ARM"/>
                                <label for="ARM">ARM</label>
                                
                                </div>
                                
                            <div className="input-fieldM">
                                <input type="checkbox" id="Continue MNT" name="Decision" value="Continue MNT" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="Continue MNT">Continue MNT</label>
                                <input type="checkbox" id="Blood Sugar Series" name="Decision" value="Blood Sugar Series" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="Blood Sugar Series">Blood Sugar Series</label>   
                            </div>
                            </div>
                        <div className="fields">
                            <div className="input-fieldM">
                                <input type="checkbox" id="Keep" name="Decision" value="Keep"/>
                                <label for="Keep">Keep</label>
                            </div>
                                <div className="input-fieldM">
                                <input type="checkbox" id="Continue same management" name="Decision" value="Continue same management"/>
                                <label for="Continue same management">Continue same management</label>
                            </div>
                        </div>
                            <br/>
                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="Others">Others : </label>
                                <textarea id="Decision" placeholder="Enter text here" name="Decision" rows="3" cols="50" onChange={e =>setValues({...values,allergy:e.target.value})}></textarea>
                            </div> 
                        </div>
                    </div>
                    </div>
                </div>
                <div className="btn" style={{display:'flex'}} ><button type="submit" name="submit" style={{backgroundColor:'blue'}}>Submit</button></div>
                <div className="btn" ><button type="submit" name="cancel" style={{backgroundColor:'red'}}>Cancel</button></div>
            </form>
        </div>
        </div>
    )
}
export default PReg;
