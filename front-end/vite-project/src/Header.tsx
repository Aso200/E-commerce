import React from 'react';
import { Link } from 'react-router-dom';
import MiniCart from './Cart/MiniCart';

function Header({ cart }) {
  return (
    <div>
      <div style={{ 
        width: "100%", 
        backgroundColor: "#080D38",
    }}>
        .
    </div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h2 style={{ cursor: "pointer", color: "black" }}>Madagascar</h2>
      </Link>
      <MiniCart cart={cart} /> {/* Pass the cart prop to MiniCart */}
    </div>
  );
}

export default Header;
