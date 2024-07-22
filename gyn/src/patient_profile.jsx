import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRectangleList, faHospitalUser, faUser, faAddressCard, faBookMedical, faTicket } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
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

  const handleClick = () => {
    navigate('/patient_about');
  };

  const handleClickDay = () => {
    navigate('/patient_day');
  };

  return (
    <div className="">
      <nav className="navM">
        <div className="containerN">
          <h1 className="logo">
            <a href="/home" className='a'>GYNECOLOGY</a>
          </h1>
          <ul>
            <li><a href="./" className=""><FontAwesomeIcon icon={faUser} /></a></li>
            <li>
              <div>
                <button onClick={handleLogout} className="buttonHome">Logout</button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        <header id="header" className="d-flex flex-column justify-content-center">
          <nav id="navbar" className="navbar nav-menu">
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
        <header> Patient Profile</header>
        <div className='card1'>
          <div className='profile'>
            <p>Full Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.full_name}</p>
            <p>Address  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.address}</p>
            <p>Blood Group &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.blood_gr}</p>
            <p>Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.age} </p>
            <p>Phone Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.phone_no} </p>
          </div>
        </div>

        <div className="cntner">
          <div className="cd">
            <div className="face face1" onClick={() => window.location.href = `/patient_about/${data.id}`} role="button">
              <div className="content">
                <FontAwesomeIcon icon={faAddressCard} />
                <h3>About</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>This feature contains full admission details of this patient.</p>
                <a href={`/patient_about/${data.id}`} type="button">Show</a>
              </div>
            </div>
          </div>

          <div className="cd">
            <div className="face face1" onClick={handleClickDay} role="button">
              <div className="content">
                <FontAwesomeIcon icon={faTicket} />
                <h3>Admission</h3>
              </div>
            </div>
            <div className="face face2">
              <div className="content">
                <p>This feature contains admission progress of this patient.</p>
                <a href="/patient_day" type="button">Show</a>
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
