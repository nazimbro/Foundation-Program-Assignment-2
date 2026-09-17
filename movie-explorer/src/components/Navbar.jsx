import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkClasses = ({ isActive }) =>
    `text-sm tracking-wide transition-colors hover:text-marquee ${
      isActive ? 'text-marquee' : 'text-paper/80'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-paper/10 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold tracking-tight text-paper">
            MAR<span className="text-marquee">QUEE</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink to="/" className={linkClasses} end>
            Home
          </NavLink>
          <NavLink to="/movies" className={linkClasses}>
            Movies
          </NavLink>
          <Link
            to="/movies"
            className="hidden rounded-sm border border-marquee px-4 py-1.5 text-sm font-medium text-marquee transition-colors hover:bg-marquee hover:text-ink sm:inline-block"
          >
            Explore
          </Link>
        </nav>
      </div>
    </header>
  )
}
