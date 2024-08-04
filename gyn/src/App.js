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
import { AuthProvider} from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path ='/' element={<Login/>}></Route>
          <Route path ='/login' element={<Login/>}></Route>
          {/* <Route element = {<ProtectedRoute/>}> */}
            <Route path ='/home' element={<ProtectedRoute element={<Home/>}/>}></Route>          
            <Route path ='/patient_registration' element={<ProtectedRoute element={<PReg/>}/>}></Route>
            <Route path ='/patients_information' element={<ProtectedRoute element={<Patient/>}/>}></Route>
            <Route path ='/Register_staff' element={<ProtectedRoute element={<RegisterStaff/>}/>}></Route>
            <Route path ='/staff_information' element={<ProtectedRoute element={<Staff/>}/>}></Route>
            <Route path ='/staff_information/update_staff' element={<ProtectedRoute element={<UpdateStaff/>}/>}></Route>
            <Route path ='/patients_information/patient_profile' element={<ProtectedRoute element={<Profile/>}/>}></Route>
            <Route path ='/patients_information/patient_profile/patient_about' element={<ProtectedRoute element={<About/>}/>}></Route>
            <Route path ='/patients_information/patient_profile/patient_admission' element={<ProtectedRoute element={<Admission/>}/>}></Route>
            <Route path ='/patients_information/patient_profile/patient_admission/new_admission' element={<ProtectedRoute element={<PAdd/>}/>}></Route>  
            <Route path ='/patients_information/patient_profile/patient_admission/patient_visit' element={<ProtectedRoute element={<Visit/>}/>}></Route>
            <Route path ='/patients_information/patient_profile/patient_admission/patient_visit/visit_form' element={<ProtectedRoute element={<VisitForm/>}/>}></Route>        
            <Route path ='/patients_information/patient_profile/patient_admission/patient_visit/patient_admission_details' element={<ProtectedRoute element={<AdDetails/>}/>}></Route>
          {/* </Route> */}
        </Routes>

      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
