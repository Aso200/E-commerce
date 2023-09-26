import React from "react";
import { Link } from "react-router-dom";
import './Mainpage/Mainpage.css';

function Footer () {
    return (
        <div id='footern'>
            <Link id='footerLink' to="/Contact">
            <h3>Contact us</h3>
            </Link>
            <Link id='footerLink' to="/policy">
            <h3>Privacy Policy</h3>
            </Link>
            <Link id='footerLink' to="/About">
            <h3>About us</h3>
            </Link>
        </div>
    );
}

export default Footer;