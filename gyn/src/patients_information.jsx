import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';
import './App.css';

const Patient = () => {
    const [data, setData] = useState([]);
    const [values, setValues] = useState({ val: '' });
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const limit = 8;
    const navigate = useNavigate();

    const fetchData = async (page) => {
        try {
            const response = await axios.get('http://localhost:8081/data', {
                params: { limit, page }
            });
            setData(response.data);
            setHasMoreData(response.data.length === limit);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handleNext = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://localhost:8081/searchdata', values);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleAdmit = async () => {
        try {
            const response = await axios.get('http://localhost:8081/admitdata');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDischarge = async () => {
        try {
            const response = await axios.get('http://localhost:8081/dischargedata');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    function assign(roe){
        localStorage.setItem('patient_id',roe);
        navigate('/patients_information/patient_profile');
    }

    return (
        <div className='wrapper'>
            <NavBar/>
            <div className='main-content'>
                <Nav/>
                <div className='container'>
                    <h2>Patient Information</h2>
                    <div className='search'>
                        <div className="input">
                            <input
                                type='text'
                                placeholder='Search with Name/NIC/PHN here'
                                onChange={e => setValues({ ...values, val: e.target.value })}
                            />
                            <button className='button_search' onClick={handleSearch}>Search</button>
                        </div>
                        <div>
                            <button className='button_add' onClick={handleAdmit}>Admitted Patient</button>
                            <button className='button_dis' onClick={handleDischarge}>Discharged Patient</button>
                        </div>
                    </div>

                    <div className='patient_table'>
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Full Name</th>
                                    <th>PHN No</th>
                                    <th>NIC</th>
                                    <th>Management</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, index) => (
                                    <tr key={row.id}>
                                        <td>{(page - 1) * limit + index + 1}</td>
                                        <td>{row.full_name}</td>
                                        <td>{row.phn}</td>
                                        <td>{row.nic}</td>
                                        <td>
                                            <button className='button_view' onClick={()=>assign(row.id)}>View
                                                {/* <Link to={`/patients_information/patient_profile/${row.id}`} className='btn btn-sm btn-primary mx-2'>View</Link> */}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='button-bar'>
                        {page > 1 && (<button className='button_prev' onClick={handlePrevious}>{"<<"} &nbsp;&nbsp; Previous</button>)}
                        {page < 2 && (<button className='button_prev2' ></button>)}
                        <div className='next-bar'>
                            {hasMoreData && (<button className='button_next' onClick={handleNext}>Next &nbsp;&nbsp; {">>"} </button>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patient;
