// App.jsx — Root component that sets up React Router navigation
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'

function App() {
  return (
    // BrowserRouter wraps the whole app so all pages can use routing
    <Router>
      <div className="app-wrapper">
        {/* Navbar appears on every page */}
        <Navbar />

        {/* Routes define which component renders for each URL */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </main>

        {/* Footer appears on every page */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
