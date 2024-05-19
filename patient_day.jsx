import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser, faUser, faCalendarPlus, faCalendarDay } from '@fortawesome/free-solid-svg-icons'


const Day = () =>{

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

      const handlePrevious = async () => {
        navigate('/patient_profile');
      };

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
                        <li><a href="home" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Home</span></a></li>
                        <li><a href="patient_registration" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Patient Registration</span></a></li>
                        <li><a href="Register_staff" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Staff Registration</span></a></li>
                        <li><a href="patient_person" class="nav-link scrollto active"><FontAwesomeIcon icon={faHospitalUser} /> <span>Patient Information</span></a></li>
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
            
              <div class="cntner">
                <div class="cd">
                  <div class="face face1">
                    <div class="content">  
                        <FontAwesomeIcon icon={faCalendarDay} />          
                      <h3>Day 01</h3>
                      <p>date</p>
                    </div>
                  </div>
                  <div class="face face2">
                    <div class="content">
                      <p> This feature contains visit details of day 01.</p>
                      <a href="./patient_day" type="button">Show</a>
                    </div>
                  </div>
                </div>
                
                <div class="cd">
                  <div class="face face1">
                    <div class="content">
                  <FontAwesomeIcon icon={faCalendarPlus} />              
                  <h3>Add New Day</h3>
                    </div>
                  </div>
                  <div class="face face2">
                    <div class="content">
                      <p> This feature contains adding a new day for visit.</p>
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
