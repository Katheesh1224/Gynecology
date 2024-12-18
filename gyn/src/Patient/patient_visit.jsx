import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import AdmissionCard from '../Component/AdmissionCard.jsx'; 
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

const Visit = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [addCount, setAddCount] = useState(0); 
  const [isEditEnable, setIsEditEnable] = useState(false); 
  const patient_phn = localStorage.getItem('patient_phn');
  const add_count = localStorage.getItem('addCount');
  const visit_un = patient_phn + "_" + add_count;
  const role = localStorage.getItem('role');
  const addMaxCount = localStorage.getItem('maxCount');
 

  useEffect(() => {
    const fetchAddCount = async () => {
    try {
      // Fetch visits based on admission visit_no
      const visitsResponse = await axios.get(`http://localhost:5000/visit/visits/${visit_un}`);
      const visits = visitsResponse.data; // Assuming this is an array of visits

      // Generate card titles based on the number of visits
      const visitTitles = visits.map((_, index) => `Visit ${index + 1}`);
      setCards(visitTitles);
      // fetchAddCount();
    }catch (error) {
      console.error('Error fetching data:', error);
    }
    };
    fetchAddCount();
  }, [visit_un]);

  useEffect(() => {
    if (role !== 'superadmin') {
      setIsEditEnable(addMaxCount == add_count);
    } else {
      setIsEditEnable(true);
    }
  }, [role, addMaxCount, add_count]);

  const addCard = () => {
    setCards((prevCards) => {
      const newCardTitle = `Visit ${prevCards.length + 1}`;
      navigate('/patients_information/patient_profile/patient_admission/patient_visit/visit_form');
      return [...prevCards, newCardTitle];
    });
  };

  const handlePrevious = () => {
    navigate(`/patients_information/patient_profile/patient_admission`);
  };

  const handleEdit = () => {
    if (isEditEnable) {
      navigate(`/patients_information/patient_profile/patient_admission/patient_visit/patient_admission_details_edit`);
    }
  };

  const showVisit = (index) => {
    // Set localStorage with the index of the visit clicked
    localStorage.setItem('visitIndex', index + 1);
    navigate(`/patients_information/patient_profile/patient_admission/patient_visit/visit_details`);
  };

  return (
    <div className="">
      <NavBar />
      <Nav />
      <Chatbot />
      <div className='container'>
        <h2 style={{fontWeight:"bold"}} >Admission {add_count}</h2>
        <AdmissionCard />
        <div className="cntner">
          {cards.map((card, index) => (
            <Card key={index} title={card} index={index} onClick={showVisit} />
          ))}

          <div className="cd">
            <div className="face face1" onClick={addCard}>
              <div className="content">
                <FontAwesomeIcon icon={faSquarePlus} />
                <h3>New Visit</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>This feature contains adding a new Visit.</p>
                <a href="/patients_information/patient_profile/patient_admission/patient_visit/visit_form" type="button">Add</a>
              </div>
            </div>
          </div>
        </div>

        <div className="button-bar">
          <button onClick={handlePrevious}> {"<<"} &nbsp;&nbsp; Previous </button>
          <button disabled={!isEditEnable} onClick={handleEdit} style={!isEditEnable ? { backgroundColor: 'grey', cursor: 'not-allowed' } : {}}>
            Edit
          </button>
        </div>
        </div>
        <Footer />
      </div>
    
  );
};

export default Visit;
