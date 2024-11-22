import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import VisitCard from '../Component/VisitCard.jsx';


const VisitDetails = () => {
  const add_count = localStorage.getItem('addCount');
  const visit_count = localStorage.getItem('visitIndex');
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
        <h2 style={{fontWeight:"bold"}} > Admission {add_count} {'=>'} Visit {visit_count}</h2>
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
