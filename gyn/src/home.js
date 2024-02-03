import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';

const Home = () =>{

    const navigate = useNavigate();

    // const handleClick = () => {
    //     navigate('/patient_registration');
    // }
    // const handleClick2 = () =>{
    //     navigate('/Register_staff');
    // }
    const handleLogout = async () => {
        try {
          await axios.get('http://localhost:8081/logout');
          // If the logout request is successful, navigate to the home page
          navigate('/');
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };
      
    // const handleLogout =()=>{
    //     axios.get('http://localhost:8081/logout')
    //     .then(res =>{
    //         navigate('/');
    // })
    //     .catch(err =>console.log(err))
    // }
    return(
        <div className='homeContainer'>
        <ul>
        <li><a href='patient_registration' class="list-items">Patient_registration_form</a></li>
        <li><a href='Register_staff' class="list-items">Register_staff</a></li>
        </ul>
        <button onClick={handleLogout} class="button3">Logout</button>
        
        </div>
    );

}
export default Home;