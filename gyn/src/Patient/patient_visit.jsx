import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import AdmissionCard from '../Component/AdmissionCard.jsx';


const Visit = () =>{
  const navigate = useNavigate();
  
  const addCard = () => {
    navigate(`/patients_information/patient_profile/patient_admission/patient_visit/visit_form`);
  };

  const handlePrevious = () => {
    navigate(`/patients_information/patient_profile/patient_admission`);
  };

  const handleEdit= () =>{
    navigate(`/patients_information/patient_profile/patient_admission/patient_visit/patient_admission_details_edit`);
  }
      
  return(
    <div className="">
      <NavBar/>
      <Nav/>
      <div className='container'>
        <h2> Patient Visit</h2>
        <AdmissionCard/>
        <div class="cntner">
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

        <div className='button-bar'>
                <button onClick={handlePrevious}>{"<<"} &nbsp;&nbsp; previous </button>
                <button onClick={handleEdit}> edit </button>
              </div>        
      </div> 
    </div>
  );
}

export default Visit;


