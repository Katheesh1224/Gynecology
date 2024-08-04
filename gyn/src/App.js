import './App.css';
import Login from './login.jsx';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
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


function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path ='/' element={<Login/>}></Route>
          <Route path ='/home' element={<Home/>}></Route>          
          <Route path ='/patient_registration' element={<PReg/>}></Route>
          <Route path ='/patients_information' element={<Patient/>}></Route>
          <Route path ='/Register_staff' element={<RegisterStaff/>}></Route>
          <Route path ='/staff_information' element={<Staff/>}></Route>
          <Route path ='/staff_information/update_staff' element={<UpdateStaff/>}></Route>
          <Route path ='/patients_information/patient_profile' element={<Profile/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_about' element={<About/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_admission' element={<Admission/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_admission/new_admission' element={<PAdd/>}></Route>  
          <Route path ='/patients_information/patient_profile/patient_admission/patient_visit' element={<Visit/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_admission/patient_visit/visit_form' element={<VisitForm/>}></Route>        
          <Route path ='/patients_information/patient_profile/patient_admission/patient_visit/patient_admission_details' element={<AdDetails/>}></Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
