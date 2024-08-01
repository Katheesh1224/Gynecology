import React from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus, faFilePen } from '@fortawesome/free-solid-svg-icons'
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';
import ProfileCard from './component/profileCard.jsx';


const Card = ({ title }) => (
  <div class="cd">
    <div class="face face1">
      <div class="content">
        <FontAwesomeIcon icon={faFilePen} />              
        <h3>{title}</h3>
      </div>
    </div>
    <div class="face face2">
      <div class="content">
        <p> This feature contains details of {title}.</p>
        <a href="./patient_day" type="button">Show</a>
      </div>
    </div>
  </div>
);



const Admission = () =>{

  const [cards, setCards] = useState([]);

  const addCard = () => {
    const newCardTitle = `Admission ${cards.length + 2}`;
    setCards([...cards, newCardTitle]);
    navigate('/patients_information/patient_profile/patient_admission/new_admission');
  };

  const navigate = useNavigate();
  const { id } = useParams();


      const handlePrevious = async () => {
        navigate(`/patients_information/patient_profile/${data.id}`);
      };

      const showAdmission = async () => {
        navigate(`/patients_information/patient_profile/patient_admission/patient_visit/${id}`);
      };

        const [data, setData] = useState([]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:8081/patientda/${id}`);
              setData(response.data[0]);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }, [id]);
      

    return(
        <div className="">
          <NavBar/>
          <Nav/>
            <div className='card'>
              <h2> Patient Admission</h2>
              <ProfileCard/>
            
              <div class="cntner">
                  {cards.map((card, index) => (
                    <Card key={index} title={card} />
                  ))}

                <div class="cd">
                  <div class="face face1" onClick={showAdmission}>
                    <div class="content">
                      <FontAwesomeIcon icon={faFilePen} />              
                      <h3>Admission 1</h3>
                    </div>
                  </div>
                  <div class="face face2">
                    <div class="content">
                      <p> This feature contains admission details of this patient.</p>
                      <a href="./patient_day" type="button">Show</a>
                    </div>
                  </div>
                </div>

                <div class="cd">
                  <div class="face face1" onClick={addCard}>
                    <div class="content">
                      <FontAwesomeIcon icon={faSquarePlus} />              
                      <h3>New Admission</h3>
                    </div>
                  </div>
                  <div class="face face2">
                    <div class="content">
                      <p> This feature contains adding a new Admission.</p>
                      <a href="./patient_day" type="button">Add</a>
                    </div>
                  </div>
                </div>
              </div> 

              <button onClick={handlePrevious}>{"<<"} &nbsp;&nbsp; previous </button>
            </div> 
              
          </div>
    );
}

export default Admission;


