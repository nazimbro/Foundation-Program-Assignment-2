import { Link } from 'react-router-dom'

// Decorative sprocket-hole strip evoking a filmstrip edge.
function Sprockets() {
  return (
    <div className="filmstrip flex gap-3 overflow-hidden opacity-60" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, i) => (
        <span key={i} className="h-2.5 w-2.5 flex-shrink-0 rounded-[2px] bg-marquee/40" />
      ))}
    </div>
  )
}

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Radial glow standing in for stage lighting, kept subtle and singular */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #E3A857 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <Sprockets />

        <div className="mt-10 max-w-2xl">
          <p className="text-sm font-medium text-curtain">Now showing, everywhere</p>
          <h1 className="mt-3 font-display text-6xl font-extrabold leading-[0.95] tracking-tightest text-paper sm:text-7xl">
            Find your next
            <br />
            <span className="text-marquee">favorite film.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-fog">
            Marquee pulls together thousands of titles in one place, so you can
            search by name, size up the ratings, and get the full story before
            you press play.
          </p>

          <Link
            to="/movies"
            className="mt-9 inline-flex items-center gap-2 rounded-sm bg-marquee px-7 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            Explore now
          </Link>
        </div>

        <div className="mt-14">
          <Sprockets />
        </div>
      </div>
    </section>
  )
}
