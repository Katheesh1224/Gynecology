import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import './App.css';
import Login from './login.jsx';
import React from 'react';
import PReg from './Patient/patient_registration.jsx';
import Home from './home.jsx';
import RegisterStaff from './Staff/Register_staff.jsx';
import Patient from './Patient/patients_information.jsx';
import About from './Patient/patient_about.jsx';
import Profile from './Patient/patient_profile.jsx';
import VisitForm from './Patient/visit_form.jsx';
import Admission from './Patient/patient_admission.jsx';
import Staff from './Staff/staff_information.jsx';
import PAdd from './Patient/new_admission.jsx';
import UpdateStaff from './Staff/update_staff.jsx';
import Visit from './Patient/patient_visit.jsx';
import ProtectedRoute from './ProtectedRoute';
import PEdit from './Patient/patient_edit.jsx';
import MedDetails from './Patient/patient_medical_hx.jsx';
import MedHisEdit from './Patient/patient_medicalhx_edit.jsx';
import AdEdit from './Patient/patient_admission_details_edit.jsx';
import Backup from './backup.jsx';
import ForgotPassword from './Staff/forgotpassword.jsx';
import Analysis from './Analysis/Analysiss.jsx';
import VisitDetails from './Patient/visit_details.jsx';
import VisitEdit from './Patient/visit_details_edit.jsx';
import DataExport from './DocumentBackup/DataExport.jsx';
// import BackupReminder from './Component/Reminder.jsx';
import Chatbot from './Component/Chatbot.jsx';
import EditStaff from './Staff/Edit_staff.jsx';
import SearchEngine from './Patient/SearchEngine.jsx';
import ProfileCard from './Staff/staff_profile.jsx';
import StaffProfile from './Staff/staff_profile.jsx';



function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>      
        <Routes>
          <Route path ='/' element={<Login/>}></Route>
          <Route path ='/login' element={<Login/>}></Route>
          <Route path ='/forgotpassword' element={<ForgotPassword/>}></Route>
          <Route path ='/home' element={<ProtectedRoute element={<Home />} restrictedForSuperadmin={['/superadmin']}  />}></Route>          
          <Route path ='/backup' element={<ProtectedRoute element={<Backup/>}/>}></Route>          
          <Route path ='/search_engine' element={<ProtectedRoute element={<SearchEngine/>}/>}></Route>          
          <Route path ='/search_engine/patient_registration' element={<ProtectedRoute element={<PReg/>}/>}></Route>
          <Route path ='/patients_information' element={<ProtectedRoute element={<Patient/>}/>}></Route>
          <Route path ='/Register_staff' element={<ProtectedRoute element={<RegisterStaff/>} restrictedForSuperadmin={['/superadmin']} />}></Route>
          <Route path ='/staff_information' element={<ProtectedRoute element={<Staff/>} restrictedForSuperadmin={['/superadmin']} />}></Route>
          <Route path ='/edit_staff' element={<ProtectedRoute element={<EditStaff/>}/>}></Route>
          <Route path ='/staff_information/update_staff' element={<ProtectedRoute element={<UpdateStaff/>}/>}></Route>
          <Route path ='/patients_information/patient_profile' element={<ProtectedRoute element={<Profile/>}/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_about' element={<ProtectedRoute element={<About/>}/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_about/patient_edit' element={<ProtectedRoute element={<PEdit/>}/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_admission' element={<ProtectedRoute element={<Admission/>}/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_history' element={<ProtectedRoute element={<MedDetails/>}/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_history/patient_medicalhx_edit' element={<ProtectedRoute element={<MedHisEdit/>}/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_admission/new_admission' element={<ProtectedRoute element={<PAdd/>}/>}></Route>  
          <Route path ='/patients_information/patient_profile/patient_admission/patient_visit' element={<ProtectedRoute element={<Visit/>}/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_admission/patient_visit/visit_form' element={<ProtectedRoute element={<VisitForm/>}/>}></Route>        
          <Route path ='/patients_information/patient_profile/patient_admission/patient_visit/patient_admission_details_edit' element={<ProtectedRoute element={<AdEdit/>}/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_admission/patient_visit/visit_details' element={<ProtectedRoute element={<VisitDetails/>}/>}></Route>
          <Route path ='/patients_information/patient_profile/patient_admission/patient_visit/visit_details_edit' element={<ProtectedRoute element={<VisitEdit/>}/>}></Route>
          <Route path='/data_export' element={<ProtectedRoute element={<DataExport/>}/>}></Route>
          <Route path='/analysis' element={<ProtectedRoute element={<Analysis/>} />}></Route>
          <Route path='/chatbot' element={<ProtectedRoute element={<Chatbot/>}/>}></Route>
          <Route path='/staff_profile' element={<ProtectedRoute element={<StaffProfile/>}/>}></Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;