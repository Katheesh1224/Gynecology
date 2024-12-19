import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { useState,useEffect } from 'react';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import Footer from '../Component/Footer.jsx';


const About = () =>{

    const navigate = useNavigate();
    let patient_id=localStorage.getItem('patient_id');

    const handleEdit= () =>{
      navigate(`/patients_information/patient_profile/patient_about/patient_edit`);
    }
      const handlePrevious = () => {
        navigate(`/patients_information/patient_profile`);
      };

    

        const [data, setData] = useState([]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/patient/patient/${patient_id}`);
              setData(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }, []);
      

    return(
        <div className="">
          <NavBar/>
          <Nav/>
          <Chatbot/>
            <div className='container'>
            <div className='space0'></div>
              <h2 style={{ fontWeight: 'bold' }}> Patient Personal Details</h2>
              <div className='space'></div>
              <div className='card1'>
                <div className='profile'>
                  <div className='row'>
                      <div className='col1'>Full Name</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.full_name}</div>
                  </div>
                  <div className='row'>
                      <div className='col1'>PHN</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.phn}</div>
                  </div>
                  <div className='row'>
                      <div className='col1'>Address</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.address}</div>
                  </div>
                  <div className='row'>
                      <div className='col1'>Blood Group</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.blood_gr}</div>
                  </div>
                  <div className='row'>
                      <div className='col1'>Age</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.age}</div>
                  </div>
                  <div className='row'>
                      <div className='col1'>Phone Number</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.phone_no}</div>
                  </div>
                  <div className='row'>
                      <div className='col1'>Marital Status</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.marrital_status}</div>
                  </div>
                  <div className='row'>
                      <div className='col1'>NIC</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.nic}</div>
                  </div>
                </div>                 
              </div>
              <div className='space2'></div>
              <div className='button-bar'>
                <button onClick={handlePrevious}>{"<<"} &nbsp;&nbsp; previous </button>
                <button onClick={handleEdit}> edit </button>
              </div>
            </div>
            <Footer/>
          </div>
    );
}


export default About;

