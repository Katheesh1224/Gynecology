import React from 'react';
import axios from 'axios';
import './App.css';
import { useState,useEffect } from 'react';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';


const Staff = () =>{

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
      <NavBar/>
      <Nav/> 
      <div className='homeContainer'>
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