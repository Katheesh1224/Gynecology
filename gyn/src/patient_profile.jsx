import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser, faUser, faCalendarDays, faAddressCard, faBookMedical } from '@fortawesome/free-solid-svg-icons'


const Profile = () =>{

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

      // const handleDetails = async () => {
      //   navigate('/patient_details');
      // };
        const [data, setData] = useState([]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:8081/data');
              setData(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }, []);
      

    return(
        <div className="">
            <nav class="navM">
                <div class="containerN">
                    <h1 class="logo">
                    <a href="/home">GYNECOLOGY</a>
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
                        <li><a href="home" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Home</span></a></li>
                        <li><a href="patient_registration" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Patient Registration</span></a></li>
                        <li><a href="Register_staff" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Staff Registration</span></a></li>
                        <li><a href="patient_person" class="nav-link scrollto active"><FontAwesomeIcon icon={faHospitalUser} /> <span>Patient Information</span></a></li>
                        {/* <li><a href="patient_visit" class="nav-link scrollto active"><FontAwesomeIcon icon={faEye} /><span>Visit</span></a></li> */}
                        <li><a href="#contact" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Contact</span></a></li>
                    </ul>
                    </nav>
                </header>
            </div>

            <div className='card'>
              <header> Patient Profile</header>
              <div className='card1'>
                <div className='profile'>
                  <p>Full Name  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  : </p>
                  <p>Address  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    : </p>
                  <p>BHT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </p>
                  <p>Blood Group &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </p>
                  <p>Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </p>
                  <p>Phone Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </p>
                </div>
              </div>
            
              <div className='card1'>
                <div className='c1'>
                <FontAwesomeIcon icon={faAddressCard} />
                  <p>About</p>
                  <p1>This feature contains full admission details of this patient</p1>
                  <pre></pre>
                  <button className='button_show'>Show </button>
                </div>

                <div className='c1'>
                <FontAwesomeIcon icon={faCalendarDays} />
                  <p>Day to day : </p> 
                  <p1>This feature contains day to day ward progress of this patient</p1>
                  <pre></pre>
                  <button className='button_show'>Show </button>
                </div>

                <div className='c1'>
                <FontAwesomeIcon icon={faBookMedical} />
                  <p>History</p>
                  <p1>This feature contains past admission and medical history of this patient</p1>
                  <pre></pre>
                  <button className='button_show'>Show </button>
                </div>
              </div>
              <button>{"<<"} &nbsp;&nbsp; previous </button>
            </div>
              
          </div>
    );
}


export default Profile;

