import './TitleCard.css'
import { useEffect, useRef } from 'react'
import { getMoviesByCategory } from '../../utils/movies'
import { useApp } from '../../context/AppContext'

const TitleCard = ({ title = 'Popular on Netflix', category }) => {
  const cardsRef = useRef(null)
  const { openMovieModal, toggleMyList, isInMyList } = useApp()
  const movies = getMoviesByCategory(category)

  useEffect(() => {
    const ref = cardsRef.current
    if (!ref) return

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault()
        ref.scrollLeft += event.deltaY
      }
    }

    ref.addEventListener('wheel', handleWheel, { passive: false })
    return () => ref.removeEventListener('wheel', handleWheel)
  }, [])

  const scrollRow = (direction) => {
    const ref = cardsRef.current
    if (!ref) return
    ref.scrollBy({ left: direction * ref.clientWidth * 0.75, behavior: 'smooth' })
  }

  if (movies.length === 0) {
    return (
      <section className="titlecards">
        <h2>{title}</h2>
        <p className="titlecards-empty">No titles available in this category.</p>
      </section>
    )
  }

  return (
    <section className="titlecards">
      <h2>{title}</h2>
      <div className="titlecards-row">
        <button
          className="titlecards-arrow titlecards-arrow--left"
          onClick={() => scrollRow(-1)}
          aria-label={`Scroll ${title} left`}
        >
          ‹
        </button>
        <div className="card-list" ref={cardsRef}>
          {movies.map((movie) => {
            const inList = isInMyList(movie.id)
            return (
              <article className="card" key={movie.id}>
                <button
                  className="card-button"
                  onClick={() => openMovieModal(movie)}
                  aria-label={`View details for ${movie.title}`}
                >
                  <img
                    src={movie.posterMedium || movie.posterLarge}
                    alt={movie.title}
                    loading="lazy"
                  />
                  <div className="card-overlay">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}{movie.genres?.length ? ` · ${movie.genres[0]}` : ''}</p>
                  </div>
                </button>
                <button
                  className={`card-list-btn ${inList ? 'active' : ''}`}
                  onClick={() => toggleMyList(movie.id)}
                  aria-label={inList ? `Remove ${movie.title} from My List` : `Add ${movie.title} to My List`}
                >
                  {inList ? '✓' : '+'}
                </button>
              </article>
            )
          })}
        </div>
        <button
          className="titlecards-arrow titlecards-arrow--right"
          onClick={() => scrollRow(1)}
          aria-label={`Scroll ${title} right`}
        >
          ›
        </button>
      </div>
    </section>
  )
}

export default TitleCard
