import React from 'react'
import Navbar from './Components/Navbar'
import {Route, Routes, useLocation} from 'react-router-dom'
import Landing from './Pages/LandingPage'
import Movies from './Pages/Movies'
import MovieDetails from './Pages/MovieDetails'
import SeatSelection from './Pages/SeatSelection'
import MyBookings from './Pages/MyBookings'
import { Toaster } from 'react-hot-toast'
import Footer from './Components/Footer'


const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar/>}
      <Routes>
        
        <Route path='/' element={<Landing/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/movies/:id' element={<MovieDetails/>} />
        <Route path='/movies/:id/:date' element={<SeatSelection/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
      </Routes>
      {!isAdminRoute && <Footer/>}

    </>
  )
}

export default App
