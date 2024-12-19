import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import HistoryCard from '../Component/HistoryCard.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import Footer from '../Component/Footer.jsx';


const MedDetails = () =>{

  const navigate = useNavigate();

  const handlePrevious = async () => {
    navigate(`/patients_information/patient_profile`);
  };

  const handleEdit= () =>{
    navigate(`/patients_information/patient_profile/patient_history/patient_medicalhx_edit`);
  }

  return(
    <div className="">
      <NavBar/>
      <Nav/>
      <Chatbot/>
      <div className='container'>
        <div className='space0'></div>
        <h2 style={{ fontWeight: 'bold' }}> Patient Medical History</h2>
        <div className='space'></div>
        <HistoryCard/>
        <div className='space2'></div>

        <div className='button-bar'>
          <button onClick={handlePrevious}>{"<<"} &nbsp;&nbsp; previous </button>
          <button onClick={handleEdit}> edit </button>
        </div>           
      </div>
      <Footer/>
    </div>
  );
}

export default MedDetails;

