import './MovieModal.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { getEmbedUrl } from '../../utils/movies'
import Play from '../../assets/play_icon.png'

const MovieModal = () => {
  const navigate = useNavigate()
  const { selectedMovie, closeMovieModal, toggleMyList, isInMyList } = useApp()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMovieModal()
    }

    if (selectedMovie) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedMovie, closeMovieModal])

  if (!selectedMovie) return null

  const embedUrl = getEmbedUrl(selectedMovie.trailer)
  const inList = isInMyList(selectedMovie.id)

  const handlePlay = () => {
    closeMovieModal()
    navigate(`/player/${selectedMovie.id}`)
  }

  return (
    <div className="movie-modal" role="dialog" aria-modal="true" aria-labelledby="movie-modal-title">
      <button className="movie-modal-backdrop" onClick={closeMovieModal} aria-label="Close movie details" />
      <div className="movie-modal-content">
        <button className="movie-modal-close" onClick={closeMovieModal} aria-label="Close">
          ×
        </button>

        <div className="movie-modal-media">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={`${selectedMovie.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              src={selectedMovie.posterLarge || selectedMovie.posterMedium}
              alt={selectedMovie.title}
              className="movie-modal-poster"
            />
          )}
          <div className="movie-modal-gradient" />
        </div>

        <div className="movie-modal-body">
          <h2 id="movie-modal-title">{selectedMovie.title}</h2>

          <div className="movie-modal-meta">
            {selectedMovie.year && <span>{selectedMovie.year}</span>}
            {selectedMovie.runtime && <span>{selectedMovie.runtime} min</span>}
            {selectedMovie.genres?.slice(0, 3).map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>

          <p className="movie-modal-description">{selectedMovie.description}</p>

          <div className="movie-modal-actions">
            <button className="btn btn-primary" onClick={handlePlay}>
              <img src={Play} alt="" />
              Play
            </button>
            <button
              className={`btn btn-secondary ${inList ? 'btn-active' : ''}`}
              onClick={() => toggleMyList(selectedMovie.id)}
            >
              {inList ? '✓ In My List' : '+ My List'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
