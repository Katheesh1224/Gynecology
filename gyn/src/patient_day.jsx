import React from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser, faUser, faSquarePlus, faFilePen } from '@fortawesome/free-solid-svg-icons'

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



const Day = () =>{

  const [cards, setCards] = useState([]);

  const addCard = () => {
    const newCardTitle = `Admission ${cards.length + 2}`;
    setCards([...cards, newCardTitle]);
    navigate('/new_admission');
  };

  const navigate = useNavigate();
  const { id } = useParams();

    const handleLogout = async () => {
      navigate('/');
        try {
          await axios.get('http://localhost:8081/logout');
          navigate('/');
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };

      const handlePrevious = async () => {
        navigate(`/patient_profile/${data.id}`);
      };

      const showAdmission = async () => {
        navigate(`/patient_admission_details/${data.phn}`);
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
            <nav class="navM">
                <div class="containerN">
                    <h1 class="logo">
                    <a href="./home" className='a'>GYNECOLOGY</a>
                    </h1>
                    <ul>
                    <li><a href="./" class=""><FontAwesomeIcon icon={faUser} /></a></li>
                    <li>
                        <div>
                        <button onClick={handleLogout} class="buttonHome">Logout</button>
                        </div>
                    </li>
                    </ul>

                </div>
            </nav>
            <div>
                <header id="header" class="d-flex flex-column justify-content-center">
                    <nav id="navbar" class="navbar nav-menu">
                    <ul>
                    <li><a href="./../home" className="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Home</span></a></li>
                    <li><a href="./../patient_registration" className="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Patient Registration</span></a></li>
                    <li><a href="./../Register_staff" className="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Staff Registration</span></a></li>
                    <li><a href="./../patients_information" className="nav-link scrollto active"><FontAwesomeIcon icon={faHospitalUser} /> <span>Patient Information</span></a></li>
                    </ul>
                    </nav>
                </header>
            </div>

            <div className='card'>
              <header> Patient Profile</header>
              <div className='card1'>
                <div className='profile'>
                  <p>Full Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.full_name}</p>
                  <p>Address  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.address}</p>
                  <p>Blood Group &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.blood_gr}</p>
                  <p>Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.age} </p>
                  <p>Phone Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.phone_no} </p>
                </div>
              </div>
            
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

export default Day;


