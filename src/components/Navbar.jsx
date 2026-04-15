// components/Navbar.jsx — Top navigation bar shown on all pages
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  // Track whether user has scrolled down (to add background to navbar)
  const [scrolled, setScrolled] = useState(false)
  // Track if mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false)
  // useLocation gives us the current URL path
  const location = useLocation()

  // useEffect runs when component mounts — adds scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    // Cleanup: remove listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo / Brand */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">✦</span>
          Voyagr
        </Link>

        {/* Desktop Navigation Links */}
        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/search" className={location.pathname === '/search' ? 'active' : ''}>Explore</Link></li>
        </ul>

        {/* CTA Button */}
        <div className="navbar__actions">
          <Link to="/search" className="btn-primary navbar__cta">
            Book a Trip
          </Link>
          {/* Hamburger menu for mobile */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
