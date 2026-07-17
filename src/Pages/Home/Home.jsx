import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from '../../Components/Hero/Hero'
import TitleCard from '../../Components/TitleCard/TitleCard'
import Footer from '../../Components/Footer/Footer'
import { CATEGORIES } from '../../utils/movies'
import { useSearchParams } from 'react-router-dom'

const Home = () => {
  const [searchParams] = useSearchParams()
  const activeCategory = searchParams.get('category')

  const rows = activeCategory
    ? CATEGORIES.filter((cat) => cat.key === activeCategory)
    : CATEGORIES

  return (
    <div className="home">
      <Navbar />
      <Hero />
      <div className="more-cards">
        {rows.map((category) => (
          <TitleCard key={category.key} title={category.title} category={category.key} />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Home
