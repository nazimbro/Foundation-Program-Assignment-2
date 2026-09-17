import { useEffect } from 'react'

export default function MovieModal({ movie, onClose }) {
  // Close on Escape, and lock body scroll while the modal is open.
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!movie) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-paper/10 bg-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {movie.poster ? (
            <img
              src={movie.poster}
              alt={`${movie.title} backdrop`}
              className="h-56 w-full object-cover sm:h-72"
            />
          ) : (
            <div className="flex h-40 w-full items-center justify-center bg-ink text-sm text-fog">
              No image available
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/80 text-paper transition-colors hover:bg-curtain"
          >
            ✕
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <h2 id="modal-title" className="font-display text-3xl font-extrabold leading-tight text-paper">
            {movie.title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-fog">
            <span>⭐ Rating: {movie.rating ?? 'N/A'}</span>
            <span>📅 Release: {movie.year}</span>
            <span>{movie.network}</span>
            <span className="text-marquee">{movie.status}</span>
          </div>

          {movie.genres.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-marquee/40 px-3 py-1 text-xs text-marquee"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-fog">
            Overview
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-paper/90">{movie.summary}</p>

          <button
            type="button"
            onClick={onClose}
            className="mt-8 rounded-sm border border-paper/20 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-curtain hover:text-curtain"
          >
            ❌ Close
          </button>
        </div>
      </div>
    </div>
  )
}
