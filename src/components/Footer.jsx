// components/Footer.jsx — Footer shown on all pages
import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Brand Column */}
        <div className="footer__brand">
          <div className="footer__logo">
            <span>✦</span> Voyagr
          </div>
          <p className="footer__tagline">
            Discover the world, one extraordinary journey at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Find Hotels</Link></li>
            <li><Link to="/search">Find Flights</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="footer__col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Cancellations</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <p>© {currentYear} Voyagr. Built for educational purposes.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
