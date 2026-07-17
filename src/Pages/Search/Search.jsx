import './Search.css'
import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { searchMovies } from '../../utils/movies'
import { useApp } from '../../context/AppContext'

const Search = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { openMovieModal } = useApp()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)

  const results = useMemo(() => searchMovies(query), [query])

  const handleSubmit = (event) => {
    event.preventDefault()
    setSearchParams(query ? { q: query } : {})
  }

  return (
    <div className="search-page">
      <Navbar />
      <main className="search-main">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search titles, genres, descriptions..."
            aria-label="Search movies"
            autoFocus
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {!query.trim() ? (
          <p className="search-empty">Start typing to search the catalog.</p>
        ) : results.length === 0 ? (
          <p className="search-empty">No results found for &ldquo;{query}&rdquo;.</p>
        ) : (
          <div className="search-results">
            <h1>{results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</h1>
            <div className="search-grid">
              {results.map((movie) => (
                <button
                  key={movie.id}
                  className="search-card"
                  onClick={() => openMovieModal(movie)}
                >
                  <img
                    src={movie.posterMedium || movie.posterLarge}
                    alt={movie.title}
                    loading="lazy"
                  />
                  <div className="search-card-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}{movie.genres?.length ? ` · ${movie.genres.slice(0, 2).join(', ')}` : ''}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <button className="search-back btn btn-secondary" onClick={() => navigate('/')}>
          Back to Browse
        </button>
      </main>
      <Footer />
    </div>
  )
}

export default Search
