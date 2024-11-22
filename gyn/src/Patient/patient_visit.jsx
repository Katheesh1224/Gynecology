import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSquarePlus, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import AdmissionCard from '../Component/AdmissionCard.jsx';

const Visit = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [addCount, setAddCount] = useState(0); 
  const [isEditEnable, setIsEditEnable] = useState(false); 
  const patient_phn = localStorage.getItem('patient_phn');
  const role = localStorage.getItem('role'); 

  useEffect(() => {
    if (role !== 'superadmin') {
      const fetchAddCount = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/require_count/${patient_phn}`);
          const data = response.data[0]; 
          setAddCount(data.add_count);

          const maxAddCount = parseInt(localStorage.getItem('addCount'), 10);
          setIsEditEnable(data.add_count === maxAddCount);
        } catch (error) {
          console.error('Error fetching add_count:', error);
        }
      };

      fetchAddCount();
    } else {
      setIsEditEnable(true);
    }
  }, [patient_phn, role]);

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

  return (
    <div className="">
      <NavBar />
      <Nav />
      <div className="container">
        <h2> Patient Visit</h2>
        <AdmissionCard />
        <div className="cntner">
          <div className="cd">
            <div className="face face1" onClick={addCard}>
              <div className="content">
                <FontAwesomeIcon icon={faSquarePlus} />
                <h3>New Visit</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p> This feature contains adding a new Visit.</p>
                <a href="/patients_information/patient_profile/patient_admission/patient_visit/visit_form" type="button">Add</a>
              </div>
            </div>
          </div>
        </div>

        <div className="button-bar">
          <button onClick={handlePrevious}>
            {"<<"} &nbsp;&nbsp; Previous
          </button>
          <button disabled={!isEditEnable} onClick={handleEdit} style={!isEditEnable ? { backgroundColor: 'grey', cursor: 'not-allowed' } : {}}>
            Edit
          </button>
        </div>
        </div>
      </div>
    
  );
};

export default Visit;
