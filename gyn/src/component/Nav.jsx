import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRectangleList, faHospitalUser, faUserNurse, faEye } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <header id="header" className="d-flex flex-column justify-content-center">
        <nav id="navbar" className="navbar nav-menu">
          <ul>
            <li>
              <NavLink exact to="/home" className="nav-link" activeClassName="active">
                <FontAwesomeIcon icon={faHouse} />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient_registration" className="nav-link" activeClassName="active">
                <FontAwesomeIcon icon={faRectangleList} />
                <span>Patient Registration</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/patients_information" className="nav-link" activeClassName="active">
                <FontAwesomeIcon icon={faHospitalUser} />
                <span>Patient Information</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/register_staff" className="nav-link" activeClassName="active">
                <FontAwesomeIcon icon={faRectangleList} />
                <span>Staff Registration</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff_information" className="nav-link" activeClassName="active">
                <FontAwesomeIcon icon={faUserNurse} />
                <span>Staff Information</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/patient_visit" className="nav-link" activeClassName="active">
                <FontAwesomeIcon icon={faEye} />
                <span>Visit</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
