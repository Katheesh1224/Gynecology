import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import AdmissionCard from '../Component/AdmissionCard.jsx'; // Ensure this component works for displaying visit info

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
  const patient_phn = localStorage.getItem('patient_phn');
  const add_count = parseInt(localStorage.getItem('addCount'), 10); // Ensure parsing here
  const visit_un = patient_phn + "_" + add_count;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch visits based on admission visit_no
        const visitsResponse = await axios.get(`http://localhost:8081/visits/${visit_un}`);
        const visits = visitsResponse.data; // Assuming this is an array of visits

        // Generate card titles based on the number of visits
        const visitTitles = visits.map((_, index) => `Visit ${index + 1}`);
        setCards(visitTitles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [visit_un]);

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
    navigate(`/patients_information/patient_profile/patient_admission/patient_visit/patient_admission_details_edit`);
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
      <div className='container'>
        <h2>Patient Visit</h2>
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

        <div className='button-bar'>
          <button onClick={handlePrevious}>{"<<"} &nbsp;&nbsp; previous </button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Visit;
