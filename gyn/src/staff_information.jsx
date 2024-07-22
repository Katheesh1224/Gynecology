import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser, faUser, faUserNurse} from '@fortawesome/free-solid-svg-icons'


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

        const [data, setData] = useState([]);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:8081/data1');
              setData(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        }, []);

        const getRowStyle = (status) => {
            return status.trim() === 'active' ? { color: 'green' } : {color: 'red'};
          };

          useEffect(() => {
            axios.get('http://localhost:8081/row')
              .then(response => setData(response.data))
              .catch(error => console.error('Error fetching data:', error));
          }, []);

          const deleteRow = (id) => {
            axios.delete(`http://localhost:8081/staff_information/${id}`)
            .then(response => {
                console.log(response.data);
                // Update state to remove the deleted row
                setData(data.filter(row => row.id !== id));
              })
              .catch(error => console.error('Error deleting row:', error));
          };

    return(
      <div className='homeContainer'>
        
        <div>
          <header id="header" class="d-flex flex-column justify-content-center">
            <nav id="navbar" class="navbar nav-menu">
              <ul>
              <li><a href="home" class="nav-link scrollto"><FontAwesomeIcon icon={faHouse} /><span>Home</span></a></li>
                <li><a href="patient_registration" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Patient Registration</span></a></li>
                <li><a href="Register_staff" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Staff Registration</span></a></li>
                <li><a href="patients_information" class="nav-link scrollto"><FontAwesomeIcon icon={faHospitalUser} /> <span>Patient Information</span></a></li>
                <li><a href="staff_information" class="nav-link scrollto active"><FontAwesomeIcon icon={faUserNurse} /><span>Staff Information</span></a></li>
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
        
        
      <h1 id='staff_heading'>Staff Information</h1>
        <div className='patient_table'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Phone No</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} >
                  <td>{row.id}</td>
                  <td>{row.full_name}</td>
                  <td>{row.phone_no}</td>
                  <td>{row.role}</td>
                  <td style={getRowStyle(row.status)}>{row.status} </td>
                  <td>
                    <button onClick={() => deleteRow(row.id)} className='button_details'>Delete</button>
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