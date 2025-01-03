import "../Styles/Footer.css"
import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>ExploreLanka</h4>
          <p>
            Your trusted travel partner to discover the breathtaking beauty of
            Sri Lanka.
          </p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/locations">Destinations</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: explorelanka@gmail.com</p>
          <p>Phone: +94 77 123 4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 ExploreLanka. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

