import './Player.css'
import back from '../../assets/back_arrow_icon.png'
import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieById, getEmbedUrl } from '../../utils/movies'
const Player = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const movie = useMemo(() => getMovieById(id), [id])
  const embedUrl = getEmbedUrl(movie?.trailer)

  if (!movie) {
    return (
      <div className="player player--empty">
        <button className="player-back" onClick={() => navigate(-1)} aria-label="Go back">
          <img src={back} alt="" />
        </button>
        <div className="player-error">
          <h1>Title not found</h1>
          <p>We couldn&apos;t find this movie in the catalog.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Browse
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="player">
      <button className="player-back" onClick={() => navigate(-1)} aria-label="Go back">
        <img src={back} alt="" />
      </button>

      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={`${movie.title} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <img
          className="player-poster"
          src={movie.posterLarge || movie.posterMedium}
          alt={movie.title}
        />
      )}

      <div className="player-info">
        <h1>{movie.title}</h1>
        <div className="player-meta">
          {movie.year && <span>{movie.year}</span>}
          {movie.runtime && <span>{movie.runtime} min</span>}
          {movie.genres?.slice(0, 3).map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>
        {movie.description && <p>{movie.description}</p>}
      </div>
    </div>
  )
}

export default Player
