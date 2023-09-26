import React from 'react';
import { Link } from 'react-router-dom';
import MiniCart from './Cart/MiniCart';
import './Mainpage/Mainpage.css';

function Header({ cart }) {
  return (
    
      <div id='header'>
        <div id='miniHeader'>
            <h2 id='h2Header'>MADAGASCAR.COM | SNABBLEVERANS - HEMLEVERANS - FRI FRAKT</h2>
              <div id='miniLinkar'>
              <Link id='inlogg' to="/login">
              <h3>Logga in</h3>
              </Link>

              <Link id='inlogg' to="/register">
              <h3>Registrera</h3>
              </Link>
              </div>
      </div>
    <Link to="/">
      <h1 id='titel'>Madagascar</h1>
      </Link>
      <div id='linksen'>
        
              <Link id='headerLink' to="/nyheter">
              <h3>Nyheter</h3>
              </Link>

              <Link id='headerLink' to="/Kategorier">
              <h3>Kategorier</h3>
              </Link>

              <Link id='headerLink' to="/rea">
              <h3>Rea</h3>
              </Link>
      </div>
      <MiniCart cart={cart} /> {/* Pass the cart prop to MiniCart */}

    </div>
    

  );
}

export default Header;