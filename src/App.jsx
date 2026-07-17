import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loading from './Components/Loading/Loading'
import MovieModal from './Components/MovieModal/MovieModal'
import MobileMenu from './Components/MobileMenu/MobileMenu'

const Home = lazy(() => import('./Pages/Home/Home'))
const Login = lazy(() => import('./Pages/Login/Login'))
const Player = lazy(() => import('./Pages/Player/Player'))
const Search = lazy(() => import('./Pages/Search/Search'))
const MyList = lazy(() => import('./Pages/MyList/MyList'))

function App() {
  return (
    <>
      <Suspense fallback={<Loading fullScreen label="Loading Netflix..." />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/search" element={<Search />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/Player/:id" element={<Player />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <MovieModal />
      <MobileMenu />
    </>
  )
}

export default App
