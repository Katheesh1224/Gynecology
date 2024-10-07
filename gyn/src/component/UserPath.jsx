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
    'patient_about': 'Patient Personal Details',
    'patient_visit': 'Patient Visit',
    'visit_form': 'Visit Form',
    'patient_admission': 'Patient Admission',
    'patient_admission_details': 'Patient Admission Details',
    'update_staff':'UpdateStaff',
    'new_admission':'New Admission',
    'patient_history':'Patient Medical History',
    'patient_medicalhx_edit':'Edit Medical History',

  };

  const role = localStorage.getItem('role');

  return (
    <nav className="breadcrumb">
      <Link to={role === "data_entry" ? '/backup' : '/home'}>Home</Link>
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
