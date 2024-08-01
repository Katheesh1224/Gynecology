import React from 'react';
import axios from 'axios';
import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../component/Nav.jsx';
import NavBar from '../component/NavBar.jsx';

const Staff = () => {
  const [data, setData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  // const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

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
    return status.trim() === 'active' ? { color: 'green' } : { color: 'red' };
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
        setOpenPopup(false);
      })
      .catch(error => console.error('Error deleting row:', error));
  };

  // const handleEdit = (row) => {
  //   navigate('/staff_information/update_staff', { state: row });
  // };

  return (
    <div className='wrapper'>
      <NavBar />
      <div className='main-content'>
      <Nav />
      <div className='container'>
        <h2>Staff Information</h2>  
        <div className='patient_table'>
          <table>
            <thead>
              <tr>
                
                <th>Full Name</th>
                <th>Phone No</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id}>
                  
                  <td>{row.full_name}</td>
                  <td>{row.phone_no}</td>
                  <td>{row.role}</td>
                  <td style={getRowStyle(row.status)}>{row.status}</td>
                  <td>
                    <button className='button_details' onClick={() => setOpenPopup(true)}>Delete</button>
                    <button className='button_home' onClick={() => navigate('/staff_information/update_staff/:id', { state: row })}>Edit</button>
                  </td>
                  {openPopup && (
                    <div className='popup'>
                      <div className='box'>
                        <h2>Are you sure?</h2>
                        <button className='popup_button1' onClick={() => deleteRow(row.id)}>Yes</button>
                        <button className='popup_button2' onClick={() => setOpenPopup(false)}>No</button>
                      </div>
                    </div>
                  )}
                </tr>
              ))}
            </tbody>
            
          </table>
        </div>
      </div>
      </div>
        
    </div>
  );
}

export default Staff;
