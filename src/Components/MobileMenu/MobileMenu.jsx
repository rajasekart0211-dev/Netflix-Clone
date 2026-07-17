import './MobileMenu.css'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'TV Shows', to: '/?category=new' },
  { label: 'Movies', to: '/?category=avengers' },
  { label: 'New & Popular', to: '/?category=action' },
  { label: 'My List', to: '/my-list' },
]

const MobileMenu = () => {
  const navigate = useNavigate()
  const { mobileMenuOpen, setMobileMenuOpen, logout, isAuthenticated } = useApp()

  if (!mobileMenuOpen) return null

  const handleNavigate = (to) => {
    setMobileMenuOpen(false)
    navigate(to)
  }

  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <button
        className="mobile-menu-backdrop"
        onClick={() => setMobileMenuOpen(false)}
        aria-label="Close menu"
      />
      <nav className="mobile-menu-panel">
        <button
          className="mobile-menu-close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to} onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={() => handleNavigate('/search')}>Search</button>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li>
              <button onClick={() => handleNavigate('/login')}>Sign In</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default MobileMenu
