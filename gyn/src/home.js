import React from 'react';
import './home.css';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';

const Home = () =>{
      
  return(
    <div className='homeContainer'> 
    <NavBar/>
    <Nav/> 
      <div>
        <h1>Welcome to GYNECOLOGY Department</h1>
      </div>
    </div>    
  );

}
export default Home;

