import './App.css'
import Home from './Pages/Home/Home'
import { Routes, Route} from 'react-router-dom'
import Login from './Pages/Login/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/login' element = {<Login/>}/>
      </Routes>
    </>
  )
}

export default App
