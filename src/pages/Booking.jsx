// pages/Booking.jsx — Booking page with selected item details + booking form
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BookingForm from '../components/BookingForm'
import './Booking.css'

function Booking() {
  const navigate = useNavigate()

  // ── Load Selected Item from localStorage ─────────────────────────────────
  // This was saved in ResultCard when the user clicked "Book Now"
  const [selectedItem, setSelectedItem] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('selectedItem')
    if (stored) {
      setSelectedItem(JSON.parse(stored))
    } else {
      // If nothing is selected, redirect back to search
      navigate('/search')
    }
  }, [navigate])

  // ── Handle Form Submission ────────────────────────────────────────────────
  const handleBookingSubmit = (formData) => {
    setLoading(true)

    // Simulate a 1.5s processing delay
    setTimeout(() => {
      // Generate a random fake booking ID (e.g. VYG-A3F2K9)
      const bookingId = 'VYG-' + Math.random().toString(36).substring(2, 8).toUpperCase()

      // Build the complete booking record
      const bookingRecord = {
        bookingId,
        item: selectedItem,
        traveler: formData,
        bookingDate: new Date().toISOString(),
        totalPrice: selectedItem.price * Number(formData.travelers),
      }

      // Save booking to localStorage so Confirmation page can read it
      localStorage.setItem('bookingRecord', JSON.stringify(bookingRecord))

      setLoading(false)
      // Navigate to the confirmation page
      navigate('/confirmation')
    }, 1500)
  }

  // Don't render until item is loaded
  if (!selectedItem) return null

  // Calculate a sample total (price × number of nights/travelers)
  const nights = selectedItem.type === 'flight' ? 1 : 3
  const estimatedTotal = selectedItem.price * nights

  return (
    <div className="booking-page">
      <div className="container booking-page__layout">

        {/* ── LEFT: Booking Form ────────────────────────────────────────── */}
        <div className="booking-page__form-col">
          <div className="booking-page__back" onClick={() => navigate(-1)}>
            ← Back to Results
          </div>
          <BookingForm onSubmit={handleBookingSubmit} loading={loading} />
        </div>

        {/* ── RIGHT: Selected Item Summary ─────────────────────────────── */}
        <aside className="booking-summary">
          <h3 className="booking-summary__title">Your Selection</h3>

          {/* Image */}
          {selectedItem.image && (
            <img
              src={selectedItem.image}
              alt={selectedItem.name || selectedItem.airline}
              className="booking-summary__img"
            />
          )}

          {/* Item Details */}
          <div className="booking-summary__details">
            <h4 className="booking-summary__name">
              {selectedItem.name || selectedItem.airline}
            </h4>
            <p className="booking-summary__location">
              📍 {selectedItem.location || `${selectedItem.from} → ${selectedItem.to}`}
            </p>

            {/* Rating */}
            <div className="booking-summary__rating">
              <span className="stars">★</span>
              <span>{selectedItem.rating}</span>
              {selectedItem.reviews && (
                <span className="booking-summary__reviews">({selectedItem.reviews} reviews)</span>
              )}
            </div>

            {/* Flight-specific details */}
            {selectedItem.type === 'flight' && (
              <div className="booking-summary__flight-info">
                <div className="flight-info-row">
                  <span>Departure</span>
                  <strong>{selectedItem.departure}</strong>
                </div>
                <div className="flight-info-row">
                  <span>Arrival</span>
                  <strong>{selectedItem.arrival}</strong>
                </div>
                <div className="flight-info-row">
                  <span>Duration</span>
                  <strong>{selectedItem.duration}</strong>
                </div>
                <div className="flight-info-row">
                  <span>Stops</span>
                  <strong>{selectedItem.stops === 0 ? 'Non-stop' : `${selectedItem.stops} stop`}</strong>
                </div>
              </div>
            )}

            {/* Hotel amenities */}
            {selectedItem.amenities && (
              <div className="booking-summary__amenities">
                {selectedItem.amenities.map((a) => (
                  <span key={a} className="amenity-tag">{a}</span>
                ))}
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="booking-summary__price-box">
            <div className="price-row">
              <span>${selectedItem.price} × {nights} {selectedItem.type === 'flight' ? 'ticket' : 'nights'}</span>
              <span>${estimatedTotal}</span>
            </div>
            <div className="price-row">
              <span>Taxes & Fees</span>
              <span>${Math.round(estimatedTotal * 0.12)}</span>
            </div>
            <div className="price-row price-row--total">
              <span>Total</span>
              <span>${estimatedTotal + Math.round(estimatedTotal * 0.12)}</span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="booking-summary__trust">
            <span>🔒 Secure Payment</span>
            <span>✅ Free Cancellation</span>
          </div>
        </aside>

      </div>
    </div>
  )
}

export default Booking
