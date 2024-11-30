import React, { useState } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    onSearch(query); // Trigger search callback
  };

  const handleClose = () => {
    setSearch('');
    onSearch(''); // Clear search
    setIsOpen(false);
  };

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container_search">
      <form
        className={`search ${isOpen ? 'show-search' : ''}`}
        id="search-bar"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="search"
          placeholder="Type NIC, phone, or name..."
          onChange={handleChange}
          value={search}
          className="search_input"
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
            className={`search__icon ${isOpen ? 'hidden' : ''}`}
          />
          <FontAwesomeIcon
            icon={faClose}
            className={`search__close ${isOpen ? '' : 'hidden'}`}
            onClick={handleClose}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
