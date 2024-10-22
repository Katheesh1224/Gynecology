import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import AdmissionCard from '../Component/AdmissionCard.jsx';


const Card = ({ title, index, onClick }) => (
  <div className="cd" onClick={() => onClick(index)}>
    <div className="face face1">
      <div className="content">
        <FontAwesomeIcon icon={faFilePen} />
        <h3>{title}</h3>
      </div>
    </div>
    <div className="face face2">
      <div className="content">
        <p>This feature contains details of {title}.</p>
        <a href="./patient_day" type="button">Show</a>
      </div>
    </div>
  </div>
);

const Visit = () =>{
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const patient_id = localStorage.getItem('patient_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patient data
        const patientResponse = await axios.get(`http://localhost:8081/patientda/${patient_id}`);
        const patientData = patientResponse.data[0]; // Assuming data is an array

        // Set PHN to local storage if needed
        localStorage.setItem('patient_phn', patientData.phn);

        // Fetch admissions based on PHN
        const admissionsResponse = await axios.get(`http://localhost:8081/admissions/${patientData.phn}`);
        const admissionData = admissionsResponse.data[0]; // Assuming this is an array of admissions

        const visitsResponse = await axios.get(`http://localhost:8081/visits/${admissionData.visit_no}`);
        const visits = visitsResponse.data; // Assuming this is an array of admissions

        // Generate card titles based on the number of admissions
        const visitTitles = visits.map((_, index) => `Visit ${index + 1}`);
        setCards(visitTitles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [patient_id]);

  const addCard = () => {
    setCards((prevCards) => {
      const newCardTitle = `Visit ${prevCards.length + 2}`;
      navigate('/patients_information/patient_profile/patient_admission/patient_visit/visit_form');
      return [...prevCards, newCardTitle];
    });
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


