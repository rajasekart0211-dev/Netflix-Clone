import './Footer.css'
import YT from '../../assets/youtube_icon.png'
import IG from '../../assets/instagram_icon.png'
import FB from '../../assets/facebook_icon.png'
import X from '../../assets/twitter_icon.png'

const FOOTER_LINKS = [
  'Audio Description',
  'Help Centre',
  'Gift Cards',
  'Media Centre',
  'Investor Relations',
  'Jobs',
  'Terms of Use',
  'Privacy',
  'Legal Notices',
  'Cookie Preferences',
  'Corporate Information',
  'Contact Us',
]

const SOCIAL_LINKS = [
  { icon: FB, label: 'Facebook', href: 'https://facebook.com' },
  { icon: IG, label: 'Instagram', href: 'https://instagram.com' },
  { icon: X, label: 'X', href: 'https://x.com' },
  { icon: YT, label: 'YouTube', href: 'https://youtube.com' },
]

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-icons">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
          >
            <img src={social.icon} alt="" />
          </a>
        ))}
      </div>
      <ul>
        {FOOTER_LINKS.map((link) => (
          <li key={link}>
            <button type="button">{link}</button>
          </li>
        ))}
      </ul>
      <p className="footer-copy">&copy; 1997–{new Date().getFullYear()} Netflix, Inc.</p>
    </footer>
  )
}

export default Footer
