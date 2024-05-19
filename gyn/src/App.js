import './App.css';
import Login from './login.jsx';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import React from 'react';
import PReg from './patient_registration.jsx';
import Home from './home.js';
import Register_staff from './Register_staff.js';
import Patient from './patients_information.jsx';
import About from './patient_about.jsx';
import Profile from './patient_profile.jsx';
import Visit from './visit_form.jsx';
import Day from './patient_day.jsx';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
   <Routes>
    <Route path ='/' element={<Login/>}></Route>
    <Route path ='/patient_registration' element={<PReg/>}></Route>
    <Route path ='/home' element={<Home/>}></Route>
    <Route path ='/Register_staff' element={<Register_staff/>}></Route>
    <Route path ='/patients_information' element={<Patient/>}></Route>
    <Route path ='/patient_about' element={<About/>}></Route>
    <Route path ='/patient_profile/:id' element={<Profile/>}></Route>
    <Route path ='/patient_visit' element={<Visit/>}></Route>
    <Route path ='/patient_day' element={<Day/>}></Route>
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
