// components/ResultCard.jsx — Card for hotel or flight in search results
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ResultCard.css'

// Props:
//   item — hotel or flight object from travelData.js
function ResultCard({ item }) {
  const navigate = useNavigate()

  // Save selected item to localStorage and go to booking page
  const handleSelect = () => {
    localStorage.setItem('selectedItem', JSON.stringify(item))
    navigate('/booking')
  }

  // Render a HOTEL card
  if (item.type !== 'flight') {
    return (
      <div className="result-card fade-up">
        <div className="result-card__img-wrap">
          <img src={item.image} alt={item.name} loading="lazy" />
          <span className="result-card__type badge badge-violet">
            {item.type}
          </span>
        </div>
        <div className="result-card__body">
          <div className="result-card__top">
            <div>
              <h3 className="result-card__name">{item.name}</h3>
              <p className="result-card__location">📍 {item.location}</p>
            </div>
            <div className="result-card__rating">
              <span className="stars">★</span>
              <span>{item.rating}</span>
              <span className="result-card__reviews">({item.reviews})</span>
            </div>
          </div>

          {/* Amenities list */}
          <div className="result-card__amenities">
            {item.amenities.map((a) => (
              <span key={a} className="amenity-tag">{a}</span>
            ))}
          </div>

          <div className="result-card__footer">
            <div className="result-card__price">
              <span className="price-amount">${item.price}</span>
              <span className="price-unit">/ night</span>
            </div>
            <button className="btn-primary" onClick={handleSelect}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render a FLIGHT card
  return (
    <div className="result-card result-card--flight fade-up">
      <div className="result-card__body">
        <div className="flight-card__top">
          <div className="flight-card__airline">
            <span className="flight-card__logo">{item.logo}</span>
            <div>
              <div className="flight-card__name">{item.airline}</div>
              <span className="badge badge-violet">{item.stops === 0 ? 'Non-stop' : `${item.stops} stop`}</span>
            </div>
          </div>
          <div className="result-card__rating">
            <span className="stars">★</span>
            <span>{item.rating}</span>
          </div>
        </div>

        {/* Flight route display */}
        <div className="flight-card__route">
          <div className="flight-card__time">
            <span className="time">{item.departure}</span>
            <span className="airport">{item.from}</span>
          </div>
          <div className="flight-card__line">
            <div className="flight-card__dot"></div>
            <div className="flight-card__dash"></div>
            <span className="flight-card__duration">{item.duration}</span>
            <div className="flight-card__dash"></div>
            <div className="flight-card__dot"></div>
          </div>
          <div className="flight-card__time flight-card__time--right">
            <span className="time">{item.arrival}</span>
            <span className="airport">{item.to}</span>
          </div>
        </div>

        <div className="result-card__footer">
          <div className="result-card__price">
            <span className="price-amount">${item.price}</span>
            <span className="price-unit">/ person</span>
          </div>
          <button className="btn-primary" onClick={handleSelect}>
            Book Flight
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultCard
