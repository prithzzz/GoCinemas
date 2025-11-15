import React from 'react';
import { ArrowRight, Calendar1Icon, ClockIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import { assets } from "../assets/assets";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-section">
      <img src={assets.marvelLogo} alt="Marvel Logo" className="hero-logo" />
      <h1 className="hero-title">
        Guardians <br /> of the Galaxy
      </h1>

      <div className="hero-info">
        <span>Action | Adventure | Sci-Fi</span>
        <div className="hero-info-item">
          <Calendar1Icon className="hero-icon" />
          <span>2018</span>
        </div>
        <div className="hero-info-item">
          <ClockIcon className="hero-icon" />
          <span>2h 8min</span>
        </div>
      </div>

      <p className="hero-description">para about movie</p>

      <button
        onClick={() => navigate('/search')}   
        className="hero-button"
      >
        Explore Movies
        <ArrowRight className="hero-button-icon" />
      </button>
    </div>
  );
};

export default HeroSection;
