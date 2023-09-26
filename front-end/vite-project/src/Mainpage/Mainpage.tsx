import React from 'react';
import { Link } from 'react-router-dom';
import './Mainpage.css';
import heroImg from './heroImg.png';

function Mainpage() {
  return (
    <div>
    <div id='MainSidan'>
      
    </div>
    <div id='mainContent'>
  <div className="image-container">
    <img id='heroImg' src={heroImg} alt="Bilden kunde inte laddas" />
    <Link to="/products">
      <button id='butikButton'>Store</button>
    </Link>
  </div>
</div>
    </div>
  );
}

export default Mainpage;