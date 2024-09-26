import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faFilePen } from '@fortawesome/free-solid-svg-icons'
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';
import ProfileCard from './component/profileCard.jsx';



const Visit = () =>{
    const addCard = () => {
        navigate(`/patients_information/patient_profile/patient_admission/patient_visit/visit_form`);
    };

    const navigate = useNavigate();
    // let patient_id=localStorage.getItem('patient_id');   

    function assign(){
        //localStorage.setItem('patient_phn',roe);
        navigate('/patients_information/patient_profile/patient_admission/patient_visit/patient_admission_details');
    }

    const handlePrevious = () => {
        navigate(`/patients_information/patient_profile/patient_admission`);
    };

    // const [data, setData] = useState([]);
      
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:8081/patientda/${patient_id}`);
    //             setData(response.data[0]);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
      
    //     fetchData();
    // }, []);
      
    return(
        <div className="">
            <NavBar/>
            <Nav/>
            <div className='card'>
                <h2> Patient Visit</h2>
                <ProfileCard/>
                <div class="cntner">
                    <div class="cd">
                        <div class="face face1" onClick={()=>assign()}>
                            <div class="content">
                                <FontAwesomeIcon icon={faFilePen} />              
                                <h3>Admission Details</h3>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <p> This feature contains admission details of this patient.</p>
                                <a href="./patient_day" type="button">Show</a>
                            </div>
                        </div>
                    </div>

                <div class="cd">
                  <div class="face face1" onClick={addCard}>
                    <div class="content">
                      <FontAwesomeIcon icon={faSquarePlus} />              
                      <h3>New Visit</h3>
                    </div>
                  </div>
                  <div class="face face2">
                    <div class="content">
                      <p> This feature contains adding a new Visit.</p>
                      <a href="/patients_information/patient_profile/patient_admission/patient_visit/visit_form" type="button">Add</a>
                    </div>
                  </div>
                </div>
              </div> 

              <button onClick={handlePrevious}>{"<<"} &nbsp;&nbsp; previous </button>
            </div> 
              
          </div>
    );
}

export default Visit;


