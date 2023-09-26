import React from "react";
import { Link } from "react-router-dom";
import './Mainpage/Mainpage.css';

function Footer () {
    return (
        <div id='footern'>
            <Link id='footerLink' to="/kontakt">
            <h3>Contact us</h3>
            </Link>
            <Link id='footerLink' to="/policy">
            <h3>Our policy</h3>
            </Link>
            <Link id='footerLink' to="/donera">
            <h3>Donate to kids in need</h3>
            </Link>
        </div>
    );
}

export default Footer;