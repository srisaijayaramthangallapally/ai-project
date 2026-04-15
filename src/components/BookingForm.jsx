// components/BookingForm.jsx — Form to collect traveler details
import React, { useState } from 'react'
import './BookingForm.css'

// Props:
//   onSubmit(formData) — called when the form passes validation
function BookingForm({ onSubmit, loading }) {
  // formData stores all the field values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    travelers: '1',
    specialRequests: '',
  })

  // errors stores validation messages for each field
  const [errors, setErrors] = useState({})

  // Update a specific field when user types
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear the error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // ── Validation Function ────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {}

    if (!formData.firstName.trim())
      newErrors.firstName = 'First name is required'

    if (!formData.lastName.trim())
      newErrors.lastName = 'Last name is required'

    // Email must match basic format
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone: at least 7 digits
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s\-()]{7,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    return newErrors
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      // If errors exist, show them and don't proceed
      setErrors(validationErrors)
      return
    }

    // No errors — call parent callback with the form data
    onSubmit(formData)
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <h3 className="booking-form__title">Traveler Details</h3>

      {/* Name Row */}
      <div className="booking-form__row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-msg">⚠ {errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-msg">⚠ {errors.lastName}</span>}
        </div>
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-msg">⚠ {errors.email}</span>}
      </div>

      {/* Phone */}
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 000-0000"
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-msg">⚠ {errors.phone}</span>}
      </div>

      {/* Number of Travelers */}
      <div className="form-group">
        <label htmlFor="travelers">Number of Travelers</label>
        <select
          id="travelers"
          name="travelers"
          value={formData.travelers}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
          ))}
        </select>
      </div>

      {/* Special Requests (optional) */}
      <div className="form-group">
        <label htmlFor="specialRequests">Special Requests <span className="optional">(optional)</span></label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          placeholder="Any dietary requirements, accessibility needs, etc."
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn-primary booking-form__submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="btn-spinner"></span>
            Processing...
          </>
        ) : (
          'Confirm Booking →'
        )}
      </button>
    </form>
  )
}

export default BookingForm
