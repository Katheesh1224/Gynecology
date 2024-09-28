//import React, { useState, useEffect } from 'react';
import './home.css';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';


const Home = () =>{
    console.log("home rendered");

  
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
                    {/* <p className='amount'>{totalAdmitted}</p> */}
                    <p className='title'>Admitted Patient Count</p>
                  </div>
                  <div className='small-card'>
                    {/* <p className='amount'>{patientCounts.admittedCount}</p> */}
                    <p className='title'>Current Patient Count</p>
                  </div>
                  <div className='small-card'>
                    {/* <p className='amount'>{patientCounts.dischargedCount}</p> */}
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

