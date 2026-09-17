import MovieCard from './MovieCard.jsx'

export default function MovieGrid({ movies, onSelect }) {
  if (movies.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-paper/15 py-20 text-center">
        <p className="text-lg font-medium text-paper">No titles found</p>
        <p className="mt-1 text-sm text-fog">Try a different title, or check the spelling.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
      ))}
    </div>
  )
}
