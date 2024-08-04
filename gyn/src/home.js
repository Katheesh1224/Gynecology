import React from 'react';
import './home.css';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';

const Home = () =>{
      console.log("home rendered");
  return(
    <div className='wrapper'>
      <NavBar/>
      <div className='main-content'>
        <Nav/> 
        <div className='container'>
          <h1>Welcome to GYNECOLOGY Department</h1>
        </div>
      </div>
    </div>
  );

}
export default Home;

