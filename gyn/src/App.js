import './App.css';
import Login from './login.jsx';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import React from 'react';
import PReg from './patient_registration.jsx';
import Home from './home.js';
import Register_staff from './Register_staff.js';
import Patient from './patient_person.js';
import Patient_details from './patient_details.jsx';
import Profile from './patient_profile.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
   <Routes>
    <Route path ='/' element={<Login/>}></Route>
    <Route path ='/patient_registration' element={<PReg/>}></Route>
    <Route path ='/home' element={<Home/>}></Route>
    <Route path ='/Register_staff' element={<Register_staff/>}></Route>
    <Route path ='/patient_person' element={<Patient/>}></Route>
    <Route path ='/patient_details' element={<Patient_details/>}></Route>
    <Route path ='/patient_profile' element={<Profile/>}></Route>
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
