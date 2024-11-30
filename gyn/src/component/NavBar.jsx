import React, { useContext, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import '../home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import UserPath from './UserPath.jsx';
import { AuthContext } from '../AuthContext.jsx';

const NavBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false); 

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
            <li  className="user-role-container"
              onMouseEnter={() => setDropdownVisible(true)}               
              onMouseLeave={() => setDropdownVisible(false)} 
              style={{ position: 'relative' }}>

              <div className="user-info">
                <FontAwesomeIcon icon={faUser} onClick={handleLogout} className="user" />
              </div>
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <span className="dropdown-role">{getDisplayRole(role)}</span>
                </div>
              )}
            </li>
            <li>
              <button onClick={handleLogout} className="buttonHome btn2logout">Logout</button>
            </li>
          </ul>

      {/* <span className="role-text">{getDisplayRole(role)}</span> */}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;