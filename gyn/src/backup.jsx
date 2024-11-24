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
          <div className='container'>
            <h1 style={{textAlign:'center'}}>"மெய்ப்பொருள் காண்பது அறிவு"
            </h1><br></br>
            <h2>Welcome to GYNECOLOGY Department</h2>
            <p className='desP'>The gynecology department is dedicated to providing comprehensive healthcare services for women, focusing on the diagnosis, treatment, and management of reproductive health issues. This includes routine check-ups, prenatal and postnatal care, fertility counseling, and advanced treatments for gynecological disorders such as endometriosis, PCOS, and fibroids. The department is equipped with modern medical technologies and staffed by highly skilled gynecologists, nurses, and support personnel, ensuring compassionate and personalized care for women across all stages of life. Additionally, it emphasizes patient education, empowering women to make informed decisions about their health.</p>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Home;

