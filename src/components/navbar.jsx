import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from './images/logo.png';

function Navbar() {
  return (
    <nav>
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <ul>
        <li><a href="#">Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
