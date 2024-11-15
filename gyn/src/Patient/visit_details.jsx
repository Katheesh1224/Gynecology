import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faFilePen } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import VisitCard from '../Component/VisitCard.jsx';


const VisitDetails = () => {
  const navigate = useNavigate();

  const handlePrevious = () => {
    navigate(`/patients_information/patient_profile/patient_admission/patient_visit`);
  };

  const handleEdit = () => {
    navigate(`/patients_information/patient_profile/patient_admission/patient_visit/visit_details_edit`);
  };

  return (
    <div className="">
      <NavBar />
      <Nav />
      <div className='container'>
        <h2>Patient Visit</h2>
        <VisitCard />
        <div className='button-bar'>
          <button onClick={handlePrevious}>{"<<"} &nbsp;&nbsp; previous </button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default VisitDetails;
