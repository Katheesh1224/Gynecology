import React from 'react';
import {useNavigate, useParams } from 'react-router-dom';
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
    
    const { id } = useParams();

    const handlePrevious = async () => {
        navigate(`/patients_information/patient_profile/patient_admission/${data.id}`);
    };

    const showAdmission = async () => {
        navigate(`/patients_information/patient_profile/patient_admission/patient_visit/patient_admission_details/${data.phn}`);
    };

    const [data, setData] = useState([]);
      
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/patientda/${id}`);
                setData(response.data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
      
        fetchData();
    }, [id]);
      
    return(
        <div className="">
            <NavBar/>
            <Nav/>
            <div className='card'>
                <h2> Patient Visit</h2>
                <ProfileCard/>
                <div class="cntner">
                    <div class="cd">
                        <div class="face face1" onClick={showAdmission}>
                            <div class="content">
                                <FontAwesomeIcon icon={faFilePen} />              
                                <h3>Admission 1 Details</h3>
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


