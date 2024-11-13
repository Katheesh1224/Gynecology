import '../App.css';
import '../home.css';
import { useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import { toast } from 'react-toastify';


const VisitForm = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [values,setValues] = useState({
        phn:'',
        visit_id:'',
        date:'',
        visit_no:'',
        seenBy:'',
        time:'',
        complaints:[],
        abnormalUlerine:[],
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

    const handleSubmit =(e) =>{
        console.log(e);
        e.preventDefault();
        axios.post('http://localhost:8081/treat',values)
        .then(res => {
            navigate('/home');
            toast.success('Form submitted successfully!');
            console.log(res);
        })
        .catch(err => {
            console.log(err);

            let errorMessage = 'An unexpected error occurred.';
            
            if (err.response && err.response.data) {
                errorMessage = err.response.data.error || err.response.data.details || errorMessage;
            }
            toast.error(`There was an error submitting the form: ${errorMessage}`);
        });
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
    
      const handleChangeNo = (event) => {
          // Get the entered value
          const enteredValue = event.target.value;
          
          // Update the state with the entered value
          setValue(enteredValue);
        };
        const inputClass = isNaN(value) || value < 0 || value > 200 ? "invalid" : '';

    return (
        <div>
            <NavBar/>
            <Nav/>
        <div className="container">

            <h2>Visit Form</h2>
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
                                <label htmlFor="visit_no"> Visit No : </label>
                                <input type="number"  name='numberInput' id={inputClass}  onChange={handleChangeNo}  required/>
                            </div>
                            
                            <div className="input-field">
            <label htmlFor="full_name">Seen by : </label>
            <select name="role" id="status" onChange={e =>setValues({...values,role:e.target.value})} >
                                    <option value="consultant">Consultant</option>
                                    <option value="registrar">Registrar</option>
                                    <option value="medical_officer">Medical Officer</option>
                                    <option value="data_entry">Data Entry</option>
                                </select>
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
                                <input type="checkbox" id="subtertility" name="past_med" value="subtertility"/>
                                <label for="subtertility">subtertility</label>
                                </div>
                            <div className="input-fieldM">
                                <input type="checkbox" id="Abdominal Pain" name="past_med" value="Abdominal Pain"/>
                                <label for="Abdominal Pain">Abdominal Pain</label>
                                <input type="checkbox" id="Back Pain" name="past_med" value="Back Pain"/>
                                <label for="Back Pain">Back Pain</label>
                                <input type="checkbox" id="Urinary incontenur" name="past_med" value="Urinary incontenur"/>
                                <label for="Urinary incontenur">Urinary incontenur</label>
                                </div>
                                
                            <div className="input-fieldM">
                                <input type="checkbox" id="Show" name="past_med" value="Show"/>
                                <label for="Show">Show</label>
                               <input type="checkbox" id="Reduced fetal movements" name="past_med" value="Reduced fetal movements"/>
                                <label for="Reduced fetal movements">Reduced fetal movements</label>
                               <input type="checkbox" id="lump at Vulva" name="past_med" value="lump at Vulva"/>
                                <label for="lump at Vulva ">lump at Vulva</label>
                                </div>
                                
                            <div className="input-fieldM">
                                <input type="checkbox" id="Vaginal Discharge" name="past_med" value="Vaginal Discharge" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="Vaginal Discharge">Vaginal Discharge</label>
                                <input type="checkbox" id="Blood Sugar Series" name="past_med" value="Blood Sugar Series" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="Blood Sugar Series">Blood Sugar Series</label>   
                                <input type="checkbox" id="Blood pressure monitor " name="past_med" value="Blood pressure monitor" onChange={e =>setValues({...values,past_med:e.target.value})}/>
                                <label for="Blood pressure monitor">Blood pressure monitor</label>   
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
                                <input type="checkbox" id="poit menopances bleed" name="past_med" value="poit menopances bleed"/>
                                <label for="poit menopances bleed">poit menopances bleed</label>
                                <input type="checkbox" id="Heavy mensurus bleeding" name="past_med" value="Heavy mensurus bleeding"/>
                                <label for="Heavy mensurus bleeding">Heavy mensurus bleeding</label>
                                </div>
                            <div className="input-fieldM">
                                <input type="checkbox" id="dysmenurrhoea" name="past_med" value="dysmenurrhoea"/>
                                <label for="dysmenurrhoea">dysmenurrhoea </label>
                                <input type="checkbox" id="Oliyomennorihe" name="past_med" value="Oliyomennorihe"/>
                                <label for="Oliyomennorihe">Oliyomennorihe</label>
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
                            <input type="number" name="bpa" placeholder="BPA (mmHg)" onChange={e =>setValues({...values,bpa:e.target.value})} min="50" max="200" />/
                            <input type="number" name="bpb" placeholder="BPB (mmHg)" onChange={e =>setValues({...values,bpb:e.target.value})} min="50" max="150" />
                            <div className="input-field">
                            </div>
                            <div className="input-field">
                                <label htmlFor="Pulse rate"> Pulse rate: </label>
                                <input type="number" placeholder='bpm' onChange={e =>setValues({...values,pr:e.target.value})} min="40" max="220" required/>
                            </div>
                                                       
                        </div>
                       
                    </div>
                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="Examination">Abdominal Examination : </label>
                                <textarea id="Examination" placeholder="Enter text here" name="abdominal" rows="3" cols="50" onChange={e =>setValues({...values,allergy:e.target.value})}></textarea>
                            </div> 
                        </div>
                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="Examination">Gynaecology Examination : </label>
                                <textarea id="Examination" placeholder="Enter text here" name="gynecology" rows="3" cols="50" onChange={e =>setValues({...values,allergy:e.target.value})}></textarea>
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
                                <input type="number" placeholder='count/mm³' min="3000" max="15000" onChange={e => setValues({...values, wbc: e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="Hb"> Hb : </label>
                                <input type="number" step="any" placeholder='g/dL' min="10" max="20" onChange={e => setValues({...values, hb: e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="P/t"> P/t : </label>
                                <input type="number" placeholder='count/mm³' min="100000" max="600000" onChange={e => setValues({...values, plate: e.target.value})} required/>
                            </div>
                                                        
                        </div>
                        {/* <br /> */}
                        
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="UFR"> UFR : </label>
                            </div>
                            <div className="input-field">
                                <label htmlFor="White cells"> White cells : </label>
                                <input type="number" placeholder='/hpf' onChange={e =>setValues({...values,whiteCell:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="Red cells "> Red cells : </label>
                                <input type="number" placeholder='/hpf' onChange={e =>setValues({...values,redCell:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="Select_protein">Protein : </label>
                                <select name="protein" id="protein"  onChange={e =>setValues({...values,protein:e.target.value})} required>
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
                                <input type="number" placeholder='mmol/l' onChange={e =>setValues({...values,seK:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="Na+"> Na+ : </label>
                                <input type="number" placeholder='mmol/l' onChange={e =>setValues({...values,seNa:e.target.value})} required/>
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
                                <input type="number" placeholder='mg/DL' onChange={e =>setValues({...values,crp:e.target.value})} required/>
                            </div>
                           
                        </div>
                        {/* <br /> */}
                        <div className="fields1">
                        <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="FBS"> FBS   :  </label>
                            </div>
                            <div className="input-field">
                                <input type="number" placeholder='mmol/l' onChange={e =>setValues({...values,fbs:e.target.value})} required/>
                            </div>
                            
                        </div>
                        {/* <br /> */}
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="PRBS">  PPBS:  </label>
                            </div>
                            <div className="input-field">
                                <label htmlFor="AB"> AB : </label>
                                <input type="number"  onChange={e =>setValues({...values,ppbsAB:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="AL"> AL : </label>
                                <input type="number"  onChange={e =>setValues({...values,ppbsAL:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="AD"> AD : </label>
                                <input type="number"  onChange={e =>setValues({...values,ppbsAD:e.target.value})} required/>
                            </div>
                        </div>
                        <div className="fields1">
                        <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="Scan">  LFT :  </label>
                            </div>
                            {/* &emsp; */}
                        <div className="input-field">
                                <label htmlFor="AB"> ALT : </label>
                                <input type="text"  onChange={e =>setValues({...values,lftALT:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="AL"> AST : </label>
                                <input type="text"  onChange={e =>setValues({...values,lftAST:e.target.value})} required/>
                            </div> 
                        </div>
                        <br />
                        <div className="fields1">
                        <div className="input-field">
                                <label htmlFor="management">Other : </label>
                                <textarea id="management" placeholder="Enter text here" name="management" rows="3" cols="50" onChange={e =>setValues({...values,lftOther:e.target.value})}></textarea>
                            </div> 
                            </div>
                            <br />
                        <div className="fields1">
                        <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="Scan">Scanning:</label>
                            </div>
                        <div className="input-field">
                                <label htmlFor="AB"> MRI :  </label>
                                <input type="text"  onChange={e =>setValues({...values,mri:e.target.value})} required/>
                            </div>
                            
                            <div className="input-field">
                                <label htmlFor="AL"> CT : </label>
                                <input type="text"  onChange={e =>setValues({...values,ct:e.target.value})} required/>
                            </div> 
                        </div>
                        <br />
                        <div className="fields1">
                        <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="Scan">  USS:  </label>
                            </div>&emsp;&emsp;
                        <div className="input-field">
                                <label htmlFor="AB"> TAS : </label>
                                <input type="text"  onChange={e =>setValues({...values,tas:e.target.value})} required/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="AL"> TUS : </label>
                                <input type="text"  onChange={e =>setValues({...values,tus:e.target.value})} required/>
                            </div> 
                        </div>
                    </div>
                    <span className="title">Management</span>                                                  
                    <div className="A">
                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="Others">Medical management : </label>
                                <textarea id="Decision" placeholder="Enter text here" name="medical" rows="3" cols="50" onChange={e =>setValues({...values,medicalManage:e.target.value})}></textarea>
                            </div> 
                        </div>
                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="Others">Surgical management : </label>
                                <textarea id="Decision" placeholder="Enter text here" name="medical" rows="3" cols="50" onChange={e =>setValues({...values,surgicalManage:e.target.value})}></textarea>
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
                            <input type="text"  onChange={e =>setValues({...values,minorEua:e.target.value})} required/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="AL"> EB : </label>
                            <input type="text"  onChange={e =>setValues({...values,minorEb:e.target.value})} required/>
                        </div> 
                    </div>

                        <div className="fields1">
                        <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="Scan">  Major :  </label>
                            </div>&emsp;&emsp;
                    </div>
                        <div className="fields">
                            <div className="input-fieldM">
                                <input type="checkbox" id="BL/LRT" name="past_med" value="BL/LRT"/>
                                <label for="BL/LRT">BL/LRT</label>
                                <input type="checkbox" id="TAH" name="past_med" value="TAH"/>
                                <label for="TAH">TAH</label>
                            </div>
                            <div className="input-fieldM">
                                <input type="checkbox" id="BSO" name="past_med" value="BSO"/>
                                <label for="BSO">BSO </label>
                                <input type="checkbox" id="Myomectomy" name="past_med" value="Myomectomy"/>
                                <label for="Myomectomy">Myomectomy</label>
                            </div>
                                
                            <div className="input-fieldM">
                                <input type="checkbox" id="Polpectomy" name="past_med" value="Polpectomy"/>
                                <label for="Polpectomy">Polpectomy</label>
                            </div>  
                        </div>
                </div>
                <div className="btn1" style={{display:'flex'}} ><button type="submit" name="submit" style={{backgroundColor:'#512da8'}} >Submit</button></div>
                <div className="btn" ><button type="submit" name="cancel" style={{backgroundColor:'red'}} onClick={()=>{navigate('/home');}}>Cancel</button></div>
            </form>
        </div>
        </div>
    )
}
export default VisitForm;
