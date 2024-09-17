import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBookMedical, faTicket } from '@fortawesome/free-solid-svg-icons';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';
import ProfileCard from './component/profileCard.jsx';


const Profile = () => {
  const navigate = useNavigate();
  let patient_id=localStorage.getItem('patient_id');

  const handlePrevious = async () => {
    navigate('/patients_information');
  };

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/view/${patient_id}`);
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
       setData(response.data); // If needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="">
      <NavBar/>
      <Nav/>
      <div className='card'>
        <h2> Patient Profile</h2>
        <ProfileCard/>
        <div className="cntner">
          <div className="cd">
            <div className="face face1" onClick={() => window.location.href = `/patients_information/patient_profile/patient_about`} role="button">
              <div className="content">
                <FontAwesomeIcon icon={faAddressCard} />
                <h3>About</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>This feature contains full admission details of this patient.</p>
                <a href={`/patients_information/patient_profile/patient_about`} type="button">Show</a>
              </div>
            </div>
          </div>

          <div className="cd">
            <div className="face face1" onClick={() => window.location.href = `/patients_information/patient_profile/patient_admission`}  role="button">
              <div className="content">
                <FontAwesomeIcon icon={faTicket} />
                <h3>Admission</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>This feature contains admission progress of this patient.</p>
                <a href={`/patients_information/patient_profile/patient_admission`} type="button">Show</a>
              </div>
            </div>
          </div>

          <div className="cd">
            <div className="face face1" onClick={() => window.location.href = `/patients_information/patient_profile/patient_history`} role="button">
              <div className="content">
                <FontAwesomeIcon icon={faBookMedical} />
                <h3>History</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>This feature contains past admission and medical history of this patient.</p>
                <a href={`/patients_information/patient_profile/patient_history`} type="button">Show</a>
              </div>
            </div>
          </div>
        </div>

        <div className='button-bar'>
          <button onClick={handlePrevious}>{"<<"} &nbsp; previous </button>
          <button style={{ backgroundColor: 'red' }} onClick={() => { handleDischarge(data.phone_no) }}>Discharge</button>
          </div>
      </div>
    </div>
  );
}

export default Profile;
