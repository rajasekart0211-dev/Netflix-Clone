import './Navbar.css'
import Logo from '../../assets/logo.png'
import SearchIcon from '../../assets/search_icon.svg'
import Bell from '../../assets/bell_icon.svg'
import Profile from '../../assets/profile_img.png'
import Caret from '../../assets/caret_icon.svg'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { MdOutlineMenu } from 'react-icons/md'
import { useApp } from '../../context/AppContext'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'TV Shows', to: '/?category=new' },
  { label: 'Movies', to: '/?category=avengers' },
  { label: 'New & Popular', to: '/?category=action' },
  { label: 'My List', to: '/my-list' },
]

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { setMobileMenuOpen, logout, isAuthenticated } = useApp()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/' && !location.search
    return location.pathname + location.search === to || location.pathname === to
  }

  return (
    <header className={`navbar ${scrolled ? 'nav-black' : ''}`}>
      <div className="navbar-left">
        <Link to="/" aria-label="Netflix home">
          <img src={Logo} alt="Netflix" className="navbar-logo" />
        </Link>
        <nav className="navbar-nav" aria-label="Main navigation">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to} className={isActive(link.to) ? 'active' : ''}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="navbar-right">
        <button
          className="navbar-icon-btn"
          onClick={() => navigate('/search')}
          aria-label="Search"
        >
          <img src={SearchIcon} alt="" className="icons" />
        </button>
        <span className="navbar-children">Children</span>
        <button className="navbar-icon-btn" aria-label="Notifications">
          <img src={Bell} alt="" className="icons" />
        </button>

        <div className="navbar-profile">
          <img src={Profile} alt="" className="profile" />
          <img src={Caret} alt="" className="caret" />

          <div className="dropdown">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
              >
                Sign out of Netflix
              </button>
            ) : (
              <button onClick={() => navigate('/login')}>Sign In</button>
            )}
          </div>
        </div>
      </div>

      <button
        className="burger-menu"
        onClick={() => setMobileMenuOpen(true)}
        aria-label="Open menu"
      >
        <MdOutlineMenu />
      </button>
    </header>
  )
}

export default Navbar
