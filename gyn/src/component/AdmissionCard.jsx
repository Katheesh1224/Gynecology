import React from 'react';
import axios from 'axios';
import '../home.css';
import { useState, useEffect } from 'react';


const AdmissionCard = () =>{

    const [data, setData] = useState([]);

    let patient_phn=localStorage.getItem('patient_phn');

    useEffect(() => {
        const fetchData = async () => {
        const add_count = parseInt(localStorage.getItem('addCount'), 10); // Ensure parsing here

        if (isNaN(add_count)) {
            console.error("Invalid add_count value.");
            return; // Prevent further execution if add_count is not valid
        }

        try {
            const response = await axios.get(`http://localhost:5000/patient/admission/${patient_phn}/${add_count}`);
            setData(response.data); // Assuming response.data is the correct structure
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        if (patient_phn) {
            fetchData();
        }
    }, [patient_phn]);

    return(
        <div className='card1'>
            <div className='profile'>
                <div className='row'>
                    <div className='col1'>Date</div>
                    <div className='col2'>:</div>
                    <div className='col3'>{data.date}</div>
                </div>
                <div className='row'>
                    <div className='col1'>PHN</div>
                    <div className='col2'>:</div>
                    <div className='col3'>{data.phn}</div>
                </div>
                <div className='row'>
                    <div className='col1'>BHT</div>
                    <div className='col2'>:</div>
                    <div className='col3'>{data.bht}</div>
                </div>
                <div className='row'>
                    <div className='col1'>Ward</div>
                    <div className='col2'>:</div>
                    <div className='col3'>{data.ward_no}</div>
                </div>
                <div className='row'>
                    <div className='col1'>Consultant</div>
                    <div className='col2'>:</div>
                    <div className='col3'>{data.consultant}</div>
                </div>
                <div className='row'>
                    <div className='col1'>Status</div>
                    <div className='col2'>:</div>
                    <div className='col3'>{data.status}</div>
                </div>
                <div className='row'>
                <div className='col1'>Height</div>
                <div className='col2'>:</div>
                <div className='col3'>{data.height}</div>
              </div>
              <div className='row'>
                <div className='col1'>Weight</div>
                <div className='col2'>:</div>
                <div className='col3'>{data.weight}</div>
              </div>
              {/* <div className='row'>
                <div className='col1'>BMI</div>
                <div className='col2'>:</div>
                <div className='col3'>{(data.weight * 10000)/(data.height * data.height) }</div>
              </div> */}

                <div className='row'>
                <div className='col1'>BMI</div>
                <div className='col2'>:</div>
                <div className='col3'>
                    {(() => {
                    const bmi = (data.weight * 10000) / (data.height * data.height);
                    if (bmi < 18.5) {
                        return 'Underweight';
                    } else if (bmi >= 18.5 && bmi <= 24.9) {
                        return 'Normal weight';
                    } else if (bmi >= 25 && bmi <= 29.9) {
                        return 'Overweight';
                    } else {
                        return 'Obesity';
                    }
                    })()}
                </div>
                </div>

            </div>
        </div>
    )

}

export default AdmissionCard;