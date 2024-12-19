import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBookMedical, faTicket } from '@fortawesome/free-solid-svg-icons';
import Nav from './Component/Nav.jsx';
import NavBar from './Component/NavBar.jsx';
import ProfileCard from './Component/profileCard.jsx';


const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handlePrevious = async () => {
    navigate('/patients_information');
  };

  const [data, setData] = useState({});

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
  }, [id]);

  const handleDischarge = async (phn) => {
    try {
      const response = await axios.put(`http://localhost:8081/discharge/${phn}`);
      navigate('/patients_information');
       setData(response.data); // If needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleClick = ( ) => {
    navigate('/patient_about');
  };

  // const handleClickDay = () => {
  //   navigate(`/patient_day/${data.id}`);
  // };

  return (
    <div className="">
      <NavBar/>
      <Nav/>
      <div className='card'>
        <header> Patient Profile</header>
        <ProfileCard/>
        <div className="cntner">
          <div className="cd">
            <div className="face face1" onClick={() => window.location.href = `/patients_information/patient_profile/patient_about/${data.id}`} role="button">
              <div className="content">
                <FontAwesomeIcon icon={faAddressCard} />
                <h3>About</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>This feature contains full admission details of this patient.</p>
                <a href={`/patients_information/patient_profile/patient_about/${data.id}`} type="button">Show</a>
              </div>
            </div>
          </div>

          <div className="cd">
            <div className="face face1" onClick={() => window.location.href = `/patients_information/patient_profile/patient_admission/${data.id}`}  role="button">
              <div className="content">
                <FontAwesomeIcon icon={faTicket} />
                <h3>Admission</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>This feature contains admission progress of this patient.</p>
                <a href={`/patients_information/patient_profile/patient_admission/${data.id}`} type="button">Show</a>
              </div>
            </div>
          </div>

          <div className="cd">
            <div className="face face1" onClick={handleClick} role="button">
              <div className="content">
                <FontAwesomeIcon icon={faBookMedical} />
                <h3>History</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>This feature contains past admission and medical history of this patient.</p>
                <a href="/patient_profile" type="button">Show</a>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handlePrevious}>{"<<"} &nbsp; previous </button>
        <div className="btn"><button style={{ backgroundColor: 'red' }} onClick={() => { handleDischarge(data.phone_no) }}>Discharge</button></div>
      </div>
    </div>
  );
}

export default Profile;
