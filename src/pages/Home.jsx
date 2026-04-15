// pages/Home.jsx — The main landing page
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import { featuredDestinations } from '../data/travelData'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  // State for the search bar inputs
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    travelers: '2',
  })

  // Update search state when any input changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target
    setSearchData((prev) => ({ ...prev, [name]: value }))
  }

  // Navigate to search results with query params
  const handleSearch = (e) => {
    e.preventDefault()
    // Build a query string from the search inputs
    const params = new URLSearchParams({
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      travelers: searchData.travelers,
    })
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className="home">

      {/* ── HERO SECTION ────────────────────────────────────────────────── */}
      <section className="hero">
        {/* Background gradient blobs for atmosphere */}
        <div className="hero__blob hero__blob--1"></div>
        <div className="hero__blob hero__blob--2"></div>

        <div className="container hero__content">
          <div className="hero__badge badge badge-gold">✦ Award-Winning Travel Platform</div>

          <h1 className="hero__title">
            Wander Further,<br />
            <span className="hero__title-accent">Live Deeper</span>
          </h1>

          <p className="hero__subtitle">
            Curated escapes to the world's most extraordinary places.
            Effortless booking. Unforgettable memories.
          </p>

          {/* ── Search Bar ──────────────────────────────────────────────── */}
          <form className="search-bar" onSubmit={handleSearch}>
            <div className="search-bar__field">
              <label>🗺 Destination</label>
              <input
                type="text"
                name="destination"
                value={searchData.destination}
                onChange={handleSearchChange}
                placeholder="Where to?"
              />
            </div>

            <div className="search-bar__divider"></div>

            <div className="search-bar__field">
              <label>📅 Check In</label>
              <input
                type="date"
                name="checkIn"
                value={searchData.checkIn}
                onChange={handleSearchChange}
              />
            </div>

            <div className="search-bar__divider"></div>

            <div className="search-bar__field">
              <label>📅 Check Out</label>
              <input
                type="date"
                name="checkOut"
                value={searchData.checkOut}
                onChange={handleSearchChange}
              />
            </div>

            <div className="search-bar__divider"></div>

            <div className="search-bar__field">
              <label>👤 Travelers</label>
              <select
                name="travelers"
                value={searchData.travelers}
                onChange={handleSearchChange}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="search-bar__btn btn-primary">
              Search
            </button>
          </form>

          {/* Quick stats */}
          <div className="hero__stats">
            <div className="hero__stat"><strong>50K+</strong><span>Happy Travelers</span></div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat"><strong>120+</strong><span>Destinations</span></div>
            <div className="hero__stat-divider"></div>
            <div className="hero__stat"><strong>4.9 ★</strong><span>Average Rating</span></div>
          </div>
        </div>
      </section>

      {/* ── FEATURED DESTINATIONS ────────────────────────────────────────── */}
      <section className="destinations container">
        <div className="destinations__header">
          <div>
            <h2 className="section-title">Featured Destinations</h2>
            <p className="section-subtitle">Hand-picked escapes for every kind of traveler</p>
          </div>
          <button className="btn-secondary" onClick={() => navigate('/search')}>
            View All →
          </button>
        </div>

        {/* Grid of destination cards */}
        <div className="destinations__grid">
          {featuredDestinations.map((dest, index) => (
            <div
              key={dest.id}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <DestinationCard destination={dest} />
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY VOYAGR SECTION ───────────────────────────────────────────── */}
      <section className="features container">
        <h2 className="section-title" style={{ textAlign: 'center' }}>Why Voyagr?</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '48px' }}>
          We handle the details so you can focus on the journey
        </p>

        <div className="features__grid">
          {[
            { icon: '🔒', title: 'Secure Booking', desc: 'Your payment and personal data protected end-to-end.' },
            { icon: '🌍', title: 'Global Reach', desc: 'Hotels, flights and experiences in 120+ countries.' },
            { icon: '💬', title: '24/7 Support', desc: 'Real humans ready to help whenever you need us.' },
            { icon: '✨', title: 'Best Price', desc: 'Price match guarantee on all our listed properties.' },
          ].map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-card__icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home
