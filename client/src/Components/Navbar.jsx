import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from './assets/assets';
import { Menu, Search, X } from 'lucide-react';
import {useClerk,UserButton,useUser} from '@clerk/clerk-react'
import './navbar.css';

const Navbar = () => {
  const [isOpen,setIsOpen]=useState(false)
  const {user}=useUser()
  const {openSignIn}=useClerk()

  const navigate=useNavigate()

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={assets.logo} alt="GoCinemas Logo" className="logo-img" />
      </Link>

      <div className="navbar-links">
        <X className="close-icon" onClick={()=> setIsOpen(!isOpen)} />
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to="/">Home</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to="/movies">Movies</Link>
        <Link onClick={()=> {scrollTo(0,0); setIsOpen(false)}} to="/">My Tickets</Link>
      </div>

      <div className="navbar-actions">
        <Search className="search-icon" />
        {
          !user ? (
              <button onClick={openSignIn} className="login-btn">Login</button>
          ) : (
            <UserButton> 
              <UserButton.MenuItems>
                <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={()=> navigate('/my-bookings')} />
              </UserButton.MenuItems>
            </UserButton>
          )
        }
      </div>

      <Menu className="menu-icon" onClick={()=> setIsOpen(!isOpen)}/>
    </div>
  );
};

export default Navbar;
//when the website is working and shows everything, go to account settings(Clerk has this by default) and enable MUlti Session handling.