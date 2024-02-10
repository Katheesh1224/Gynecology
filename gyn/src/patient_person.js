import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser } from '@fortawesome/free-solid-svg-icons'


const Patient = () =>{

    const navigate = useNavigate();

    const handleLogout = async () => {
      navigate('/');
        try {
          await axios.get('http://localhost:8081/logout');
          navigate('/');
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };
        const [data, setData] = useState([]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:8081/data');
              setData(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }, []);
    return(
      <div className='homeContainer'>
       <nav class="navM">
      <div class="containerN">
        <h1 class="logo">
          <a href="">GYN</a>
        </h1>
        <ul>
          <li><a href="home">Home</a></li>
          <li><a href="">About</a></li>
          <li><a href="">Services</a></li>
          <li>
            <div>
              <button onClick={handleLogout} class="buttonHome">Logout&emsp;{/*<FontAwesomeIcon icon={faHouse} />*/}</button>
            </div>
        </li>
        </ul>
      </div>
    </nav>
    <h2>Patient Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full_Name</th>
            <th>Blood_Group</th>
            <th>Phone_No</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.full_name}</td>
              <td>{row.blood_gr}</td>
              <td>{row.phone_no}</td>
              {/* Add more table cells for other columns */}
            </tr>
          ))}
        </tbody>
      </table>



          </div>
    
    );
  }


export default Patient;