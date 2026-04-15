// components/DestinationCard.jsx — Card shown for each featured destination
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './DestinationCard.css'

// Props: destination object from travelData.js
function DestinationCard({ destination }) {
  const navigate = useNavigate()

  // When user clicks "Explore", go to search results for this destination
  const handleExplore = () => {
    navigate(`/search?destination=${encodeURIComponent(destination.name)}`)
  }

  return (
    <div className="dest-card fade-up">
      {/* Image with overlay */}
      <div className="dest-card__img-wrap">
        <img
          src={destination.image}
          alt={destination.name}
          className="dest-card__img"
          loading="lazy"
        />
        <div className="dest-card__overlay"></div>
        {/* Tag badge on image */}
        <span className="dest-card__tag badge badge-gold">{destination.tag}</span>
      </div>

      {/* Card body */}
      <div className="dest-card__body">
        <div className="dest-card__header">
          <div>
            <h3 className="dest-card__name">{destination.name}</h3>
            <p className="dest-card__country">📍 {destination.country}</p>
          </div>
          <div className="dest-card__rating">
            <span className="stars">★</span>
            <span>{destination.rating}</span>
          </div>
        </div>

        <p className="dest-card__desc">{destination.description}</p>

        <div className="dest-card__footer">
          <div className="dest-card__price">
            <span className="dest-card__price-from">from</span>
            <span className="dest-card__price-amount">${destination.price}</span>
            <span className="dest-card__price-unit">/ person</span>
          </div>
          <button className="btn-primary dest-card__btn" onClick={handleExplore}>
            Explore →
          </button>
        </div>
      </div>
    </div>
  )
}

export default DestinationCard
