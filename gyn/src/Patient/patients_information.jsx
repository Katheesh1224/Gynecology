import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import '../App.css';
import Footer from '../Component/Footer.jsx';
import SearchBar from '../Component/SearchBar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUserMinus} from '@fortawesome/free-solid-svg-icons';


const Patient = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('all'); // Default to 'all'
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const limit = 8;
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const fetchData = async (page, filterType = filter, search = '') => {
    console.log(`Fetching data with page: ${page}`);
    console.log(`Filter: ${filterType}, Search Query: ${search}`);

    try {
      let endpoint =
        filterType === 'discharged'
          ? 'http://localhost:5000/patient/dischargedata'
          : filterType === 'admitted'
          ? 'http://localhost:5000/patient/admitdata'
          : 'http://localhost:5000/patient/data';

      if (search.trim() !== '') {
        endpoint = 'http://localhost:5000/patient/dynamicsearchdata';
      }

      const response = await axios.get(endpoint, {
        params: { limit, page, val: search },
      });

      setData(response.data);
      setHasMoreData(response.data.length === limit);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setFilter('all');
    setPage(1);
    fetchData(1, 'all'); 
  }, []);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    setPage(1);
    fetchData(1, filterType);
  };

  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, filter, searchQuery);
  };

  const handlePrevious = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchData(prevPage, filter, searchQuery);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    fetchData(1, 'search', query); // Fetch data with the search query
  };

  const assign = (roe) => {
    localStorage.setItem('patient_id', roe);
    navigate('/patients_information/patient_profile');
  };

  return (
    <div className="wrapper">
      <NavBar />
      <Chatbot />
      <div className="main-content">
        <Nav />
        <div className="container">
          <h2 style={{ fontWeight: 'bold' }}>Patient Information</h2>
          <div className="search-bar">
            <div className="input">
              <SearchBar onSearch={handleSearch} />
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
                  <th>No.</th>
                  <th>Full Name</th>
                  <th>PHN No.</th>
                  <th>NIC</th>
                  {/* <th>Status</th> */}
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
                    {/* </td>
                    <td> */}
                      <button
                        className="button_view"
                        onClick={() => assign(row.id)}
                        >
                        View
                      </button>
                        &emsp; 
                    <span className={row.admit_status === "discharged" ? "status-discharged" : "status-admitted"}>
                      {row.admit_status === "admitted" ? <FontAwesomeIcon icon={faUserPlus} style={{color: "#63E6BE",}} /> : <FontAwesomeIcon icon={faUserMinus} style={{color: "#ff4763",}} />}
                    </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="button-bar2">
            {hasMoreData && (
              <button className="button_next" onClick={handleNext}>
                Next &nbsp;&nbsp; {'>>'}
              </button>
            )}
            {page > 1 && (
              <button className="button_prev" onClick={handlePrevious}>
                {'<<'} &nbsp;&nbsp; Previous
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Patient;
