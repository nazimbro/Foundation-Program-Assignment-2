export default function MovieCard({ movie, onSelect }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-paper/10 bg-screen transition-colors hover:border-marquee/50">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-ink">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-4 text-center text-xs text-fog">
            No poster available
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 font-display text-lg font-bold leading-tight text-paper">
          {movie.title}
        </h3>
        <p className="flex items-center gap-3 text-xs text-fog">
          <span>⭐ {movie.rating ?? 'N/A'}</span>
          <span aria-hidden="true">•</span>
          <span>📅 {movie.year}</span>
        </p>

        <button
          type="button"
          onClick={() => onSelect(movie)}
          className="mt-auto pt-3 text-left text-sm font-medium text-marquee transition-colors hover:text-paper"
        >
          See details →
        </button>
      </div>
    </div>
  )
}
