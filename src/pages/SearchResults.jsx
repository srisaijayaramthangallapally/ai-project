// pages/SearchResults.jsx — Shows filtered hotels and flights
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ResultCard from '../components/ResultCard'
import { hotels, flights } from '../data/travelData'
import './SearchResults.css'

function SearchResults() {
  // useSearchParams lets us read URL query params like ?destination=Bali&type=flight
  const [searchParams] = useSearchParams()
  const destination = searchParams.get('destination') || ''
  const typeParam = searchParams.get('type') || 'all' // read ?type= from URL

  // All results combined (hotels + flights)
  const allResults = [...hotels, ...flights]

  // ── Filter State — pre-fill type from URL if provided ────────────────────
  const [filters, setFilters] = useState({
    type: typeParam,   // pre-selects 'flight' if URL has ?type=flight
    maxPrice: 1000,    // raised so all results show by default
    minRating: 0,
    sortBy: 'rating',
  })

  // ── Loading State (simulates a network request) ───────────────────────────
  const [loading, setLoading] = useState(true)

  // useEffect runs on mount — simulates a 1.2s API delay
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer) // cleanup on unmount
  }, [])

  // ── Filtering Logic ───────────────────────────────────────────────────────
  const filteredResults = allResults
    .filter((item) => {
      // Filter by type
      if (filters.type !== 'all' && item.type !== filters.type) return false
      // Filter by max price
      if (item.price > filters.maxPrice) return false
      // Filter by minimum rating
      if (item.rating < filters.minRating) return false
      // Filter by destination — search across ALL fields so "Kyoto" matches "Kyoto, Japan"
      if (destination && destination.length >= 3) {
        const dest = destination.toLowerCase()
        const searchableText = [
          item.name || '',
          item.location || '',
          item.airline || '',
          item.from || '',
          item.to || '',
        ].join(' ').toLowerCase()
        if (!searchableText.includes(dest)) {
          return false
        }
      }
      return true
    })
    .sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price
      if (filters.sortBy === 'price-high') return b.price - a.price
      return b.rating - a.rating // default: sort by rating
    })

  // Update a single filter value
  const handleFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="search-results">
      <div className="container search-results__layout">

        {/* ── SIDEBAR FILTERS ───────────────────────────────────────────── */}
        <aside className="filters-panel">
          <h3 className="filters-panel__title">Filters</h3>

          {/* Type Filter */}
          <div className="filter-group">
            <label className="filter-label">Type</label>
            <div className="filter-pills">
              {['all', 'hotel', 'flight', 'villa', 'lodge', 'resort', 'riad'].map((t) => (
                <button
                  key={t}
                  className={`filter-pill ${filters.type === t ? 'active' : ''}`}
                  onClick={() => handleFilter('type', t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Slider */}
          <div className="filter-group">
            <label className="filter-label">
              Max Price: <strong>${filters.maxPrice}</strong>
            </label>
            <input
              type="range"
              min="50"
              max="1000"
              step="10"
              value={filters.maxPrice}
              onChange={(e) => handleFilter('maxPrice', Number(e.target.value))}
              className="price-slider"
            />
            <div className="slider-labels">
              <span>$50</span>
              <span>$1000</span>
            </div>
          </div>

          {/* Min Rating */}
          <div className="filter-group">
            <label className="filter-label">Minimum Rating</label>
            <div className="filter-pills">
              {[0, 4.0, 4.5, 4.7].map((r) => (
                <button
                  key={r}
                  className={`filter-pill ${filters.minRating === r ? 'active' : ''}`}
                  onClick={() => handleFilter('minRating', r)}
                >
                  {r === 0 ? 'Any' : `${r}+ ★`}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              className="filter-select"
              value={filters.sortBy}
              onChange={(e) => handleFilter('sortBy', e.target.value)}
            >
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            className="btn-secondary filter-reset"
            onClick={() => setFilters({ type: 'all', maxPrice: 1000, minRating: 0, sortBy: 'rating' })}
          >
            Reset Filters
          </button>
        </aside>

        {/* ── RESULTS AREA ─────────────────────────────────────────────── */}
        <div className="results-area">

          {/* Header row */}
          <div className="results-area__header">
            <div>
              <h2 className="results-area__title">
                {destination ? `Results for "${destination}"` : 'All Destinations'}
              </h2>
              <p className="results-area__count">
                {loading ? '...' : `${filteredResults.length} options found`}
              </p>
            </div>
          </div>

          {/* Loading spinner */}
          {loading && (
            <div className="spinner-wrapper">
              <div className="spinner"></div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Searching for the best options...
              </p>
            </div>
          )}

          {/* No results message */}
          {!loading && filteredResults.length === 0 && (
            <div className="no-results">
              <span className="no-results__icon">🔍</span>
              <h3>No results found</h3>
              <p>Try adjusting your filters or searching a different destination.</p>
            </div>
          )}

          {/* Results grid */}
          {!loading && (
            <div className="results-grid">
              {filteredResults.map((item, index) => (
                <div
                  key={item.id}
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  <ResultCard item={item} />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default SearchResults
