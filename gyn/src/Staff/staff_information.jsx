import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import { toast } from 'react-toastify';
import '../App.css';

const Staff = () => {
  const [data, setData] = useState([]); // Store staff data
  const [openPopup, setOpenPopup] = useState(false); // For delete confirmation
  const [page, setPage] = useState(1); // Track the current page
  const [hasMoreData, setHasMoreData] = useState(true); // Flag for data availability
  const limit = 8; // Number of records per page
  const [rowToDelete, setRowToDelete] = useState(null); // For the row being deleted
  const navigate = useNavigate();

  // Fetch data for the current page
  const fetchData = async (page) => {
    try {
      const response = await axios.get('http://localhost:8081/data1', {
        params: { page, limit },
      });
      setData(response.data);
      // Check if there's more data than the limit
      setHasMoreData(response.data.length === limit);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data. Please try again.');
    }
  };

  // Effect to fetch data whenever the page changes
  useEffect(() => {
    fetchData(page); // Fetch data whenever the page changes
  }, [page]);

  // Get the row style based on its status
  const getRowStyle = (status) => {
    return status.trim() === 'active' ? { color: 'green' } : { color: 'red' };
  };

  // Delete a staff row from the database
  const deleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/staff_information/${id}`);
      setData(data.filter((row) => row.id !== id)); // Remove the deleted row from the table
      setOpenPopup(false); // Close the delete confirmation popup
      toast.success('Row deleted successfully');
    } catch (error) {
      console.error('Error deleting row:', error);
      toast.error('Failed to delete row. Please try again.');
    }
  };

  // Handle "Next" button click
  const handleNext = () => {
    setPage((prevPage) => prevPage + 1); // Move to the next page
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1); // Move to the previous page, but don't go below page 1
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setOpenPopup(true); // Show the delete confirmation popup
  };

  const handleConfirmDelete = () => {
    if (rowToDelete) {
      deleteRow(rowToDelete.id); // Confirm the deletion
    }
  };

  const handleCancelDelete = () => {
    setRowToDelete(null);
    setOpenPopup(false); // Close the popup without deleting
  };

  return (
    <div className='wrapper'>
      <NavBar />
      <Chatbot />
      <div className='main-content'>
        <Nav />
        <div className='container'>
          <h2 style={{fontWeight:"bold"}} >Staff Information</h2>
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
                      <button className='button_delete' onClick={() => handleDeleteClick(row)}>
                        Delete
                      </button>
                      <button
                        className='button_edit'
                        onClick={() => navigate('/staff_information/update_staff', { state: row })}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="button-bar">
          {hasMoreData && (
            <button className="button_next" onClick={handleNext}> Next {'>>'} </button>
          )}
          {page > 1 && (
            <button className="button_prev" onClick={handlePrevious}> {'<<'} &nbsp;&nbsp; Previous </button>
          )}            
          
          </div>
        </div>
      </div>

      {openPopup && (
        <div className='popup'>
          <div className='box'>
            <h2>Are you sure you want to delete {rowToDelete?.full_name}?</h2>
            <button className='popup_button1' onClick={handleConfirmDelete}>
              Yes
            </button>
            <button className='popup_button2' onClick={handleCancelDelete}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Staff;
