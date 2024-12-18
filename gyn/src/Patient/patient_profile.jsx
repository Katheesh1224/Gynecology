import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBookMedical, faTicket } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import ProfileCard from '../Component/profileCard.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import Footer from '../Component/Footer.jsx';

const Profile = () => {
  const navigate = useNavigate();
  const patient_id = localStorage.getItem('patient_id');
  const role = localStorage.getItem('role');

  const [data, setData] = useState({});
  const [isDischarged, setIsDischarged] = useState(false); 
 const [openPopup, setOpenPopup] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/patient/patient/${patient_id}`);
        const fetchedData = response.data;
        setData(fetchedData);
        setIsDischarged(fetchedData.admit_status === 'discharged'); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [patient_id]);

  const handlePrevious = () => {
    navigate('/patients_information');
  };

  const assign = (phn) => {
    localStorage.setItem('patient_phn', phn);
    navigate(`/patients_information/patient_profile/patient_history`);
  };

  const confirmDischarge = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/patient/discharge/${data.phn}`);
      setData(response.data);
      setIsDischarged(true); 
      setOpenPopup(false); 
      navigate('/patients_information');
    } catch (error) {
      console.error('Error discharging patient:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <Nav />
      <Chatbot />
      <div className="container">
        <h2 style={{ fontWeight: 'bold' }}>Patient Profile</h2>
        <ProfileCard />
        <div className="cntner">
          <div className="cd">
            <div
              className="face face1"
              onClick={() => (window.location.href = `/patients_information/patient_profile/patient_about`)}
              role="button"
            >
              <div className="content">
                <FontAwesomeIcon icon={faAddressCard} />
                <h3>About</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>This feature contains full admission details of this patient.</p>
                <a href={`/patients_information/patient_profile/patient_about`} type="button">
                  Show
                </a>
              </div>
            </div>
          </div>

          <div className="cd">
            <div
              className="face face1"
              onClick={() => (window.location.href = `/patients_information/patient_profile/patient_admission`)}
              role="button"
            >
              <div className="content">
                <FontAwesomeIcon icon={faTicket} />
                <h3>Admission</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>This feature contains admission progress of this patient.</p>
                <a href={`/patients_information/patient_profile/patient_admission`} type="button">
                  Show
                </a>
              </div>
            </div>
          </div>

          <div className="cd">
            <div className="face face1" onClick={() => assign(data.phn)} role="button">
              <div className="content">
                <FontAwesomeIcon icon={faBookMedical} />
                <h3>History</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">

                <p>This feature contains medical history of this patient.</p>
                <a href={`/patients_information/patient_profile/patient_history`} type="button">Show</a>

              </div>
            </div>
          </div>
        </div>

        <div className="button-bar">
          <button onClick={handlePrevious}>{'<<'} &nbsp; previous </button>
          {role !== 'data_entry' && (
            <button
              style={{
                backgroundColor: isDischarged ? 'grey' : 'red',
                cursor: isDischarged ? 'not-allowed' : 'pointer',
              }}
              disabled={isDischarged}
              onClick={() => !isDischarged && setOpenPopup(true) } // Show modal on click
            >
              {isDischarged ? 'Discharged' : 'Discharge'}
            </button>
          )}
        </div>
      </div>


      {openPopup && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Discharge</h3>
            <p>
              Are you sure you want to discharge <strong>{data.full_name}</strong> ?
            </p>
            <div className="modal-buttons">
              <button onClick={confirmDischarge} style={{ backgroundColor: 'red', color: 'white' }}>
                Confirm
              </button>
              <button onClick={() => setOpenPopup(false)} style={{ backgroundColor: 'grey', color: 'white' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer/>

    </div>
  );
};

export default Profile;
