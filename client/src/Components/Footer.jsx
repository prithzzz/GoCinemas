import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">
          Copyright {new Date().getFullYear()} © GoCinemas. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
