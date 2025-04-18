import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';
import './App.css';

const Patient = () => {
    const [data, setData] = useState([]);
    const [values, setValues] = useState({ phn: '', name: '' });
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const limit = 8;

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

    return (
        <div className=''>
            <NavBar />
            <Nav />
            <div className=''>
                <div className='search'>
                    <div className="input">
                        <input
                            type='text'
                            placeholder='Search with Name/NIC/PHN here'
                            onChange={e => setValues({ ...values, phn: e.target.value })}
                        />
                    </div>
                    <button className='button_srch' onClick={handleSearch}>Search</button>
                    <button className='button_add' onClick={handleAdmit}>Admitted Patient</button>
                    <button className='button_dis' onClick={handleDischarge}>Discharged Patient</button>
                </div>

                <div className='patient_table' style={{ margin: "150px" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>PHN No</th>
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
                                        <button className='button_details'>
                                            <Link to={`/patients_information/patient_profile/${row.id}`} className='btn btn-sm btn-primary mx-2'>View</Link>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    {page > 1 && (
                                        <button className='button_details' onClick={handlePrevious}>Previous</button>
                                    )}
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    {hasMoreData && (
                                        <button className='button_details' onClick={handleNext}>Next</button>
                                    )}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Patient;
