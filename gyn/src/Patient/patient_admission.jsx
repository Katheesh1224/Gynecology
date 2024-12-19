import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import ProfileCard from '../Component/profileCard.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import Footer from '../Component/Footer.jsx';


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

const Admission = () => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const patient_id = localStorage.getItem('patient_id');
  // const patient_phn = localStorage.getItem('patient_phn');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patient data
        const patientResponse = await axios.get(`http://localhost:5000/patient/patient/${patient_id}`);
        const patientData = patientResponse.data; // Assuming data is an array

        // Set PHN to local storage if needed
        localStorage.setItem('patient_phn', patientData.phn);

        // Fetch admissions based on PHN
        const admissionsResponse = await axios.get(`http://localhost:5000/patient/admissions/${patientData.phn}`);
        const admissions = admissionsResponse.data; // Assuming this is an array of admissions
        localStorage.setItem('maxCount', admissions.length);
        // Generate card titles based on the number of admissions
        const admissionTitles = admissions.map((_, index) => `Admission ${index + 1}`);
        setCards(admissionTitles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [patient_id]);

  const addCard = () => {
    setCards((prevCards) => {
      const newCardTitle = `Admission ${prevCards.length + 2}`;
      navigate('/patients_information/patient_profile/patient_admission/new_admission');
      return [...prevCards, newCardTitle];
    });
  };

  const handlePrevious = () => {
    navigate(`/patients_information/patient_profile`);
  };

  const showAdmission = (index) => {
    // Set localStorage with the index of the admission clicked
    localStorage.setItem('addCount', index+1);
    navigate(`/patients_information/patient_profile/patient_admission/patient_visit`);
  };

  return (
    <div>
      <NavBar />
      <Nav />
      <Chatbot />
      <div className='container'>
        <h2 style={{fontWeight:"bold"}} >Patient Admissions</h2>
        <ProfileCard />
        <div className="cntner">
          {cards.map((card, index) => (
            <Card key={index} title={card} index={index} onClick={showAdmission} />
          ))}

          <div className="cd">
            <div className="face face1" onClick={addCard}>
              <div className="content">
                <FontAwesomeIcon icon={faSquarePlus} />
                <h3>New Admission</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>This feature contains adding a new Admission.</p>
                <a href="./patient_day" type="button">Add</a>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handlePrevious}>{"<<"} &nbsp;&nbsp; previous </button>
      </div>
      <Footer />
    </div>
  );
}

export default Admission;
