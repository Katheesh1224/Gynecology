import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser, faUser} from '@fortawesome/free-solid-svg-icons'


const Staff = () =>{

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

      const handleProfile = async () => {
        navigate('/patient_profile');
          // try {
          //   await axios.get('http://localhost:8081/logout');
          //   navigate('/');
          // } catch (error) {
          //   console.error('Logout failed:', error);
          // }
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
        
        <div>
          <header id="header" class="d-flex flex-column justify-content-center">
            <nav id="navbar" class="navbar nav-menu">
              <ul>
                <li><a href="home" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Home</span></a></li>
                <li><a href="patient_registration" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Patient Registration</span></a></li>
                <li><a href="Register_staff" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Staff Registration</span></a></li>
                <li><a href="patient_person" class="nav-link scrollto active"><FontAwesomeIcon icon={faHospitalUser} /> <span>Patient Information</span></a></li>

              </ul>
            </nav>
          </header>
        </div>
        <nav class="navM">
          <div class="containerN">
            <h1 class="logo">
              <a href="./home" className='a'>GYNECOLOGY</a>
            </h1>
            <ul>
              <li><a href="./" class=""><FontAwesomeIcon icon={faUser} /></a></li>
              <li>
                <div>
                  <button onClick={handleLogout} class="buttonHome">Logout</button>
                </div>
            </li>
            </ul>

          </div>
        </nav>
        
        <div className='search'>
          <div className="input">
          <input type='text' placeholder='Search with Name/NIC/PHN here' />
          </div>
          
          <button className='button_srch'>Search</button>
          <button className='button_add'>Active Staff</button>
          <button className='button_dis'>NonActive Staff</button>
        </div>

        <div className='patient_table'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>PHN No </th>
                <th>Phone No</th>
                <th>Action</th>
                
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.full_name}</td>
                  <td>{row.status}</td>
                  <td>{row.phone_no}</td>
                  <td>
                    <button className='button_details' onClick={() => handleProfile(row.id)}>View</button>
                    <button className='button_home'>Edit</button>
                    {/* onClick={() => handleDischarge(row.id)} */}
                  </td>
                  {/* <td>
                    <button className='button_details' onClick={() => handleDetails(row.id)}>Details</button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>

        </div>


          </div>
    
    );
  }


export default Staff;