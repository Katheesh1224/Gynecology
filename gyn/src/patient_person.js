import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser } from '@fortawesome/free-solid-svg-icons'


const Patient = () =>{

    const navigate = useNavigate();

    const handleLogout = async () => {
      navigate('/');
        try {
          await axios.get('http://localhost:8081/logout');
          navigate('/');
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };
      
    return(
      <div className='homeContainer'>
        <div>
          <button onClick={handleLogout} class="button3">Logout</button>
        </div>
        <div>
          <header id="header" class="d-flex flex-column justify-content-center">
            <nav id="navbar" class="navbar nav-menu">
              <ul>
              <li><a href="home" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Home</span></a></li>
                <li><a href="patient_registration" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Patient Registration</span></a></li>
                <li><a href="Register_staff" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Staff Registration</span></a></li>
                <li><a href="patient_person" class="nav-link scrollto active"><FontAwesomeIcon icon={faHospitalUser} /> <span>Patient Information</span></a></li>
                <li><a href="#services" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Services</span></a></li>
                <li><a href="#contact" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Contact</span></a></li>
              </ul>
            </nav>
          </header>
        </div>
      </div>
    );

}
export default Patient;