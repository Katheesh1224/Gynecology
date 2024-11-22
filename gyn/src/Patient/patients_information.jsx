import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import '../App.css';

const Patient = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('all'); // Default to 'all'
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const limit = 8;
    const navigate = useNavigate();

    const fetchData = async (page, filterType = filter) => {
        try {
            const endpoint =
                filterType === 'admitted'
                    ? 'http://localhost:8081/admitdata'
                    : filterType === 'discharged'
                    ? 'http://localhost:8081/dischargedata'
                    : 'http://localhost:8081/data';

            console.log(`Fetching data from: ${endpoint} with page: ${page}`);
            const response = await axios.get(endpoint, {
                params: { limit, page },
            });
            setData(response.data);
            setHasMoreData(response.data.length === limit);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Reset filter to 'all' on component mount
        setFilter('all');
        setPage(1); // Reset page to 1
        fetchData(1, 'all'); // Fetch all patient data on initial load
    }, []);

    const handleFilterChange = (filterType) => {
        setFilter(filterType);
        setPage(1); // Reset to the first page
        fetchData(1, filterType); // Fetch data based on the selected filter
    };

    const handleNext = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchData(nextPage);
    };

    const handlePrevious = () => {
        if (page > 1) {
            const prevPage = page - 1;
            setPage(prevPage);
            fetchData(prevPage);
        }
    };

    const assign = (roe) => {
        localStorage.setItem('patient_id', roe);
        navigate('/patients_information/patient_profile');
    };

    return (
        <div className="wrapper">
            <NavBar />
            <div className="main-content">
                <Nav />
                <div className="container">
                    <h2>Patient Information</h2>
                    <div className="search">
                        <div className="input">
                            <input
                                type="text"
                                placeholder="Search with Name/NIC/PHN here"
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            <button
                                className="button_search"
                                onClick={() => handleFilterChange('search')}
                            >
                                Search
                            </button>
                        </div>
                        <div>
                            <button
                                className="button_add"
                                onClick={() => handleFilterChange('admitted')}
                            >
                                Admitted Patient
                            </button>
                            <button
                                className="button_dis"
                                onClick={() => handleFilterChange('discharged')}
                            >
                                Discharged Patient
                            </button>
                        </div>
                    </div>

                    <div className="patient_table">
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
                                            <button
                                                className="button_view"
                                                onClick={() => assign(row.id)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="button-bar">
                        {page > 1 && (
                            <button
                                className="button_prev"
                                onClick={handlePrevious}
                            >
                                {'<<'} &nbsp;&nbsp; Previous
                            </button>
                        )}
                        {hasMoreData && (
                            <button
                                className="button_next"
                                onClick={handleNext}
                            >
                                Next &nbsp;&nbsp; {'>>'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Patient;
