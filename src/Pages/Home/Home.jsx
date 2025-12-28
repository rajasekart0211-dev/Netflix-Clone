import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from '../../assets/hero_banner.jpg'
import Caption from '../../assets/hero_title.png'
import Play from '../../assets/play_icon.png'
import Info from '../../assets/info_icon.png'
import TitleCard from '../../Components/TitleCard/TitleCard'
import Footer from '../../Components/Footer/Footer'

const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <div className="hero">
          <img src={Hero} alt="" className='hero-img'/>
          <div className="hero-caption">
            <img src={Caption} alt="" className='caption-img'/>
            <p>Discovering his ties to a secret  ancient  order, a young  man living 
              in modern Instanbul embarks on a quest to save the city from an immortal 
              enemy.
            </p>
            <div className="hero-btns">
              <button className='btn'><img src={Play} alt="" />Play</button>
              <button className='btn dark'><img src={Info} alt="" />More Info</button>
            </div>
            <TitleCard/>
          </div>
        </div>
        <div className="more-cards">
          <TitleCard title={"BlockBuster Movies"}/>
          <TitleCard title={"Only On NetFlix"}/>
          <TitleCard title={"Upcoming"}/>
          <TitleCard title={"Top Picks For You"}/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home