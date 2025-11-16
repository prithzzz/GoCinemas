import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Menu, X, TicketPlus } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      {/* LOGO */}
      <Link to="/" className="navbar-logo">
        <img src={assets.logo} alt="GoCinemas Logo" className="logo-img" />
      </Link>

      {/* RIGHT SECTION: LINKS + LOGIN BUTTON */}
      <div className="navbar-actions">
        {/* NAV LINKS (now aligned beside Login) */}
        <div className="navbar-links desktop-only">
          <Link onClick={() => scrollTo(0, 0)} to="/">Home</Link>
          <Link onClick={() => scrollTo(0, 0)} to="/search">Movies</Link>
          <Link onClick={() => scrollTo(0, 0)} to="/my-bookings">My Tickets</Link>
        </div>

        {/* LOGIN / USER MENU */}
        {!user ? (
          <button onClick={openSignIn} className="login-btn">Login</button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
                onClick={() => navigate('/my-bookings')}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      {/* MOBILE MENU BUTTON */}
      <Menu className="menu-icon" onClick={() => setIsOpen(!isOpen)} />

      {/* MOBILE NAV LINKS */}
      <div className={`navbar-links mobile-menu ${isOpen ? 'open' : ''}`}>
        <X className="close-icon" onClick={() => setIsOpen(false)} />
        
        <Link onClick={() => { scrollTo(0,0); setIsOpen(false); }} to="/">Home</Link>
        <Link onClick={() => { scrollTo(0,0); setIsOpen(false); }} to="/search">Movies</Link>
        <Link onClick={() => { scrollTo(0,0); setIsOpen(false); }} to="/my-tickets">My Tickets</Link>
      </div>
    </div>
  );
};

export default Navbar;
