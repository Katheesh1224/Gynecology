import '../App.css';
import '../home.css';
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'; 
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import Footer from '../Component/Footer.jsx';



const MedHisEdit = () => {
    const navigate = useNavigate();
    let patient_phn=localStorage.getItem('patient_phn');

    const [values,setValues] = useState({
        phn:'',
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
        other:''
    })

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/patient/medicalhx/${patient_phn}`);
            const {
                phn, allergy, past_med, past_med_other,
                past_surg, past_surg_other, hx_diseases,
                hx_cancer, hx_cancer_other, diagnosis, height,
                weight, menarche_age, menopausal_age,
                lmp, menstrual_cycle
            } = response.data;
    
            setValues({
                phn,
                allergy,
                past_med: past_med.split(', '),
                past_med_other,
                past_surg: past_surg.split(', '),
                past_surg_other,
                hx_diseases,
                hx_cancer: hx_cancer.split(', '),
                hx_cancer_other,
                diagnosis,
                height,
                weight,
                menarche_age,
                menopausal_age,
                lmp,
                menstrual_cycle,
                other: '' // Keep 'other' in case it's used later
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch patient data.');
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/patient/medicalUpdate/${patient_phn}`, values)
            .then(res => {
                navigate(`/patients_information/patient_profile/patient_history`);
                toast.success('Form updated successfully!');
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
    
    

    return (
        <div className='wrapper'>
            <NavBar/>
            <Chatbot/>
            <div className='main-content'>
                <div className='side-bar'>
                    <Nav/>
                </div>
                

        <div className="container">

            <h2 style={{ fontWeight: 'bold' }}>Patient Medical History Updadte</h2>
            <form onSubmit={handleUpdate}>
                <div className="form">
                    <div className="A">
                        <span className="title">Personal details identification</span>
                        
                            <div className="input-fieldN">
                                <label htmlFor="phn">PHN No. : </label>
                                <input type="text" placeholder="Enter number here" pattern="[0-9]{11}" maxLength={11} value={values.phn} onChange={e =>setValues({...values,phn:e.target.value})} readOnly required/>
                            </div>                             
                        
                        
                    </div>

                    <div className="B">
                        <span className="title">History details</span>
                        <div className="fields">
                            <div className="input-fieldH">
                                <label htmlFor="height">Height : </label>
                                <input type="number" placeholder="cm"max={250} min={90} value={values.height} onChange={e =>setValues({...values,height:e.target.value})} />
                            </div>

                            <div className="input-fieldH">
                                <label htmlFor="weight">Weight : </label>
                                <input type="number" placeholder="kg" max={400} min={30} value={values.weight}  onChange={e =>setValues({...values,weight:e.target.value})}/>
                            </div>
                         
                            <div className="input-field">
                                <label htmlFor="allergy">Allergy History : </label>
                                <textarea id="allergy" placeholder="Enter text here" name="allergy" rows="3" cols="50" value={values.allergy} onChange={e =>setValues({...values,allergy:e.target.value})}></textarea>
                            </div> 
                            <div className="input-field">
                                <label htmlFor="complain">Family History of other Diseases : </label>
                                <textarea id="complain" placeholder="Enter text here" name="complain" rows="3" cols="50" value={values.hx_diseases} onChange={e =>setValues({...values,hx_diseases:e.target.value})}></textarea>
                        </div>
                            <br></br> 

                            <div className="input-fieldM">
                                <p>Past Medical History : </p>
                                <input type="checkbox" id="diabetics" name="past_med" value="Diabetics mellitus" onChange={handleInputChange} checked={values.past_med.includes('Diabetics mellitus')}/>
                                <label htmlFor="diabetics">Diabetics mellitus</label>
                                <input type="checkbox" id="hypertension" name="past_med" value="Hypertension" onChange={handleInputChange} checked={values.past_med.includes('Hypertension')}/>
                                <label htmlFor="hypertension">Hypertension</label>
                                <input type="checkbox" id="hypothyroidism" name="past_med" value="Hypothyroidism" onChange={handleInputChange} checked={values.past_med.includes('Hypothyroidism')}/>
                                <label htmlFor="hypothyroidism">Hypothyroidism</label>
                                <input type="checkbox" id="asthma" name="past_med" value="Bronchial asthma" onChange={handleInputChange} checked={values.past_med.includes('Bronchial asthma')}/>
                                <label htmlFor="asthma">Bronchial asthma</label>
                                <input type="checkbox" id="epilepsy" name="past_med" value="Epilepsy" onChange={handleInputChange} checked={values.past_med.includes('Epilepsy')}/>
                                <label htmlFor="epilepsy">Epilepsy</label>
                            </div>
                            <div className="input-fieldM">
                                <input type="checkbox" id="valvular_heart" name="past_med" value="Valvular heart diseases" onChange={handleInputChange} checked={values.past_med.includes('Valvular heart diseases')}/>
                                <label htmlFor="valvular_heart">Valvular heart diseases</label>
                                <input type="checkbox" id="ishemic_heart" name="past_med" value="Ishemic heart diseases" onChange={handleInputChange} checked={values.past_med.includes('Ishemic heart diseases')}/>
                                <label htmlFor="ishemic_heart">Ishemic heart diseases</label>
                                <input type="checkbox" id="renal_diseases" name="past_med" value="Renal diseases" onChange={handleInputChange} checked={values.past_med.includes('Renal diseases')}/>
                                <label htmlFor="renal_diseases">Renal diseases</label>
                                <input type="checkbox" id="arthritis" name="past_med" value="Arthritis" onChange={handleInputChange} checked={values.past_med.includes('Arthritis')}/>
                                <label htmlFor="arthritis">Arthritis</label>
                                <input type="checkbox" id="hypercholesterolemia" name="past_med" value="Hypercholesterolemia" onChange={handleInputChange} checked={values.past_med.includes('Hypercholesterolemia')}/>
                                <label htmlFor="hypercholesterolemia">Hypercholesterolemia</label>
                            </div>

                            <div className="input-fieldM">
                                <p>Past Surgical History : </p>
                                <input type="checkbox" id="LSCS" name="past_surg" value="Lower Segment Cesarian Section" onChange={handleInputChange} checked={values.past_surg.includes('Lower Segment Cesarian Section')}/>
                                <label htmlFor="LSCS">Lower Segment Cesarian Section LSCS</label>
                                <input type="checkbox" id="LRT" name="past_surg" value="Tubal ligation" onChange={handleInputChange} checked={values.past_surg.includes('Tubal ligation')}/>
                                <label htmlFor="LRT">L Rproscopic Tubal ligation (LRT)</label>
                                <input type="checkbox" id="hysterectomy" name="past_surg" value="Total abdominal hysterectomy" onChange={handleInputChange} checked={values.past_surg.includes('Total abdominal hysterectomy')}/>
                                <label htmlFor="hysterectomy">Total abdominal hysterectomy</label>
                                <input type="checkbox" id="myomectomy" name="past_surg" value="Laparoscopic myomectomy" onChange={handleInputChange} checked={values.past_surg.includes('Laparoscopic myomectomy')}/>
                                <label htmlFor="myomectomy">Laparoscopic myomectomy</label>
                                <input type="checkbox" id="lap" name="past_surg" value="Lap and dye" onChange={handleInputChange} checked={values.past_surg.includes('Lap and dye')}/>
                                <label htmlFor="lap">Lap and Dye</label>
                            </div> 
                         
                            <div className="input-field">
                                <label htmlFor="med_other">Past Medical History Other : </label>
                                <textarea id="med_other" placeholder="Enter text here" name="med_other" rows="3" cols="50" value={values.past_med_other} onChange={e =>setValues({...values,past_med_other:e.target.value})}></textarea>
                            </div> 
                            
                            <div className="input-field">
                                <label htmlFor="surg_other">Past Surgical History Other : </label>
                                <textarea id="surg_other" placeholder="Enter text here" name="surg_other" rows="3" cols="50" value={values.past_surg_other} onChange={e =>setValues({...values,past_surg_other:e.target.value})}></textarea>
                            </div> 
                            <div className="input-fieldM">
                                <p>Family History of Cancers : </p>
                                <input type="checkbox" id="endometrical" name="hx_cancer" value="Endometrical CA" onChange={handleInputChange} checked={values.hx_cancer.includes('Endometrical CA')}/>
                                <label htmlFor="endometrical">Endometrical CA</label>
                                <input type="checkbox" id="overian" name="hx_cancer" value="Ovarian CA" onChange={handleInputChange} checked={values.hx_cancer.includes('Ovarian CA')}/>
                                <label htmlFor="overian">Ovarian CA</label>
                                <input type="checkbox" id="cervical" name="hx_cancer" value="Cervical CA" onChange={handleInputChange} checked={values.hx_cancer.includes('Cervical CA')}/>
                                <label htmlFor="cervical">Cervical CA</label>
                                <input type="checkbox" id="vulvular" name="hx_cancer" value="Vulvular CA" onChange={handleInputChange} checked={values.hx_cancer.includes('Vulvular CA')}/>
                                <label htmlFor="vulvular">Vulvular CA</label>
                                <input type="checkbox" id="breat" name="hx_cancer" value="Breast CA" onChange={handleInputChange} checked={values.hx_cancer.includes('Breast CA')}/>
                                <label htmlFor="breat">Breast CA</label>
                            </div> 

                            <div className="input-field">
                                <label htmlFor="cancer">Family History of Cancers : </label>
                                <textarea id="cancer" placeholder="Enter text here" name="cancer" rows="3" cols="50" value={values.hx_cancer_other} onChange={e =>setValues({...values,hx_cancer_other:e.target.value})}></textarea>
                            </div>   

                            <div className="input-fieldA">
                                <p>Menstrual History : </p>
                                <label htmlFor="menarche_age">Menarche Age : </label>
                                <input type="number" placeholder="yrs" id="menarche_age" name="menarche_age" value={values.menarche_age} onChange={e =>setValues({...values,menarche_age:e.target.value})}/>
                                <label htmlFor="menopausal_age">Menopausal Age : </label>
                                <input type="number" id="menopausal_age" name="menopausal_age" placeholder="yrs" value={values.menopausal_age} onChange={e =>setValues({...values,menopausal_age:e.target.value})}/>
                                <label htmlFor="lmp">LMP : </label>
                                <input type="number" id="lmp" name="lmp" placeholder="days" value={values.lmp} onChange={e =>setValues({...values,lmp:e.target.value})}/>
                                <p>Menstrual Cycle : 
                                <input type="radio" id="regular" name="Menstrual" value="regular"  onChange={e =>setValues({...values,menstrual_cycle:e.target.value})} checked={values.menstrual_cycle === 'regular'}/>
                                <label htmlFor="regular">Regular</label>
                                <input type="radio" id="irregular" name="Menstrual" value="irregular" onChange={e =>setValues({...values,menstrual_cycle:e.target.value})} checked={values.menstrual_cycle === 'irregular'}/>
                                <label htmlFor="irregular">Irregular</label></p>
                            </div> <br></br>
                            <div></div>
                            
                            <div className="input-field">
                                <label htmlFor="diagnosis">Diagnosis : </label>
                                <textarea id="diagnosis" placeholder="Enter text here" name="diagnosis" rows="3" cols="50" value={values.diagnosis} onChange={e =>setValues({...values,diagnosis:e.target.value})}></textarea>
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
export default MedHisEdit;
