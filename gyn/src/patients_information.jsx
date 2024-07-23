import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';


const Patient = () =>{

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
        <NavBar/>
        <Nav/>
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

                    <button className='button_details' ><Link to={`/patients_information/patient_profile/${row.id}`} className='btn btn-sm btn-primary mx-2'>View</Link></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>


          </div>
    
    );
  }


export default Patient;