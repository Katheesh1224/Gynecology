import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser, faUser} from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';

const AdDetails = () =>{

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
        navigate('/patient_profile');
      };

        const [data, setData] = useState([]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:8081/admisiondetail/${id}`);
              setData(response.data[0]);
              console.log(data);
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
                    <a href="/home" className='a'>GYNECOLOGY</a>
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
              <header> Patient Admision Details</header>
              {/* <span className="title">Section A</span> */}
              <div className='card1'>
                <div className='profile-about'>
                <p>Date  :{data.date} </p>
                <p>PHN  :{data.phn} </p>
                  <p>BHT  :{data.bht} </p>
                  <p>Height  : {data.height} </p>
                  <p>Weight  : {data.weight} </p>
                  <p>Consultant  : {data.consultant} </p>
                  <p>Allergy History : {data.allergy} </p>
                  <p>Family History of other Diseases  : {data.past_obs} </p>
                  {/* <p>Past Medical History : {data.past_med} </p> */}
                  {/* <p>Past Surgical History  : {data.past_surg} </p> */}
                  {/* <p>Family History of Cancers  : {data.hist_cancer} </p> */}
                  <p>Complaints : {data.complaints} </p>
                  {/* <p>Menstrual Cycle: {data.full_name} </p> */}
                  <p>Diognasis : {data.diagnosis} </p>
                  <p>Status  :{data.status} </p>
                </div>
              </div>

              <button onClick={handlePrevious}>{"<<"} &nbsp;&nbsp; previous </button>
            </div>
              
          </div>
    );
}


export default AdDetails;

