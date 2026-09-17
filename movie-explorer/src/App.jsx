import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import MovieListing from './pages/MovieListing.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-ink font-body text-paper">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieListing />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
