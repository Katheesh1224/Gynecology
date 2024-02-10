import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'


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
        <ul>
          <li><a href='patient_registration' class="list-items">Patient_registration_form</a></li>
          <li><a href='Register_staff' class="list-items">Register_staff</a></li>
        </ul>
        <button onClick={handleLogout} class="button3">Logout</button>
        <div>
          <header id="header" class="d-flex flex-column justify-content-center">
            <nav id="navbar" class="navbar nav-menu">
              <ul>
                <li><a href="#hero" class="nav-link scrollto active"><FontAwesomeIcon icon={faHouse} /><span>Home</span></a></li>
                <li><a href="#about" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>About</span></a></li>
                <li><a href="#resume" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Resume</span></a></li>
                <li><a href="#portfolio" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /> <span>Portfolio</span></a></li>
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