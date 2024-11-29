import React, { useState, useEffect } from 'react';
import './home.css';
import Nav from './Component/Nav.jsx';
import NavBar from './Component/NavBar.jsx';
import Chatbot from './Component/Chatbot.jsx';
import axios from 'axios';

const Home = () => {
  const [username, setUsername] = useState('');
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  useEffect(() => {
    // Fetch the username from the backend using the userId
    if (userId) {
      axios
        .get(`http://localhost:8081/staff/${userId}`)
        .then((response) => {
          setUsername(response.data.full_name); // Update the username state
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);

  return (
    <div className='wrapper2'>
      <NavBar />
      <Chatbot />
      <div className='main-content'>
        <Nav />
        <div className='container-big'>
          {username && (
              <p style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '50px' }}>
                Hello, {username}! . 
              </p>
            )}
            <div className='container'>
            <h1 style={{ textAlign: 'center' ,fontWeight:"bold"}}>"மெய்ப்பொருள் காண்பது அறிவு"</h1>
            <br />
            <h2 style={{fontWeight:"bold"}}>Welcome to the GYNECOLOGY Department</h2>
            
            <p className='desP' style={{textAlign: 'justify-content', fontSize:"16px"}}>
              The gynecology department is dedicated to providing comprehensive healthcare
              services for women, focusing on the diagnosis, treatment, and management of
              reproductive health issues. This includes routine check-ups, prenatal and
              postnatal care, fertility counseling, and advanced treatments for gynecological
              disorders such as endometriosis, PCOS, and fibroids. The department is equipped
              with modern medical technologies and staffed by highly skilled gynecologists,
              nurses, and support personnel, ensuring compassionate and personalized care for
              women across all stages of life. Additionally, it emphasizes patient education,
              empowering women to make informed decisions about their health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
