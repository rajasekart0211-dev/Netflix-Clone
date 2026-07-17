import './Hero.css'
import { useNavigate } from 'react-router-dom'
import HeroBanner from '../../assets/hero_banner.jpg'
import Play from '../../assets/play_icon.png'
import Info from '../../assets/info_icon.png'
import { getFeaturedMovie } from '../../utils/movies'
import { useApp } from '../../context/AppContext'

const Hero = () => {
  const navigate = useNavigate()
  const { openMovieModal } = useApp()
  const featured = getFeaturedMovie()

  const handlePlay = () => {
    if (featured?.id) navigate(`/player/${featured.id}`)
  }

  const handleMoreInfo = () => {
    if (featured) openMovieModal(featured)
  }

  return (
    <section className="hero" aria-label="Featured title">
      <img
        src={featured?.posterLarge || HeroBanner}
        alt={featured?.title || 'Featured movie'}
        className="hero-img"
        loading="eager"
      />
      <div className="hero-overlay" />
      <div className="hero-caption">
        <h1 className="hero-title">{featured?.title || 'Featured on Netflix'}</h1>
        <p className="hero-description">
          {featured?.description ||
            'Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.'}
        </p>
        <div className="hero-btns">
          <button className="btn btn-primary" onClick={handlePlay}>
            <img src={Play} alt="" />
            Play
          </button>
          <button className="btn btn-secondary" onClick={handleMoreInfo}>
            <img src={Info} alt="" />
            More Info
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
