import React from 'react';
import axios from 'axios';
import '../home.css';
import { useState,useEffect } from 'react';


const ProfileCard = () =>{

    const [data, setData] = useState([]);

    let patient_id=localStorage.getItem('patient_id');
    // const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/patient/patient/${patient_id}`);
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return(
        <div className='card1'>
                <div className='profile'>
                  <div className='row'>
                      <div className='col1'>Full Name</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.full_name}</div>
                  </div>
                  <div className='row'>
                      <div className='col1'>Address</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.address}</div>
                  </div>
                  <div className='row'>
                      <div className='col1'>Blood Group</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.blood_gr}</div>
                  </div>
                  <div className='row'>
                      <div className='col1'>Age</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.age}</div>
                  </div>
                  <div className='row'>
                      <div className='col1'>Phone Number</div>
                      <div className='col2'>:</div>
                      <div className='col3'>{data.phone_no}</div>
                  </div>
                </div>

              </div>
    )

}

export default ProfileCard;