import React from 'react';
import axios from 'axios';
import '../home.css';
import { useState, useEffect } from 'react';


const HistoryCard = () =>{

    const [data, setData] = useState([]);

    let patient_phn=localStorage.getItem('patient_phn');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/patient/medicalhx/${patient_phn}`);
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);

          }
        };
    
        fetchData();
      }, [patient_phn]);

    return(
        <div className='card1'>
            <div className='profile'>
              <div className='row'>
                <div className='col1'>PHN</div>
                <div className='col2'>:</div>
                <div className='col3'>{data.phn}</div>
              </div>
              {/* <div className='row'>
                <div className='col1'>Height</div>
                <div className='col2'>:</div>
                <div className='col3'>{data.height}</div>
              </div>
              <div className='row'>
                <div className='col1'>Weight</div>
                <div className='col2'>:</div>
                <div className='col3'>{data.weight}</div>
              </div> */}
              <div className='row'>
                <div className='col1'>Allergy History</div>
                <div className='col2'>:</div>
                <div className='col3'>{data.allergy}</div>
              </div>
              <div className='row'>
                <div className='col1'>Past Medical History</div>
                <div className='col2'>:</div>
                <div className='col3'>{data.past_med}</div>
              </div>
              <div className='row'>
                <div className='col1'>Past Surgical History</div>
                <div className='col2'>:</div>
                <div className='col3'>{data.past_surg}</div>
              </div>
              <div className='row'>
                <div className='col1'>Family History of Cancers</div>
                <div className='col2'>:</div>
                <div className='col3'>{data.hx_cancer}</div>
              </div>
              <div className='row'>
                <div className='col1'>Diagnosis</div>
                <div className='col2'>:</div>
                <div className='col3'>{data.diagnosis}</div>
              </div>
            </div>
        </div>
    )

}

export default HistoryCard;