import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from './assets/assets';
import { Menu, Search, X } from 'lucide-react';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={assets.logo} alt="GoCinemas Logo" className="logo-img" />
      </Link>

      <div className="navbar-links">
        <X className="close-icon" />
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/">My Tickets</Link>
      </div>

      <div className="navbar-actions">
        <Search className="search-icon" />
        <button className="login-btn">Login</button>
      </div>

      <Menu className="menu-icon" />
    </div>
  );
};

export default Navbar;