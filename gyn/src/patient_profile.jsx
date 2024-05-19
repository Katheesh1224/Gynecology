import React from 'react';
import {useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser, faUser, faCalendarDays, faAddressCard, faBookMedical } from '@fortawesome/free-solid-svg-icons'


const Profile = () =>{

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
      // const nav = document.querySelector(".nav");

      // window.addEventListener("scroll", fixNav);

      // function fixNav() {
      //   if (window.scrollY > nav.offsetHeight + 150) {
      //     nav.classList.add("active");
      //   } else {
      //     nav.classList.remove("active");
      //   }
      // }

      const handlePrevious = async () => {
        navigate('/patients_information');
      };
      

        const [data, setData] = useState([]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:8081/view/${id}`);
              setData(response.data[0]);
              //console.log(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }, []);

        const handleDischarge = async (phn) => {
          try {
              const response = await axios.put(`http://localhost:8081/discharge/${phn}`);
              navigate('/patients_information');
              // setData(response.data); // If needed
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      
      

    return(
        <div className="">
            <nav className="navM">
                <div className="containerN">
                    <h1 className="logo">
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
                        <li><a href="./../home" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Home</span></a></li>
                        <li><a href="./../patient_registration" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Patient Registration</span></a></li>
                        <li><a href="./../Register_staff" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Staff Registration</span></a></li>
                        <li><a href="./../patients_information" class="nav-link scrollto active"><FontAwesomeIcon icon={faHospitalUser} /> <span>Patient Information</span></a></li>
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
                  {/* <p>BHT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </p> */}
                  <p>Blood Group &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.blood_gr}</p>
                  <p>Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.age} </p>
                  <p>Phone Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.phone_no} </p>
                </div>
              </div>

              <div class="cntner">
                <div class="cd">
                  <div class="face face1">
                    <div class="content">  
                        <FontAwesomeIcon icon={faAddressCard} />          
                      <h3>About</h3>
                    </div>
                  </div>
                  <div class="face face2">
                    <div class="content">
                      <p> This feature contains full admission details of this patient.</p>
                      <a href="./../patient_about/" type="button">Show</a>
                    </div>
                  </div>
                </div>
                
                <div class="cd">
                  <div class="face face1">
                    <div class="content">
                  <FontAwesomeIcon icon={faCalendarDays} />              
                  <h3>Day-to-day</h3>
                    </div>
                  </div>
                  <div class="face face2">
                    <div class="content">
                      <p> This feature contains day to day ward progress of this patient.</p>
                      <a href="./../patient_day" type="button">Show</a>
                    </div>
                  </div>
                </div>
                
                <div class="cd">
                  <div class="face face1">
                    <div class="content">
                      <FontAwesomeIcon icon={faBookMedical} />
                        <h3>History</h3>
                    </div>
                  </div>
                  <div class="face face2">
                    <div class="content">
                      <p> This feature contains past admission and medical history of this patient.</p>
                      <a href="./patient_profile" type="button">Show</a>
                    </div>
                  </div>
                </div>
              </div >
              
              <button onClick={handlePrevious}>{"<<"} &nbsp;&nbsp; previous </button>
              <div className="btn" ><button  style={{backgroundColor:'red'}} onClick={()=>{handleDischarge(data.phn)}}>Discharge</button></div>
              
            </div>
            
          </div>
    );
}


export default Profile;


     
