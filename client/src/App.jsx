import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Landing from './Pages/LandingPage';
import SearchAndFilter from './Pages/SearchAndFilter';
import MovieDetails from './Pages/MovieDetails';
import SeatLayout from './Pages/SeatLayout';
import MyBookings from './Pages/MyBookings';

import PaymentPage from './Pages/PaymentPage';
import BookingConfirmation from './Pages/BookingConfirmation';

import { Toaster } from 'react-hot-toast';
import './App.css';

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<SearchAndFilter />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />

        <Route path="/payment/:id/:date/:time" element={<PaymentPage />} />

        {/* UPDATED ROUTE WITH :method */}
        <Route
          path="/booking-confirmation/:id/:date/:time/:method"
          element={<BookingConfirmation />}
        />

        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
