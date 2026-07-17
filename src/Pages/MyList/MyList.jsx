import './MyList.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { getMovieById } from '../../utils/movies'
import { useApp } from '../../context/AppContext'

const MyList = () => {
  const { myList, openMovieModal } = useApp()
  const movies = myList.map(getMovieById).filter(Boolean)

  return (
    <div className="my-list-page">
      <Navbar />
      <main className="my-list-main">
        <h1>My List</h1>
        {movies.length === 0 ? (
          <div className="my-list-empty">
            <p>Your list is empty.</p>
            <p className="my-list-empty-sub">Add titles from any movie row or details modal.</p>
          </div>
        ) : (
          <div className="my-list-grid">
            {movies.map((movie) => (
              <button
                key={movie.id}
                className="my-list-card"
                onClick={() => openMovieModal(movie)}
              >
                <img
                  src={movie.posterMedium || movie.posterLarge}
                  alt={movie.title}
                  loading="lazy"
                />
                <span>{movie.title}</span>
              </button>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default MyList
