import React, {useContext} from 'react';
import {useNavigate } from 'react-router-dom';
import '../home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import UserPath from './UserPath.jsx';
import { AuthContext } from '../AuthContext.jsx';

const NavBar = () =>{
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout();
        navigate('/login');
    };

    return(
        <nav className="navM">
            <div className="containerN">
                <h1 className="logo">
                <a href="/home" className='a' style={{justifyContent:'left'}}>GYNECOLOGY</a>    
                </h1>
                <UserPath/>
                <ul>
                    <li><a href="./" className=""><FontAwesomeIcon icon={faUser} /></a></li>
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