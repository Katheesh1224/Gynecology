import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRectangleList, faHospitalUser, faUserNurse, faLineChart, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
// import { BarChart } from 'lucide-react';

const Nav = () => {
  const role = localStorage.getItem('role');
  return (
    <div id="Head" className="d-flex flex-column justify-content-center">
        <nav id="navbar" className="navbar nav-round">
          <ul>
            <li>
              <NavLink exact to={role==="superadmin" ? '/home' : '/backup'} className="nav-link" activeClassName="active">
                <FontAwesomeIcon icon={faHouse} />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/search_engine" className="nav-link" activeClassName="active">
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
            {role ==='superadmin' && (          
              <li>
              <NavLink to="/staff_information" className="nav-link" activeClassName="active">
                <FontAwesomeIcon icon={faUserNurse} />
                <span>Staff Information</span>
              </NavLink>
            </li>
            )}
            {role !== 'data_entry' && (
            <li>
              <NavLink to="/analysis" className="nav-link" activeClassName="active">
                <FontAwesomeIcon icon={faLineChart} />
                <span>Analysis</span>
              </NavLink>
            </li>
            
            
            )}
             {role === 'superadmin' && (
            <li>
              <NavLink to="/data_export" className="nav-link" activeClassName="active">
                <FontAwesomeIcon icon={faFileExport} />
                <span>Data Export</span>
              </NavLink>
            </li>
             )}
          </ul>

          
        </nav>
        
    </div>
  );
  
};


export default Nav;
