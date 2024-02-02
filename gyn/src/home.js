import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';


const Home = () =>{

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/patient_registration');
    }
    const handleClick2 = () =>{
        navigate('/Register_staff');
    }
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
        <div>
        <h1>Home after Login</h1>
        <button onClick={handleClick}>patient_registration_Form</button>
        <button onClick={handleClick2}>Register_staff</button>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );

}
export default Home;