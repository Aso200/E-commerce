import React from "react";
import { Link } from "react-router-dom";
import './Mainpage/Mainpage.css';

function Footer () {
    return (
        <div id='footern'>
            <Link id='footerLink' to="/kontakt">
            <h3>Kontakta oss</h3>
            </Link>
            <Link id='footerLink' to="/policy">
            <h3>Våran policy</h3>
            </Link>
            <Link id='footerLink' to="/donera">
            <h3>Donera till barn i nöd</h3>
            </Link>
        </div>
    );
}

export default Footer;