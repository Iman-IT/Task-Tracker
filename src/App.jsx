import './App.css'
import { Route, Routes } from 'react-router-dom'
import Tracker from './Pages/Tracker'
import Navbar from './components/Navbar'
import Home from './Pages/Home'



function App() {


  return (
    <>
 
      <Navbar />
 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='tracker' element={<Tracker />} />
   
      </Routes>
   
    </>
  )
}

export default App
