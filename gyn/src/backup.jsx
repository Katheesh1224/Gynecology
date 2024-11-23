// import React, { useState, useEffect } from 'react';
import './home.css';
import Nav from './Component/Nav.jsx';
import NavBar from './Component/NavBar.jsx';
import Chatbot from './Component/Chatbot.jsx';

// import { useState,useEffect } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPersonDress } from '@fortawesome/free-solid-svg-icons';



const Home = () =>{
    // console.log("home rendered");

  //   const [count, setCount] = useState(0);

  // useEffect(() => {
  //   // Fetch the count from the backend API
  //   axios.get('http://localhost:8081/api/count')
  //     .then(response => {
  //       setCount(response.data.patientCount);
  //     })
  //     .catch(error => {
  //       console.error("There was an error fetching the count!", error);
  //     });
  // }, []);
    

  
  return(
    <div className='wrapper2'>
      <NavBar/>
      <Chatbot />
      <div className='main-content'>
        <Nav/> 
        <div className='container-big'>
          <div className='container-home'>
            <h2>Welcome to GYNECOLOGY Department</h2>
            <p>Our department is dedicated to providing comprehensive </p>

            
            
          </div>
        </div>
      </div>
    </div>
  );

}

export default Home;

