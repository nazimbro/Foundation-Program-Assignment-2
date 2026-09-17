// Thin wrapper around the TVMaze API (https://www.tvmaze.com/api).
// TVMaze is used because it's free, requires no API key, and allows
// browser-side requests (CORS enabled) — ideal for a client-only app.

const BASE_URL = 'https://api.tvmaze.com'

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`)
  if (!response.ok) {
    throw new Error(`TVMaze request failed (${response.status}) for ${path}`)
  }
  return response.json()
}

/**
 * Fetch the full show catalogue.
 * GET /shows
 */
export async function getAllShows() {
  return request('/shows')
}

/**
 * Search shows by title. TVMaze returns each match wrapped as
 * { score, show }, so we unwrap it into a flat array of shows.
 * GET /search/shows?q=:query
 */
export async function searchShows(query) {
  if (!query || !query.trim()) return []
  const results = await request(`/search/shows?q=${encodeURIComponent(query.trim())}`)
  return results.map((result) => result.show)
}

/**
 * Fetch a single show's full detail by id (used to make sure the
 * modal always has the richest data available, including genres).
 * GET /shows/:id
 */
export async function getShowById(id) {
  return request(`/shows/${id}`)
}

/**
 * Normalize a TVMaze show object into the shape the UI needs, since
 * fields like image, rating, and premiere date can be null.
 */
export function normalizeShow(show) {
  return {
    id: show.id,
    title: show.name,
    poster:
      show.image?.original ||
      show.image?.medium ||
      null,
    year: show.premiered ? show.premiered.slice(0, 4) : 'TBA',
    rating: show.rating?.average ?? null,
    summary: show.summary
      ? show.summary.replace(/<[^>]+>/g, '') // strip TVMaze's HTML tags
      : 'No overview available for this title yet.',
    genres: show.genres || [],
    network: show.network?.name || show.webChannel?.name || 'Unknown network',
    status: show.status || 'Unknown',
  }
}
