
import './App.css';
import {Login} from './login.jsx';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import React from 'react';
import PReg from './patient_registration.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
   <Routes>
    <Route path ='/' element={<Login/>}></Route>
    <Route path ='/patient_registration' element={<PReg/>}></Route>
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
