import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UserPath.css';

const UserPath = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    'home': 'Home',
    'backup':'Home',
    'analysis':'Analysis',
    'patient_registration': 'Patient Registration',
    'Register_staff': 'Staff Registration',
    'patients_information': 'Patient Information',
    'staff_information': 'Staff Information',
    'patient_profile': 'Patient Profile',
    'patient_about': 'Patient Personal Details',
    'patient_visit': 'Patient Visits',
    'visit_form': 'Visit Form',
    'patient_admission': 'Patient Admissions',
    'patient_admission_details': 'Patient Admission Details',
    'update_staff':'UpdateStaff',
    'new_admission':'New Admission',
    'patient_history':'Patient Medical History',
    'patient_medicalhx_edit':'Edit Medical History',
    'visit_details':'Visit Details',
    'data_export':'Data Export',
    'search_engine' : 'Search Engine',
    'staff_profile':'Staff Profile',
    'visit_details_edit':'Edit Visit Details',
    'patient_admission_details_edit':'Edit Admission Details',
    'patient_edit':'Edit Patient Details',
    'contactus':'Contact Us',

  };

  const role = localStorage.getItem('role');

  return (
    <nav className="breadcrumb">
      <Link to={role === "data_entry" ? '/backup' : '/home'}></Link>
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
