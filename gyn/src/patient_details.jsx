import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser, faUser, faEye } from '@fortawesome/free-solid-svg-icons'


const Patient_details = () =>{

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
        const [details, setDetails] = useState([]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:8081/details');
              setDetails(response.details);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }, []);

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
        <div className='homeContainer'>
            <nav class="navM">
                <div class="containerN">
                    <h1 class="logo"> <a href="/home">GYNECOLOGY</a> </h1>
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
                        <li><a href="patient_visit" class="nav-link scrollto"><FontAwesomeIcon icon={faEye} /><span>Visit</span></a></li>
                        <li><a href="#contact" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Contact</span></a></li>
                    </ul>
                    </nav>
                </header>
            </div>

            <div>
                {details.map((row) => (
                <div key={row.id}>
                    <p>ID: {row.id}</p>
                    <p>Full Name: {row.full_name}</p>
                    <p>PHN: {row.phn}</p>
                    <p>Phone Number: {row.phone_no}</p>
                    {/* Add more paragraphs for other fields */}
                </div>
                
                ))}

{data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.full_name}</td>
                  <td>{row.phn}</td>
                  <td>{row.phone_no}</td>
                  {/* Add more table cells for other columns */}
                </tr>
              ))}

            </div>

        </div>
    
    );
  }
export default Patient_details;