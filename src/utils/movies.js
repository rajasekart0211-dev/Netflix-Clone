import moviesData from '../Data/movies-full.json'

export const CATEGORIES = [
  { key: 'new', title: 'Popular on Netflix' },
  { key: 'avengers', title: 'Blockbuster Movies' },
  { key: 'dark', title: 'Only on Netflix' },
  { key: 'action', title: 'Upcoming' },
  { key: 'love', title: 'Top Picks for You' },
]

export function getAllMovies() {
  return Object.values(moviesData).flat()
}

export function getMoviesByCategory(category) {
  return moviesData[category] || []
}

export function getMovieById(id) {
  const numericId = Number(id)
  return getAllMovies().find((movie) => movie.id === numericId) || null
}

export function searchMovies(query) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return []

  return getAllMovies().filter((movie) => {
    const titleMatch = movie.title?.toLowerCase().includes(normalized)
    const descMatch = movie.description?.toLowerCase().includes(normalized)
    const genreMatch = movie.genres?.some((genre) =>
      genre.toLowerCase().includes(normalized)
    )
    return titleMatch || descMatch || genreMatch
  })
}

export function getFeaturedMovie() {
  const all = getAllMovies()
  return all.find((movie) => movie.trailer) || all[0]
}

export function getEmbedUrl(url) {
  if (!url) return null

  if (url.includes('youtube.com/watch')) {
    const videoId = url.split('v=')[1]?.split('&')[0]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  if (url.includes('youtu.be')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  return null
}

export default moviesData
