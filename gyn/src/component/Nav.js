import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRectangleList, faHospitalUser, faUser, faEye, faUserNurse} from '@fortawesome/free-solid-svg-icons'

const Nav = () =>{
    return(
        <header id="header" class="d-flex flex-column justify-content-center">
            <nav id="navbar" class="navbar nav-menu">
                <ul>
                <li><a href="home" class="nav-link scrollto active"><FontAwesomeIcon icon={faHouse} /><span>Home</span></a></li>
                <li><a href="patient_registration" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Patient Registration</span></a></li>
                <li><a href="Register_staff" class="nav-link scrollto"><FontAwesomeIcon icon={faRectangleList} /><span>Staff Registration</span></a></li>
                <li><a href="patients_information" class="nav-link scrollto"><FontAwesomeIcon icon={faHospitalUser} /> <span>Patient Information</span></a></li>
                <li><a href="patient_visit" class="nav-link scrollto"><FontAwesomeIcon icon={faEye} /><span>Visit</span></a></li>
                <li><a href="staff_information" class="nav-link scrollto"><FontAwesomeIcon icon={faUserNurse} /><span>Staff Information</span></a></li>
                </ul>
            </nav>
        </header>

    );

}
export default Nav;
