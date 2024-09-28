// import React, { useState, useEffect } from 'react';
import './home.css';
import Nav from './Component/Nav.jsx';
import NavBar from './Component/NavBar.jsx';
// import { useState,useEffect } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPersonDress } from '@fortawesome/free-solid-svg-icons';



const Home = () =>{
    console.log("home rendered");

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
    <div className='wrapper'>
      <NavBar/>
      <div className='main-content'>
        <Nav/> 
        <div className='container-big'>
          <div className='container-home'>
            <h2>Welcome to GYNECOLOGY Department</h2>
            <div className='without-h2'>
              <div className='container-home-middle'>
                <div className='container-small-card'>
                  <div className='small-card'>
                    {/* <p className='amount'>{count}</p> */}
                    {/* <FontAwesomeIcon icon={faPersonDress} style={{ color: 'black', fontSize:'35px', margin:'10px 20px' }} /> */}
                    <p className='title'>Admitted Patient Count</p>
                  </div>
                  <div className='small-card'>
                    {/* <p className='amount'>{}</p> */}
                    {/* <FontAwesomeIcon icon={faPersonDress} style={{ color: 'green', fontSize:'35px', margin:'10px 20px' }} /> */}
                    <p className='title'>Current Patient Count</p>
                  </div>
                  <div className='small-card'>
                    {/* <p className='amount'>{}</p> */}
                    {/* <FontAwesomeIcon icon={faPersonDress} style={{ color: 'red', fontSize:'35px', margin:'10px 20px' }} /> */}
                    <p className='title'>Discharged Patient Count</p>
                  </div>
                </div>

                <div className='graph'>
                <img src="./graph.png" alt="" className="" />

                </div>
              </div>
              <div className='container-home-right'>
                <div className='divided'></div>
                <div className='divided'></div>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );

}

export default Home;

