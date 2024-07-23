import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UserPath.css';

const UserPath = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    // '': 'Sign In',
    'home': '.',
    'patient_registration': 'Patient Registration',
    'register_staff': 'Staff Registration',
    'patients_information': 'Patient Information',
    'staff_information': 'Staff Information',
    'patient_profile': 'Patient Profile',
    'patient_about': 'Patient About',
    'patient_visit': 'Patient Visit',
    'patient_admission': 'Patient Admission',
    'patient_admission_details': 'Patient Admission Details',
  };

  return (
    <nav className="breadcrumb">
      <Link to="/home">Dashboard</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <span key={to}>
            {' > '}
            <Link to={to}>{breadcrumbNameMap[value] || value}</Link>
          </span>
        );
      })}
    </nav>
  );
};

export default UserPath;
