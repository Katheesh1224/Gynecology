import React from 'react';
import {useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser, faUser, faUserNurse} from '@fortawesome/free-solid-svg-icons'


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

      // const handleProfile = async () => {
      //   navigate('/patient_profile');
          // try {
          //   await axios.get('http://localhost:8081/logout');
          //   navigate('/');
          // } catch (error) {
          //   console.error('Logout failed:', error);
          // }
      //   };
        const [data, setData] = useState([]);
        const [values, setValues] = useState({
          phn:'',
          name:''
        });

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

        const handleAdmit = (()=>{
          const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:8081/admitdata');
              setData(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData();
        });

        const handleDischarge = (()=>{
          const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:8081/dischargedata');
              setData(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData();
        });

        const handleSearch = async () => {
          try {
              const response = await axios.post('http://localhost:8081/searchdata', values);
              setData(response.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
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
                <li><a href="patient_person" class="nav-link scrollto active"><FontAwesomeIcon icon={faHospitalUser} /> <span>Patient Information</span></a></li>
                <li><a href="staff_information" class="nav-link scrollto"><FontAwesomeIcon icon={faUserNurse} /><span>Staff Information</span></a></li>
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
        <div className='search' >
          <div className="input">
          <input type='text' placeholder='Search with Name/NIC/PHN here'  onChange={e =>setValues({...values,phn:e.target.value})}/>
          </div>
          
          <button className='button_srch' onClick={handleSearch}>Search</button>
          <button className='button_add' onClick={handleAdmit}>Admitted Patient</button>
          <button className='button_dis' onClick={handleDischarge}>Discharged Patient</button>
        </div>

        <div className='patient_table' style={{margin : "150px"}}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>PHN No </th>
                <th>Phone No</th>
                <th>Management</th>
                
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.full_name}</td>
                  <td>{row.phn}</td>
                  <td>{row.phone_no}</td>
                  <td>

                    <button className='button_details' ><Link to={`/patient_profile/${row.id}`} className='btn btn-sm btn-primary mx-2'>View</Link></button>
                    {/* <button className='button_home'>Edit</button> */}
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


export default Patient;