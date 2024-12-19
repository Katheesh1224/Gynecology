import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import Footer from '../Component/Footer.jsx';
import { toast } from 'react-toastify';
import '../App.css';
import PaginationHandler from '../Component/PaginationHandler.jsx'; // Import PaginationHandler


const Staff = () => {
  const [data, setData] = useState([]); 
  const [openPopup, setOpenPopup] = useState(false); 
  const [page, setPage] = useState(1); 
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMoreData, setHasMoreData] = useState(true); 
  const limit = 8;
  const [rowToDelete, setRowToDelete] = useState(null); 
  const UserRole = localStorage.getItem('role');
  const navigate = useNavigate();

  const fetchData = async (page) => {
    try {
      const response = await axios.get('http://localhost:5000/staff/data1', {
        params: { page, limit },
      });
      setData(response.data);
      console.log(response.data)
      setHasMoreData(response.data.length === limit);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data. Please try again.');
    }
  };

  
  useEffect(() => {
    fetchData(page); 
  }, [page]);


  const getRowStyle = (status) => {
    return status.trim() === 'active' ? { color: 'green' } : { color: 'red' };
    
  };


  const deleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/staff/staff_information/${id}`);
      setData(data.filter((row) => row.id !== id)); 
      setOpenPopup(false); 
      toast.success('Row deleted successfully');
    } catch (error) {
      console.error('Error deleting row:', error);
      toast.error('Failed to delete row. Please try again.');
    }
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

 
  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setOpenPopup(true); 
  };

  const handleConfirmDelete = () => {
    if (rowToDelete) {
      deleteRow(rowToDelete.id);
    }
  };

  const handleCancelDelete = () => {
    setRowToDelete(null);
    setOpenPopup(false); 
  };
   const getDisplayRole = (role) => {
    switch (role) {
      case 'consultant':
        return 'Consultant';
      case 'superadmin':
        return 'Super Admin';
      case 'data_entry':
        return 'Data Entry';
      case 'registrar':
        return 'Registrar';
      case 'medical_officer':
        return 'Medical Officer';
      default:
        return 'User';
    }
  };

  const handleRegistration = () => {
    navigate(`/staff_information/Register_staff`);
  };

  return (
    <div className='wrapper'>
      <NavBar />
      <Chatbot />
      <div className='main-content'>

        <Nav />
        <div className='container'>
          <h2 style={{fontWeight:"bold"}} >Staff Information</h2>
          <div className="search-bar">
            <div>
              <button className="button_add" onClick={handleRegistration}> New Staff Registration </button>
            </div>
          </div>
          <div className='patient_table'>
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Phone No.</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id}>
                    <td style={{textAlign:'left'}}>{row.full_name}</td>
                    <td>{row.phone_no}</td>
                    <td>{getDisplayRole(row.role)}</td>
                    <td style={getRowStyle(row.status)}>{row.status}</td>
                    <td>
                      { UserRole === 'superadmin' &&(
                      <button className='button_delete' onClick={() => handleDeleteClick(row)}>
                        Delete
                      </button>
                      )}
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

          <PaginationHandler
            page={page}
            setPage={setPage}
            hasMoreData={hasMoreData}
            fetchData={fetchData}
            filter={filter}
            searchQuery={searchQuery}
          />

        </div>
      </div>

      {openPopup && (
        <div className='modal'>
          <div className='modal-content'>
          <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete <strong>{rowToDelete?.full_name}</strong> ?
            </p>
            <div className="modal-buttons">
              <button onClick={handleConfirmDelete} style={{ backgroundColor: 'red', color: 'white' }}>
                Confirm
              </button>
              <button onClick={handleCancelDelete} style={{ backgroundColor: 'grey', color: 'white' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Staff;
