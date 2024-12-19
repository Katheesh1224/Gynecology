import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import Footer from '../Component/Footer.jsx';
import { toast } from 'react-toastify';
import './staff_profile.css';

const StaffProfile = () => {
  const [data, setData] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem('userId'); 

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
      default:
        return 'User';
    }
  };

  // Fetch staff data
  const fetchStaffData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/staff/staff/${userId}`);
      setData(response.data);
      setEditData(response.data); // Initialize editData with current profile data
    } catch (error) {
      console.error('Error fetching staff data:', error);
      toast.error('Failed to fetch profile. Please try again.');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchStaffData();
    } else {
      toast.error('Staff ID not found. Please log in again.');
    }
  }, [userId]);

  // Handle data update
  const handleUpdate = async () => {
    try {
      const { full_name, phone_no, role, email, password, status } = editData;

      const updatedData = { full_name, phone_no, role, email, password, status };

      const response = await axios.put(`http://localhost:5000/staff/staff_update/${data.id}`, updatedData);

      if (response.status === 200) {
        toast.success('Profile updated successfully!');

        // Update the `data` state immediately with the updated values
        setData({ ...data, ...editData });

        setIsEditing(false); // Exit editing mode
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="card-container">
        <NavBar />
        <Nav />
        <Chatbot />
      <div className="s_card">
        <div className="s_card_border">
          <img src="./avatar.png" alt="profile" className="s_card_image" />
        </div>
        {data ? (
          <>
            {!isEditing ? (
              <>
                <h3 className="s_card_name">{data.full_name}</h3>
                <span className="s_card_email">{data.email}</span><br />
                <span className="s_card_email">{data.phone_no}</span><br />
                <span className="s_card_email" >{getDisplayRole(data.role)}</span>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="full_name"
                  value={editData.full_name}
                  onChange={handleInputChange}
                  className="edit-input"
                />
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  className="edit-input"
                />
                <input
                  type="text"
                  name="phone_no"
                  value={editData.phone_no}
                  onChange={handleInputChange}
                  className="edit-input"
                  maxLength={10}
                />
                {/* <input
                  type="text"
                  name="role"
                  value={editData.role}
                  onChange={handleInputChange}
                  className="edit-input"
                  readOnly
                />
                <input
                  type="password"
                  name="password"
                  value={editData.password}
                  onChange={handleInputChange}
                  className="edit-input"
                  hidden
                  readOnly
                /> */}
              </>
            )}

              {!isEditing ? (
                <button className="s_card_button" onClick={() => setIsEditing(true)}>Edit</button>
              ) : (
                <>
                  <button className="s_card_button" onClick={handleUpdate}>Update</button>
                  {/* <button className="s_card_button" onClick={() => setIsEditing(false)}>Cancel</button> */}
                </>
              )}
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default StaffProfile;
