import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser, faUser, faEye } from '@fortawesome/free-solid-svg-icons'

const Home = () =>{

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
      // const nav = document.querySelector(".nav");

      // window.addEventListener("scroll", fixNav);

      // function fixNav() {
      //   if (window.scrollY > nav.offsetHeight + 150) {
      //     nav.classList.add("active");
      //   } else {
      //     nav.classList.remove("active");
      //   }
      // }
      
    return(
      <div className='homeContainer'>
        <nav class="navM">
          <div class="containerN">
            <h1 class="logo">
              <a href="">GYNECOLOGY</a>
            </h1>
            <ul>
              <li><a href="./" class=""><FontAwesomeIcon icon={faUser} /></a></li>
              <li>
                <div>
                  <button onClick={handleLogout} class="buttonHome">Logout&emsp;{/*<FontAwesomeIcon icon={faHouse} />*/}</button>
                </div>
            </li>
            </ul>

          </div>
        </nav>
        
        <div>
          <header id="header" class="d-flex flex-column justify-content-center">
            <nav id="navbar" class="navbar nav-menu">
              <ul>
                <li><a href="home" class="nav-link scrollto active"><FontAwesomeIcon icon={faHouse} /><span>Home</span></a></li>
                <li><a href="patient_registration" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Patient Registration</span></a></li>
                <li><a href="Register_staff" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Staff Registration</span></a></li>
                <li><a href="patient_person" class="nav-link scrollto"><FontAwesomeIcon icon={faHospitalUser} /> <span>Patient Information</span></a></li>
                {/* <li><a href="patient_visit" class="nav-link scrollto"><FontAwesomeIcon icon={faEye} /><span>Visit</span></a></li> */}
                <li><a href="#contact" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Contact</span></a></li>
              </ul>
            </nav>
          </header>
        </div>
      </div>
    );

}
export default Home;

