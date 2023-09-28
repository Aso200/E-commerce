import React from 'react';
import { Link } from 'react-router-dom';
import MiniCart from './Cart/MiniCart';
import './Mainpage/Mainpage.css';

function Header({ cart }) {
  
  const isUserLoggedIn = localStorage.getItem('userInformation');
  const handleLogout = () => {
    localStorage.removeItem('userInformation');
    window.location.reload();
  };

  return (
    <div id='header'>
      <div id='miniHeader'>
        <h2 id='h2Header'>MADAGASCAR.COM | FAST DELIVERY - HOME DELIVERY - FREE SHIPPING</h2>
        <div id='miniLinkarDiv'>
          {isUserLoggedIn ? (
            <div id='miniLinkar'>
              <Link id='inlogg' to="/dashboard">
            <h3>My Account</h3>
            </Link>
              <Link id='inlogg' to="/" onClick={handleLogout}>
                <h3>Logout</h3>
              </Link>
            </div>
          ) : (
            <>
              <Link id='inlogg' to="/login">
                <h3>Login</h3>
              </Link>
              <Link id='inlogg' to="/register">
                <h3>Register</h3>
              </Link>
            </>
          )}
        </div>
      </div>
      <Link to="/">
        <h1 id='titel'>Madagascar</h1>
      </Link>
      <div id='linksen'>
        <Link id='headerLink' to="/news">
          <h3>News</h3>
        </Link>
        <Link id='headerLink' to="/categories">
          <h3>Categories</h3>
        </Link>
        <Link id='headerLink' to="/outlet">
          <h3>Outlet</h3>
        </Link>
      </div>
      <MiniCart cart={cart} />
    </div>
  );
}

export default Header;



