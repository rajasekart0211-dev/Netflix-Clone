import './Navbar.css'
import Logo from '../../assets/logo.png'
import Search from '../../assets/search_icon.svg'
import Bell from '../../assets/bell_icon.svg'
import Profile from '../../assets/profile_img.png'
import Caret from '../../assets/caret_icon.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navbar-left">
            <img src={Logo} alt="" />
            <ul>
                <li>Home</li>
                <li>TV Shows</li>
                <li>Movies</li>
                <li>New & Popular</li>
                <li>My List</li>
                <li>Browse By Languages</li>
            </ul>
        </div>
        <div className="navbar-right">
            <img src={Search} alt="" className='icons'/>
            <p>Children</p>
            <img src={Bell} alt="" className='icons'/>
            <div className="navbar-profile">
                <img src={Profile} alt="" className='profile'/>
                <img src={Caret} alt=""/>
                <div className="dropdown">
                    <p>sign out netflix</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar