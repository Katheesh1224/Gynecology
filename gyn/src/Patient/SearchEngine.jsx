import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchEngine.css";
import Nav from "../Component/Nav.jsx";
import NavBar from "../Component/NavBar.jsx";
import Chatbot from "../Component/Chatbot.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Footer from '../Component/Footer.jsx';


const SearchEngine = () => {
    // const [isOpen, setIsOpen] = useState(true); 
    const [search, setSearch] = useState(""); 
    const [searchData, setSearchData] = useState([]); 
    const [selectedItem, setSelectedItem] = useState(-1); 
    const [page, setPage] = useState(1); 
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setSearch(e.target.value);
        setPage(1); 
    };

    const handleClose = () => {
        setSearch("");
        setSearchData([]);
        setSelectedItem(-1);
    };

    const handleKeyDown = (e) => {
        if (searchData.length > 0) {
        if (e.key === "ArrowUp" && selectedItem > 0) {
            e.preventDefault(); 
            setSelectedItem((prev) => prev - 1);
        } else if (e.key === "ArrowDown" && selectedItem < searchData.length - 1) {
            e.preventDefault();
            setSelectedItem((prev) => prev + 1);
        } else if (e.key === "Enter" && selectedItem >= 0) {
            e.preventDefault();
            assign(searchData[selectedItem].id); 
        }
        }
    };

    useEffect(() => {
        if (search.trim() !== "") {
        axios
            .get("http://localhost:5000/patient/dynamicsearchdata", {
            params: { val: search, page: 1, limit: 8 },
            })
            .then((response) => {
            console.log("API Response:", response.data);
            setSearchData(response.data);
            })
            .catch((error) => {
            console.error("Error fetching search data:", error);
            setSearchData([]);
            });
        } else {
        setSearchData([]);
        }
    }, [search, page]);

    const assign = (roe) => {
        localStorage.setItem('patient_id', roe);
        navigate('/patients_information/patient_profile');
    };

    const handleNewRegistration = () => {
        navigate('/search_engine/patient_registration');
    };

    return (
        <div>
            <NavBar />
            <Nav />
            <Chatbot />
            <div className="container-search">
                <h1 className="search-title">Search Existing Patient</h1>
                <form className="search-box" 
                    id="search-bar" 
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type="search"
                        placeholder="Type Name, NIC or PHN ..."
                        onChange={handleChange}
                        value={search}
                        className="search-input"
                        onKeyDown={handleKeyDown}
                    />
                    <div className="search-button" id="search-button">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" onClick={handleClose}/>
                    </div>
                </form>

                {search.trim() !== "" && (
                <div className="search-result">
                    {
                    searchData.map((row, index) => (
                        <div
                        key={row.id}
                        className={`search_suggestion_line ${
                            selectedItem === index ? "active" : ""
                        }`}
                        onMouseEnter={() => setSelectedItem(index)} 
                        onClick={() => assign(row.id)}
                        >
                        {row.full_name} - {row.nic} - {row.phn}
                        </div>
                    ))} 
                </div>
                )}
                <div className="no-results">
                    <p style={{fontSize:'1.3rem'}}>No results found. <span onClick={handleNewRegistration} className="new-registration-link">New Registration</span></p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchEngine;
