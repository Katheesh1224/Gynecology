import React, { useContext,useEffect, useState, useRef } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import '../home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faRectangleXmark, faRightFromBracket, faPhone } from '@fortawesome/free-solid-svg-icons';
import UserPath from './UserPath.jsx';
import { AuthContext } from '../AuthContext.jsx';
import axios from 'axios';


const NavBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); 

  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);


  const [username, setUsername] = useState('');
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  useEffect(() => {
    // Fetch the username from the backend using the userId
    if (userId) {
      axios
        .get(`http://localhost:5000/staff/staff/${userId}`)
        .then((response) => {
          setUsername(response.data.full_name); // Update the username state
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [userId]);


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleLogout = async () => {
    logout();
    navigate('/login');
  };


  const getDisplayRole = (role) => {
    switch (role) {
      case 'consultant':
        return 'Consultant';
      case 'superadmin':
        return 'Super Admin';
      case 'data_entry':
        return 'Data Entry';
      case 'registrar':
        return 'Registrar';
      default:
        return 'User';
    }
  };

  return (
    <header className="header" id="header">
      <nav className="nav">
        <div className={`nav__menu ${showMenu ? 'show-menu' : ''}`} id="nav-menu">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink exact to={role === "superadmin" ? '/home' : '/backup'} className="nav__link" activeClassName="active" onClick={closeMenu}>
                <span>Home</span>
              </NavLink>
            </li>
          
            <li className="nav__item">
              <NavLink exact to="/search" className="nav__link" activeClassName="active" onClick={closeMenu}>
                <span>Patient Registration</span>
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink exact to="/patients_information" className="nav__link" activeClassName="active" onClick={closeMenu}>
                <span>Patient Information</span>
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink exact to="/register_staff" className="nav__link" activeClassName="active" onClick={closeMenu}>
                <span>Staff Registration</span>
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink exact to="/staff_information" className="nav__link" activeClassName="active" onClick={closeMenu}>
                <span>Staff Information</span>
              </NavLink>
            </li>
            {role === 'superadmin' && (
            <li className="nav__item">
              <NavLink exact to="/analysis" className="nav__link" activeClassName="active" onClick={closeMenu}>
                <span>Analysis</span>
              </NavLink>
            </li>
            )}
            {role ==='superadmin' &&(
            <li className="nav__item">
              <NavLink exact to="/data_export" className="nav__link" activeClassName="active" onClick={closeMenu}>
                <span>Data Export</span>
              </NavLink>
            </li>
            )}
          </ul>

          <div className="nav__close" id="nav-close" onClick={closeMenu}>
            <FontAwesomeIcon icon={faRectangleXmark} />
          </div>
        </div>
      </nav>

      <nav className="navM">
        <div className="containerN">
          <div className="bar_gyn">
            <FontAwesomeIcon icon={faBars} className="nav__toggle" id="nav-toggle" onClick={toggleMenu} />
            <h1 className="logo">
              <a href="/home" className="a">GYNECOLOGY</a>
            </h1>
          </div>

          <UserPath />
          <ul>
            <div className="profile-dropdown" ref={dropdownRef}>
              <div onClick={toggleDropdown} className="profile-dropdown-btn">
                <div className="profile-img">
                </div>
                {username && ( <span data-fullname={username}>{username} </span> )}
                </div>

              <ul className={`profile-dropdown-list ${isActive ? "active" : ""}`}>
                <li className="profile-dropdown-list-item">
                  <a href="/staff_profile">
                    <div className='icon'>
                      <FontAwesomeIcon icon={faUser}  />
                    </div>
                    Profile
                  </a>
                </li>
                {role !="superadmin" && (
                <li className="profile-dropdown-list-item">
                  <a href="/contactus">
                    <div className='icon'>
                      <FontAwesomeIcon icon={faPhone}  />
                    </div>
                    Contact Us
                  </a>
                </li>
                )}
                <li className="profile-dropdown-list-item" onClick={handleLogout}>
                  <a href="/login">
                  <div className='icon'>
                    <FontAwesomeIcon icon={faRightFromBracket}  />
                  </div>
                   Log out
                  </a>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;