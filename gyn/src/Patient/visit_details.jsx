import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import VisitCard from '../Component/VisitCard.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import Footer from '../Component/Footer.jsx';

const VisitDetails = () => {
  const [isEditEnable, setIsEditEnable] = useState(false); // State to enable/disable the Edit button

  // Retrieve values from localStorage
  const add_count = parseInt(localStorage.getItem('addCount'), 10);
  const max_add_count = parseInt(localStorage.getItem('maxCount'), 10); // Assuming maxAddCount is stored
  const role = localStorage.getItem('role'); // User role
  const visit_count = localStorage.getItem('visitIndex'); // Visit index

  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'superadmin') {
      setIsEditEnable(true);
    } else {
      setIsEditEnable(add_count === max_add_count);
    }
  }, [role, add_count, max_add_count]);

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
      <Chatbot />
      <div className="container">
        <h2 style={{ fontWeight: 'bold' }}>
          Admission {add_count} {'=>'} Visit {visit_count}
        </h2>
        <VisitCard />
        <div className="button-bar">
          <button onClick={handlePrevious}>
            {"<<"} &nbsp;&nbsp; previous
          </button>
          <button
            disabled={!isEditEnable} 
            onClick={handleEdit}
            style={!isEditEnable ? { backgroundColor: 'grey', cursor: 'not-allowed' } : {}}
          >
            Edit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VisitDetails;
