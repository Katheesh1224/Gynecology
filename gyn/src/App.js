import './App.css';
import Login from './login.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import PReg from './patient_registration.jsx';
import Home from './home.js';
import RegisterStaff from './Staff/Register_staff.js';
import Patient from './patients_information.jsx';
import About from './patient_about.jsx';
import Profile from './patient_profile.jsx';
import VisitForm from './visit_form.jsx';
import Admission from './patient_admission.jsx';
import Staff from './Staff/staff_information.jsx';
import PAdd from './new_admission.jsx';
import AdDetails from './patient_admission_details.jsx';
import UpdateStaff from './Staff/update_staff.jsx';
import Visit from './patient_visit.jsx';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/patient_registration' element={<PReg />} />
              <Route path='/home' element={<Home />} />
              <Route path='/patients_information' element={<Patient />} />
              <Route path='/Register_staff' element={<RegisterStaff />} />
              <Route path='/patients_information/patient_profile/patient_about/:id' element={<About />} />
              <Route path='/patients_information/patient_profile/:id' element={<Profile />} />
              <Route path='/patients_information/patient_profile/patient_admission/:id' element={<Admission />} />
              <Route path='/staff_information' element={<Staff />} />
              <Route path='/new_admission' element={<PAdd />} />
              <Route path='/staff_information/update_staff' element={<UpdateStaff />} />
              <Route path='/patients_information/patient_profile/patient_admission/patient_admission_details/:id' element={<AdDetails />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
