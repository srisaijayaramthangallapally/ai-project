// pages/Confirmation.jsx — Shows booking confirmation with summary and fake booking ID
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Confirmation.css'

function Confirmation() {
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  // Controls the "pop-in" success animation
  const [showCheck, setShowCheck] = useState(false)

  // Load the booking record saved by Booking.jsx
  useEffect(() => {
    const stored = localStorage.getItem('bookingRecord')
    if (stored) {
      setBooking(JSON.parse(stored))
      // Trigger the checkmark animation after a short delay
      setTimeout(() => setShowCheck(true), 300)
    } else {
      // If no booking found, redirect home
      navigate('/')
    }
  }, [navigate])

  if (!booking) return null

  const { bookingId, item, traveler, bookingDate, totalPrice } = booking

  // Format the booking date nicely
  const formattedDate = new Date(bookingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="confirmation-page">
      <div className="container confirmation-page__inner">

        {/* ── Success Animation ──────────────────────────────────────────── */}
        <div className={`confirmation-check ${showCheck ? 'confirmation-check--visible' : ''}`}>
          <div className="confirmation-check__circle">
            <svg viewBox="0 0 52 52" className="confirmation-check__svg">
              <circle cx="26" cy="26" r="24" fill="none" />
              <path
                className="confirmation-check__mark"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                d="M14 27 L22 35 L38 19"
              />
            </svg>
          </div>
        </div>

        <h1 className="confirmation-page__heading">Booking Confirmed!</h1>
        <p className="confirmation-page__subheading">
          Your adventure is all set. We've sent a confirmation to{' '}
          <strong>{traveler.email}</strong>
        </p>

        {/* ── Booking ID Banner ─────────────────────────────────────────── */}
        <div className="booking-id-banner">
          <span className="booking-id-banner__label">Booking Reference</span>
          <span className="booking-id-banner__id">{bookingId}</span>
          <span className="booking-id-banner__hint">Save this ID for your records</span>
        </div>

        {/* ── Summary Cards ─────────────────────────────────────────────── */}
        <div className="confirmation-grid">

          {/* Travel Details */}
          <div className="confirmation-card">
            <h3 className="confirmation-card__title">✈ Travel Details</h3>
            <div className="confirmation-rows">
              <div className="confirmation-row">
                <span>Destination</span>
                <strong>{item.name || item.airline}</strong>
              </div>
              <div className="confirmation-row">
                <span>Location</span>
                <strong>{item.location || `${item.from} → ${item.to}`}</strong>
              </div>
              {item.type === 'flight' && (
                <>
                  <div className="confirmation-row">
                    <span>Departure</span>
                    <strong>{item.departure}</strong>
                  </div>
                  <div className="confirmation-row">
                    <span>Arrival</span>
                    <strong>{item.arrival}</strong>
                  </div>
                  <div className="confirmation-row">
                    <span>Duration</span>
                    <strong>{item.duration}</strong>
                  </div>
                </>
              )}
              <div className="confirmation-row">
                <span>Type</span>
                <strong className="badge badge-violet" style={{ textTransform: 'capitalize' }}>
                  {item.type}
                </strong>
              </div>
            </div>
          </div>

          {/* Traveler Details */}
          <div className="confirmation-card">
            <h3 className="confirmation-card__title">👤 Traveler Details</h3>
            <div className="confirmation-rows">
              <div className="confirmation-row">
                <span>Name</span>
                <strong>{traveler.firstName} {traveler.lastName}</strong>
              </div>
              <div className="confirmation-row">
                <span>Email</span>
                <strong>{traveler.email}</strong>
              </div>
              <div className="confirmation-row">
                <span>Phone</span>
                <strong>{traveler.phone}</strong>
              </div>
              <div className="confirmation-row">
                <span>Travelers</span>
                <strong>{traveler.travelers} {Number(traveler.travelers) === 1 ? 'Person' : 'People'}</strong>
              </div>
              {traveler.specialRequests && (
                <div className="confirmation-row">
                  <span>Requests</span>
                  <strong>{traveler.specialRequests}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="confirmation-card confirmation-card--wide">
            <h3 className="confirmation-card__title">💳 Payment Summary</h3>
            <div className="confirmation-rows">
              <div className="confirmation-row">
                <span>Booking Date</span>
                <strong>{formattedDate}</strong>
              </div>
              <div className="confirmation-row">
                <span>Base Price</span>
                <strong>${item.price} / {item.type === 'flight' ? 'person' : 'night'}</strong>
              </div>
              <div className="confirmation-row">
                <span>Taxes & Fees (12%)</span>
                <strong>${Math.round(totalPrice * 0.12)}</strong>
              </div>
              <div className="confirmation-row confirmation-row--total">
                <span>Total Charged</span>
                <strong>${totalPrice + Math.round(totalPrice * 0.12)}</strong>
              </div>
            </div>
          </div>

        </div>

        {/* ── Action Buttons ─────────────────────────────────────────────── */}
        <div className="confirmation-actions">
          <Link to="/" className="btn-primary">
            ✦ Book Another Trip
          </Link>
          <button
            className="btn-secondary"
            onClick={() => window.print()}
          >
            🖨 Print Confirmation
          </button>
        </div>

      </div>
    </div>
  )
}

export default Confirmation
