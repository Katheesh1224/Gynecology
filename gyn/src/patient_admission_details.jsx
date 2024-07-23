import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';


const AdDetails = () =>{

    const navigate = useNavigate();
    const { id } = useParams();

      const handlePrevious = async () => {
        navigate(`/patients_information/patient_profile/patient_admission/${data.id}`);
      };

        const [data, setData] = useState([]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:8081/admisiondetail/${id}`);
              setData(response.data[0]);
              console.log(data);
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
            <div className='card'>
              <header> Patient Admision Details</header>
              {/* <span className="title">Section A</span> */}
              <div className='card1'>
                <div className='profile-about'>
                <p>Date  :{data.date} </p>
                <p>PHN  :{data.phn} </p>
                  <p>BHT  :{data.bht} </p>
                  <p>Height  : {data.height} </p>
                  <p>Weight  : {data.weight} </p>
                  <p>Consultant  : {data.consultant} </p>
                  <p>Allergy History : {data.allergy} </p>
                  <p>Family History of other Diseases  : {data.past_obs} </p>
                  {/* <p>Past Medical History : {data.past_med} </p> */}
                  {/* <p>Past Surgical History  : {data.past_surg} </p> */}
                  {/* <p>Family History of Cancers  : {data.hist_cancer} </p> */}
                  <p>Complaints : {data.complaints} </p>
                  {/* <p>Menstrual Cycle: {data.full_name} </p> */}
                  <p>Diognasis : {data.diagnosis} </p>
                  <p>Status  :{data.status} </p>
                </div>
              </div>

              <button onClick={handlePrevious}>{"<<"} &nbsp;&nbsp; previous </button>
            </div>
              
          </div>
    );
}

export default AdDetails;

