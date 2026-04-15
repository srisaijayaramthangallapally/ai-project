# ✦ Voyagr — Travel Booking System
A complete frontend travel booking system built with **React.js + Vite**.  
No backend required — uses mock data and `localStorage`.

---

## 🚀 Project Setup

### Prerequisites
- Node.js (v16 or above)
- npm or yarn

### Installation & Running

```bash
# 1. Unzip the project folder
cd travel-booking

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation bar (all pages)
│   ├── Navbar.css
│   ├── Footer.jsx          # Footer (all pages)
│   ├── Footer.css
│   ├── DestinationCard.jsx # Card for featured destinations (Home)
│   ├── DestinationCard.css
│   ├── ResultCard.jsx      # Card for hotel/flight results (Search)
│   ├── ResultCard.css
│   ├── BookingForm.jsx     # Traveler details form with validation
│   └── BookingForm.css
│
├── pages/
│   ├── Home.jsx            # Landing page with hero + search bar
│   ├── Home.css
│   ├── SearchResults.jsx   # Filtered results page
│   ├── SearchResults.css
│   ├── Booking.jsx         # Booking form + selected item summary
│   ├── Booking.css
│   ├── Confirmation.jsx    # Booking confirmation + fake booking ID
│   └── Confirmation.css
│
├── data/
│   └── travelData.js       # All mock data (hotels, flights, destinations)
│
├── styles/
│   └── global.css          # CSS variables, reset, shared utilities
│
├── App.jsx                 # Root component — sets up React Router
└── main.jsx                # Entry point — mounts React to DOM
```

---

## 🗺 Pages & Routes

| Route           | Page              | Description                          |
|-----------------|-------------------|--------------------------------------|
| `/`             | Home              | Hero, search bar, featured destinations |
| `/search`       | Search Results    | Filter & browse hotels/flights       |
| `/booking`      | Booking           | Fill in traveler details             |
| `/confirmation` | Confirmation      | Booking summary + fake booking ID    |

---

## 🔑 Key Concepts Used

| Concept         | Where Used                                      |
|-----------------|-------------------------------------------------|
| `useState`      | Search form, filters, form fields, loading state |
| `useEffect`     | Scroll listener, simulated loading, localStorage read |
| `useNavigate`   | Redirect after booking, back button             |
| `useSearchParams` | Read destination from URL query string        |
| `localStorage`  | Persist selected item + booking record          |
| React Router    | All page navigation                             |
| Form Validation | BookingForm.jsx — required fields, email/phone regex |

---

## ✅ Features Checklist

- [x] Home page with hero section and animated search bar
- [x] Featured destination cards with images
- [x] Search results with filter sidebar (type, price, rating, sort)
- [x] Loading spinner (simulated delay)
- [x] Hotel and flight result cards
- [x] Booking form with full validation
- [x] LocalStorage for booking persistence
- [x] Confirmation page with animated checkmark
- [x] Fake booking ID generator (e.g. `VYG-A3F2K9`)
- [x] Fully responsive design (mobile, tablet, desktop)
- [x] CSS animations (fade-up, checkmark draw, hover effects)

---

## 🎨 Design System

- **Fonts**: Playfair Display (headings) + DM Sans (body)
- **Theme**: Dark — deep navy/charcoal with warm gold accents
- **Colors**: Defined as CSS variables in `global.css`

---

## 📝 Notes for Exam

- All dummy data lives in `src/data/travelData.js` — easy to modify
- Each component is commented explaining its purpose and props
- No external UI libraries used — pure CSS + React
- `localStorage` keys: `selectedItem`, `bookingRecord`
