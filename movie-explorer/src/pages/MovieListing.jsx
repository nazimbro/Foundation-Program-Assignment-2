import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import MovieModal from '../components/MovieModal.jsx'
import { getAllShows, searchShows, normalizeShow } from '../api/tvmaze.js'

export default function MovieListing() {
  const [query, setQuery] = useState('')
  const [allMovies, setAllMovies] = useState([])
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)

  // Initial load: the full catalogue, shown when there's no search query.
  useEffect(() => {
    let isMounted = true
    setLoading(true)
    getAllShows()
      .then((shows) => {
        if (!isMounted) return
        const normalized = shows.map(normalizeShow)
        setAllMovies(normalized)
        setMovies(normalized)
        setError(null)
      })
      .catch(() => {
        if (isMounted) setError('Could not load movies right now. Please try again shortly.')
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  // Debounced search: re-queries the API as the user types, and falls
  // back to the cached full catalogue once the query is cleared.
  useEffect(() => {
    if (!query.trim()) {
      setMovies(allMovies)
      setError(null)
      return
    }

    setLoading(true)
    const timeoutId = setTimeout(() => {
      searchShows(query)
        .then((shows) => {
          setMovies(shows.map(normalizeShow))
          setError(null)
        })
        .catch(() => setError('Search failed. Please try again.'))
        .finally(() => setLoading(false))
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [query, allMovies])

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <h1 className="font-display text-4xl font-extrabold tracking-tightest text-paper">
        Browse movies
      </h1>
      <p className="mt-2 text-sm text-fog">
        Search by title, or scroll the full catalogue below.
      </p>

      <div className="mt-8 max-w-xl">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="mt-10">
        {error && (
          <p className="mb-6 rounded-sm border border-curtain/50 bg-curtain/10 px-4 py-3 text-sm text-paper">
            {error}
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] animate-pulse rounded-sm bg-screen" />
            ))}
          </div>
        ) : (
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        )}
      </div>

      {selectedMovie && (
  <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
)}
    </main>
  )
}
