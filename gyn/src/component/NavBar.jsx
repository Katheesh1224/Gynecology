import React from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import UserPath from './UserPath.jsx';


const NavBar = () =>{

    const navigate = useNavigate();

    const handleLogout = async () => {
      navigate('/');
        try {
          await axios.get('http://localhost:8081/logout');
          navigate('/');
        } catch (error) {
          console.error('Logout failed:', error);
        }
    };

    return(
        <nav class="navM">
            <div class="containerN">
                <h1 class="logo">
                <a href="/home" className='a' style={{justifyContent:'left'}}>GYNECOLOGY</a>
                </h1>
                <UserPath/>
                <ul>
                    <li><a href="./" class=""><FontAwesomeIcon icon={faUser} /></a></li>
                    <li>
                        <div>
                            <button onClick={handleLogout} class="buttonHome">Logout</button>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

export default NavBar;