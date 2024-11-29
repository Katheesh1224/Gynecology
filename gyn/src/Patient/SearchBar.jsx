import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SearchBar.css";
import Nav from "../Component/Nav.jsx";
import NavBar from "../Component/NavBar.jsx";
import Chatbot from "../Component/Chatbot.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle search bar visibility
  const [search, setSearch] = useState(""); // User's search input
  const [searchData, setSearchData] = useState([]); // API results
  const [selectedItem, setSelectedItem] = useState(-1); // Highlighted item index
  const [page, setPage] = useState(1); // Pagination control
  const navigate = useNavigate(); // For navigation

  // Update search input state
  const handleChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  // Clear search input and reset state
  const handleClose = () => {
    setSearch("");
    setSearchData([]);
    setSelectedItem(-1);
  };

  // Navigate through search suggestions using keyboard
  const handleKeyDown = (e) => {
    if (searchData.length > 0) {
      if (e.key === "ArrowUp" && selectedItem > 0) {
        e.preventDefault(); // Prevent cursor movement in the input
        setSelectedItem((prev) => prev - 1);
      } else if (e.key === "ArrowDown" && selectedItem < searchData.length - 1) {
        e.preventDefault();
        setSelectedItem((prev) => prev + 1);
      } else if (e.key === "Enter" && selectedItem >= 0) {
        e.preventDefault();
        assign(searchData[selectedItem].id); // Go to patient profile on Enter key press
      }
    }
  };

  // Fetch search results from API
  useEffect(() => {
    if (search.trim() !== "") {
      axios
        .get("http://localhost:5000/dynamicsearchdata", {
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

  // Navigate to the patient registration page
  const handleNewRegistration = () => {
    navigate('/search/patient_registration');
  };

  // Toggle search bar visibility
  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <NavBar />
      <Nav />
      <Chatbot />
      <div className="container-search">
        <form
          className={`search ${isOpen ? "show-search" : ""}`}
          id="search-bar"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            placeholder="Type NIC, phone, or name..."
            onChange={handleChange}
            value={search}
            className="search__input"
            onKeyDown={handleKeyDown}
          />
          <div
            className="search__button"
            id="search-button"
            onClick={(e) => {
              e.preventDefault();
              toggleSearch();
            }}
          >
            <FontAwesomeIcon
              icon={faSearch}
              className={`search__icon ${isOpen ? "hidden" : ""}`}
            />
            <FontAwesomeIcon
              icon={faClose}
              className={`search__close ${isOpen ? "" : "hidden"}`}
              onClick={handleClose}
            />
          </div>
        </form>

        {search.trim() !== "" && (
          <div className="search_result">
            {searchData.length > 0 ? (
              searchData.map((row, index) => (
                <div
                  key={row.id}
                  className={`search_suggestion_line ${
                    selectedItem === index ? "active" : ""
                  }`}
                  onMouseEnter={() => setSelectedItem(index)} // Highlight on hover
                  onClick={() => assign(row.id)}
                >
                  {row.full_name} - {row.nic} - {row.phn}
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No results found. <span onClick={handleNewRegistration} className="new-registration-link">New Registration</span></p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
