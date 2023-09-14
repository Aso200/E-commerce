import React from 'react';
import { Link } from 'react-router-dom';

function Mainpage() {
  return (
    <div>
      <h1>Main Page</h1>
      <p>START SIDA AAAAAAAAAAHHHHHHHHHHHHH.</p>
      <Link to="/products">
        <button>Gå till produkt sidan</button>
      </Link>
    </div>
  );
}

export default Mainpage;
