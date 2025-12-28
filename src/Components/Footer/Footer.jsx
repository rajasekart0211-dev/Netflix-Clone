import './Footer.css'
import YT from '../../assets/youtube_icon.png'
import IG from '../../assets/instagram_icon.png'
import FB from '../../assets/facebook_icon.png'
import X from '../../assets/twitter_icon.png'

const Footer = () => {
  return (
    <div className='Footer'>
      <div className="footer-icons">
        <img src={YT} alt="" />
        <img src={IG} alt="" />
        <img src={FB} alt="" />
        <img src={X} alt="" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms Of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Conatct Us</li>
      </ul>
      <p>copyright @ 1997-1015 NetFlix, Inc.</p>
    </div>
  )
}

export default Footer