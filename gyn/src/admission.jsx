import './App.css';
import './home.css';
import react, { useEffect ,useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import {faUser } from '@fortawesome/free-solid-svg-icons'

const PAdd = () => {
    const navigate = useNavigate();

    const [values,setValues] = useState({
        bht:'',
        ward:'21',
        consultant:'',
        height:'',
        weight:'',
        past_med:'',
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

    return (
        <div>
            <nav class="navM">
          <div class="containerN">
            <h1 class="logo">
              <a href="/home" className='a'>GYNECOLOGY</a>
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

            <header>Patient Registration</header>
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <div className="B">
                        <span className="title">Section B - Admission details</span>
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
                                <textarea id="complain" placeholder="Enter text here" name="complain" rows="3" cols="50" onChange={e =>setValues({...values,complaint:e.target.value})}></textarea>
                        </div>
                            <br></br> 

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
                                <label for="menarche_age">Menarche Age : </label>
                                <input type="number" placeholder="yrs" id="menarche_age" name="menarche_age"   />
                                <label for="menopausal_age">Menopausal Age : </label>
                                <input type="number" id="menopausal_age" name="menopausal_age" placeholder="yrs" />
                                <label for="lmp">LMP : </label>
                                <input type="number" id="lmp" name="lmp" placeholder="days" />
                                <p>Menstrual Cycle : 
                                <input type="radio" id="regular" name="Menstrual" value="Regular" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="regular">Regular</label>
                                <input type="radio" id="irregular" name="Menstrual" value="Irregular" onChange={e =>setValues({...values,past_surg:e.target.value})}/>
                                <label for="irregular">Irregular</label></p>
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
