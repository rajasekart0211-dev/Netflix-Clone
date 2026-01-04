import './App.css'
import Home from './Pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/Player/:id' element = {<Player/>}/>
      </Routes>
    </>
  )
}

export default App
