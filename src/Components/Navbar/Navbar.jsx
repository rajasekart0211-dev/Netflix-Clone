import './Navbar.css'
import Logo from '../../assets/logo.png'
import Search from '../../assets/search_icon.svg'
import Bell from '../../assets/bell_icon.svg'
import Profile from '../../assets/profile_img.png'
import Caret from '../../assets/caret_icon.svg'
import { useEffect, useState } from 'react'
import { MdOutlineMenu } from "react-icons/md";

const Navbar = () => {

  const [show, setShow] = useState(false)

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShow(true)
      } else {
        setShow(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

  }, [])

  return (
    <div className={`navbar ${show ? 'nav-black' : ''}`}>
        <div className="navbar-left">
            <img src={Logo} alt="" />
            <ul className='mobile-none'>
                <li>Home</li>
                <li>TV Shows</li>
                <li>Movies</li>
                <li>New & Popular</li>
                <li>My List</li>
                <li>Browse By Languages</li>
                
            </ul>
           
        </div>

        <div className="navbar-right mobile-none">
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
         <MdOutlineMenu className='burger-menu'/>
    </div>
  )
}

export default Navbar